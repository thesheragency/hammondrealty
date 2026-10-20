export interface WebsiteLead {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  source?: string;
  isBooking?: boolean;
}

/** Complete CRM routing before a successful form response can navigate away. */
export async function submitWebsiteLead(lead: WebsiteLead): Promise<void> {
  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) throw new Error("CRM configuration is missing.");
  const parts = lead.name.trim().split(/\s+/);
  const messages: string[] = [];
  if (!lead.isBooking && lead.address) messages.push(`Property Address: ${lead.address}`);
  if (!lead.isBooking && lead.notes) messages.push(lead.notes);
  const response = await fetch("https://api.followupboss.com/v1/events", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: lead.source || "Blake Hammond Website - Connect Form",
      type: "General Inquiry",
      message: messages.join("\n\n"),
      person: {
        firstName: parts[0] || "", lastName: parts.slice(1).join(" "),
        emails: lead.email ? [{ value: lead.email }] : [],
        phones: lead.phone ? [{ value: lead.phone }] : [],
        tags: ["Website Lead", "Connect Form"],
      },
    }),
  });
  if (!response.ok) throw new Error(`CRM submission failed (${response.status}).`);
}
