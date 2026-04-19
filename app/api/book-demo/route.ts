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
    monthlyRevenue,
    smsConsent,
    marketingConsent,
    contactId,
  } = body;

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return NextResponse.json(
      { error: "GHL credentials not configured" },
      { status: 500 }
    );
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };

  const tags: string[] = [
    "Website Demo Form",
    ...(Array.isArray(businessTypes) ? businessTypes : []),
    ...(smsConsent ? ["SMS Consent"] : []),
    ...(marketingConsent ? ["Marketing Consent"] : []),
    ...(monthlyRevenue ? [`Revenue: ${monthlyRevenue}`] : []),
  ];

  const contactPayload = {
    firstName,
    lastName,
    email,
    phone,
    companyName: businessName,
    source: "Website Demo Form",
    tags,
  };

  // Use the contact ID captured from the GHL postMessage, falling back
  // to the most recently created contact if it wasn't available.
  let existingContactId: string | null = contactId || null;

  if (!existingContactId) {
    try {
      const listRes = await fetch(
        `https://services.leadconnectorhq.com/contacts/?locationId=${locationId}&sortBy=dateAdded&sortOrder=desc&limit=1`,
        { headers }
      );
      if (listRes.ok) {
        const listData = await listRes.json();
        const contacts: { id: string }[] = listData.contacts ?? [];
        if (contacts.length > 0) existingContactId = contacts[0].id;
      }
    } catch (err) {
      console.error("GHL contact lookup failed:", err);
    }
  }

  if (!existingContactId) {
    console.error("GHL: no contact found to update");
    return NextResponse.json(
      { error: "No contact found to update" },
      { status: 500 }
    );
  }

  const updateRes = await fetch(
    `https://services.leadconnectorhq.com/contacts/${existingContactId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(contactPayload),
    }
  );

  if (!updateRes.ok) {
    const ghlError = await updateRes.text();
    console.error("GHL contact update failed:", updateRes.status, ghlError);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }

  return NextResponse.json({ success: true, action: "updated" });
}
