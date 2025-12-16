import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient, gql } from 'graphql-request';
import { GET_GF_FORM_QUERY, type GetGfFormResponse } from '@/lib/gf/queries';
import { SUBMIT_GF_FORM_MUTATION, type SubmitGfFormResponse, type FieldValueInput } from '@/lib/gf/mutations';

const CHECK_GF_SCHEMA_QUERY = gql`
  query CheckGfSchema {
    __schema {
      types {
        name
      }
    }
  }
`;

interface SchemaCheckResponse {
  __schema: {
    types: Array<{ name: string }>;
  };
}

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

function getWpClient(): GraphQLClient {
  const wpApiUrl = process.env.WP_API_URL;
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
    const credentials = Buffer.from(
      `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  return new GraphQLClient(wpApiUrl, { headers });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const formId = searchParams.get('formId');

  if (!formId) {
    return NextResponse.json({ error: 'formId is required' }, { status: 400 });
  }

  try {
    const client = getWpClient();
    const response = await client.request<GetGfFormResponse>(GET_GF_FORM_QUERY, {
      formId,
      idType: 'DATABASE_ID',
    });

    if (!response.gfForm) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    }

    return NextResponse.json({ form: response.gfForm });
  } catch (error) {
    console.error('Error fetching Gravity Form:', error);
    return NextResponse.json(
      { error: 'Failed to fetch form' },
      { status: 500 }
    );
  }
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
    const body = await request.json();
    const { formId, fieldValues, gf_hp } = body as {
      formId: number | string;
      fieldValues: FieldValueInput[];
      gf_hp?: string;
    };

    if (gf_hp) {
      return NextResponse.json({
        confirmation: { message: 'Thank you for your submission.', type: 'MESSAGE' },
        entry: null,
        errors: null,
      });
    }

    if (!formId || !Array.isArray(fieldValues)) {
      return NextResponse.json(
        { error: 'formId and fieldValues are required' },
        { status: 400 }
      );
    }

    const client = getWpClient();
    const response = await client.request<SubmitGfFormResponse>(SUBMIT_GF_FORM_MUTATION, {
      formId: String(formId),
      fieldValues,
      saveAsDraft: false,
    });

    const { submitGfForm } = response;

    if (submitGfForm.errors && submitGfForm.errors.length > 0) {
      return NextResponse.json(
        {
          errors: submitGfForm.errors,
          confirmation: null,
          entry: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      confirmation: submitGfForm.confirmation,
      entry: submitGfForm.entry,
      errors: null,
    });
  } catch (error: unknown) {
    console.error('Error submitting Gravity Form:', error);
    
    // Extract GraphQL error messages if available
    let errorMessage = 'Failed to submit form';
    if (error && typeof error === 'object' && 'response' in error) {
      const gqlError = error as { response?: { errors?: Array<{ message: string }> } };
      if (gqlError.response?.errors?.length) {
        errorMessage = gqlError.response.errors.map(e => e.message).join(', ');
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
