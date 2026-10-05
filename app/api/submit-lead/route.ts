import { NextRequest, NextResponse } from "next/server";
import { normalizeUsPhone } from "@/lib/us-phone";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const isBooking = body.formId === "book-consultation";
    const { name = "", email = "", address = "", notes = "" } = body;
    let phone = body.phone ?? "";
    if (isBooking) {
      const normalizedPhone = normalizeUsPhone(phone);
      if (
        typeof name !== "string" || !name.trim() ||
        typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        !normalizedPhone || body.privacyAccepted !== true
      ) {
        return NextResponse.json({ error: "Invalid booking form submission" }, { status: 400 });
      }
      phone = normalizedPhone;
    }

    // Split full name into first / last
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Combine address + notes into one message field
    const messageParts: string[] = [];
    if (!isBooking && address) messageParts.push(`Property Address: ${address}`);
    if (!isBooking && notes) messageParts.push(notes);
    const message = messageParts.join("\n\n");

    const apiKey = process.env.FUB_API_KEY;
    if (!apiKey) {
      console.error("FUB_API_KEY is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const credentials = Buffer.from(`${apiKey}:`).toString("base64");

    const payload = {
      source: (body.source as string) || "Blake Hammond Website - Connect Form",
      type: "General Inquiry",
      message,
      person: {
        firstName,
        lastName,
        emails: email ? [{ value: email }] : [],
        phones: phone ? [{ value: phone }] : [],
        tags: ["Website Lead", "Connect Form"],
      },
    };

    const fubRes = await fetch("https://api.followupboss.com/v1/events", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!fubRes.ok) {
      const errText = await fubRes.text();
      console.error(`FUB API error ${fubRes.status}:`, errText);
      return NextResponse.json({ error: "Failed to submit lead" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("submit-lead route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
