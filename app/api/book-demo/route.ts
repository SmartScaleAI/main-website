import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    firstName,
    lastName,
    businessName,
    phone,
    email,
    businessTypes,
    smsConsent,
    marketingConsent,
  } = body;

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return NextResponse.json(
      { error: "GHL credentials not configured" },
      { status: 500 }
    );
  }

  const tags: string[] = [
    "Website Demo Form",
    ...(Array.isArray(businessTypes) ? businessTypes : []),
    ...(smsConsent ? ["SMS Consent"] : []),
    ...(marketingConsent ? ["Marketing Consent"] : []),
  ];

  const ghlRes = await fetch("https://services.leadconnectorhq.com/contacts/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-04-15",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      companyName: businessName,
      locationId,
      source: "Website Demo Form",
      tags,
    }),
  });

  if (!ghlRes.ok) {
    const err = await ghlRes.text();
    console.error("GHL contact creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
