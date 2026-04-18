import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Slack webhook not configured" }, { status: 500 });
  }

  const slackRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `*New Contact Message* from SmartScale website\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`,
    }),
  });

  if (!slackRes.ok) {
    console.error("Slack webhook failed:", await slackRes.text());
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
