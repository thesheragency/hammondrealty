import { NextRequest, NextResponse } from 'next/server';
import { getWpAuthHeaders } from '@/lib/wp-auth';
import { sendFormNotification } from '@/lib/email';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 10;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function getWpRestBaseUrl(): string {
  const wpApiUrl = process.env.WP_API_URL;
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }
  // Convert GraphQL URL to REST API base (e.g., https://site.com/graphql -> https://site.com/wp-json)
  const url = new URL(wpApiUrl);
  return `${url.protocol}//${url.host}/wp-json`;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const formId = formData.get('formId');
    const honeypot = formData.get('gf_hp');

    // Honeypot check - silently succeed for bots
    if (honeypot) {
      return NextResponse.json({
        is_valid: true,
        confirmation_message: 'Thank you for your submission.',
        entry_id: null,
      });
    }

    if (!formId) {
      return NextResponse.json(
        { error: 'formId is required' },
        { status: 400 }
      );
    }

    // Build FormData for WordPress REST API
    const wpFormData = new FormData();
    
    // Copy all input_ prefixed fields to wpFormData (including files)
    // Gravity Forms REST API expects input_{fieldId} or input_{fieldId}.{subInputId} format
    const inputFieldPattern = /^input_\d+(?:[._]\d+)?$/;
    
    for (const [key, value] of formData.entries()) {
      if (inputFieldPattern.test(key)) {
        // Value could be a string or File - FormData handles both
        wpFormData.append(key, value);
      }
    }

    const wpRestUrl = getWpRestBaseUrl();
    const submitUrl = `${wpRestUrl}/gf/v2/forms/${formId}/submissions`;

    const headers: Record<string, string> = {
      ...getWpAuthHeaders(),
    };

    const response = await fetch(submitUrl, {
      method: 'POST',
      headers,
      body: wpFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gravity Forms REST API error:', data);
      return NextResponse.json(
        { error: data.message || 'Submission failed', validation_messages: data.validation_messages },
        { status: response.status }
      );
    }

    // REST API returns: { is_valid, confirmation_message, entry_id, validation_messages }
    if (!data.is_valid) {
      return NextResponse.json(
        { 
          is_valid: false,
          validation_messages: data.validation_messages,
          error: 'Validation failed'
        },
        { status: 400 }
      );
    }

    // Fire-and-forget email notification — never blocks or breaks the submission response
    const submittedValues: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      // Extract base field ID from input_1, input_1.2, input_1_2 style keys
      const match = key.match(/^input_(\d+)/);
      if (match && typeof value === 'string' && value.trim()) {
        submittedValues[match[1]] = value;
      }
    }
    sendFormNotification(String(formId), submittedValues).catch(() => {});

    return NextResponse.json({
      is_valid: true,
      confirmation_message: data.confirmation_message,
      entry_id: data.entry_id,
    });
  } catch (error: unknown) {
    console.error('Error submitting to Gravity Forms REST API:', error);
    
    let errorMessage = 'Failed to submit form';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
