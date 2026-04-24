export interface OnboardingFormData {
  // Step 1
  bizName: string
  ownerName: string
  ownerCell: string
  bizPhone: string
  city: string
  state: string
  industry: 'HVAC' | 'Plumbing' | 'HVAC + Plumbing' | ''

  // Step 2
  services: string[]
  otherService: string
  serviceArea: string
  hours: {
    weekday: { open: string; close: string; closed: boolean }
    saturday: { open: string; close: string; closed: boolean }
    sunday: { open: string; close: string; closed: boolean }
  }
  afterHoursEmergency: 'Yes' | 'No'

  // Step 3
  aiName: string
  bookingMethod: 'Phone' | 'Online booking link' | 'ServiceTitan' | 'Housecall Pro' | 'Jobber'
  bizNotes: string
}
