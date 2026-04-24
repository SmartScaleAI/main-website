import { NextRequest, NextResponse } from 'next/server'
import { OnboardingFormData } from '@/lib/onboarding/types'

function digitsOnly(val: string) {
  return val.replace(/\D/g, '')
}

function formatHours(day: { open: string; close: string; closed: boolean }) {
  return day.closed ? 'Closed' : `${day.open} - ${day.close}`
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GHL_ONBOARDING_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 })
  }

  const data: OnboardingFormData = await req.json()

  const payload = {
    bizName: data.bizName.trim(),
    ownerName: data.ownerName.trim(),
    ownerCell: digitsOnly(data.ownerCell),
    bizPhone: digitsOnly(data.bizPhone),
    city: data.city.trim(),
    state: data.state.trim(),
    industry: data.industry,
    services: data.services,
    otherService: data.otherService.trim() || null,
    serviceArea: data.serviceArea.trim(),
    hours: {
      weekday: formatHours(data.hours.weekday),
      saturday: formatHours(data.hours.saturday),
      sunday: formatHours(data.hours.sunday),
    },
    afterHoursEmergency: data.afterHoursEmergency,
    aiName: data.aiName.trim(),
    bookingMethod: data.bookingMethod,
    bizNotes: data.bizNotes.trim() || null,
    submittedAt: new Date().toISOString(),
    source: 'onboarding-form',
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    console.error('GHL onboarding webhook failed:', res.status, await res.text())
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
