import { OnboardingFormData } from './types'

export type StepErrors = Partial<Record<string, string>>

function digitsOnly(val: string) {
  return val.replace(/\D/g, '')
}

export function validateStep1(data: OnboardingFormData): StepErrors {
  const errors: StepErrors = {}
  if (!data.bizName.trim()) errors.bizName = 'Required'
  if (!data.ownerName.trim()) errors.ownerName = 'Required'
  if (digitsOnly(data.ownerCell).length !== 10) errors.ownerCell = 'Enter a valid 10-digit US number'
  if (digitsOnly(data.bizPhone).length !== 10) errors.bizPhone = 'Enter a valid 10-digit US number'
  if (!data.city.trim()) errors.city = 'Required'
  if (!data.state.trim()) errors.state = 'Required'
  if (!data.industry) errors.industry = 'Please select an industry'
  return errors
}

export function validateStep2(data: OnboardingFormData): StepErrors {
  const errors: StepErrors = {}
  const hasService = data.services.length > 0 || data.otherService.trim().length > 0
  if (!hasService) errors.services = 'Please select at least one service'
  if (!data.serviceArea.trim()) errors.serviceArea = 'Required'
  return errors
}

export function validateStep3(data: OnboardingFormData): StepErrors {
  const errors: StepErrors = {}
  if (!data.aiName.trim() || !/^[a-zA-Z]+$/.test(data.aiName.trim()))
    errors.aiName = 'Required — letters only'
  return errors
}
