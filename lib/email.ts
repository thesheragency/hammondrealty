import { GraphQLClient, gql } from 'graphql-request';
import { getWpAuthHeaders } from '@/lib/wp-auth';

interface NotificationInfo {
  formTitle: string;
  recipients: string[];
  fields: { id: number; label: string }[];
}

const GET_FORM_NOTIFICATION_QUERY = gql`
  query GetFormNotifications($formId: ID!) {
    gfForm(id: $formId, idType: DATABASE_ID) {
      title
      notifications {
        isActive
        to
        toType
      }
      formFields(first: 100) {
        nodes {
          databaseId
          ... on GfFieldWithLabelSetting {
            label
          }
        }
      }
    }
  }
`;

async function getFormNotificationInfo(formId: string): Promise<NotificationInfo | null> {
  const wpApiUrl = process.env.WP_API_URL;
  if (!wpApiUrl) return null;

  try {
    const client = new GraphQLClient(wpApiUrl, {
      headers: { 'Content-Type': 'application/json', ...getWpAuthHeaders() },
    });

    const data = await client.request<any>(GET_FORM_NOTIFICATION_QUERY, { formId });
    const form = data?.gfForm;
    if (!form) return null;

    const recipients: string[] = [];
    for (const n of form.notifications ?? []) {
      if (n.isActive && n.to && n.toType === 'EMAIL') {
        n.to
          .split(',')
          .map((e: string) => e.trim())
          .filter(Boolean)
          .forEach((addr: string) => recipients.push(addr));
      }
    }

    const fields: { id: number; label: string }[] = (form.formFields?.nodes ?? []).map(
      (f: any) => ({ id: f.databaseId as number, label: (f.label as string) || `Field ${f.databaseId}` })
    );

    return { formTitle: form.title as string, recipients, fields };
  } catch (err) {
    console.warn('[Email] Failed to fetch form notification info:', err);
    return null;
  }
}

function buildEmailBody(
  formTitle: string,
  fields: { id: number; label: string }[],
  submittedValues: Record<string, string>
): string {
  const lines: string[] = [
    `New submission — ${formTitle}`,
    '─'.repeat(40),
    '',
  ];

  for (const [rawId, value] of Object.entries(submittedValues)) {
    const numId = parseInt(rawId, 10);
    const field = fields.find((f) => f.id === numId);
    const label = field?.label ?? `Field ${rawId}`;
    const display = value?.replace('\u200b', '').trim();
    if (display) {
      lines.push(`${label}: ${display}`);
    }
  }

  lines.push('', '─'.repeat(40));
  lines.push('Blake Hammond Real Estate');
  lines.push('https://hammondrealty.net');

  return lines.join('\n');
}

/**
 * Fire-and-forget: send a form notification email via Resend.
 * submittedValues keys are numeric field IDs as strings (e.g. "1", "2").
 * Never throws — logs a warning on failure so the user submission is unaffected.
 */
export async function sendFormNotification(
  formId: string,
  submittedValues: Record<string, string>
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY not set — skipping notification for form', formId);
    return;
  }

  try {
    const info = await getFormNotificationInfo(formId);
    if (!info || info.recipients.length === 0) {
      console.warn('[Email] No active notification recipients for form', formId);
      return;
    }

    const body = buildEmailBody(info.formTitle, info.fields, submittedValues);
    const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from,
      to: info.recipients,
      subject: `New form submission: ${info.formTitle}`,
      text: body,
    });

    if (result.error) {
      console.warn('[Email] Resend error for form', formId, result.error);
    } else {
      console.log('[Email] Notification sent to', info.recipients.join(', '), 'for form', formId);
    }
  } catch (err) {
    console.warn('[Email] Failed to send notification for form', formId, err);
  }
}
