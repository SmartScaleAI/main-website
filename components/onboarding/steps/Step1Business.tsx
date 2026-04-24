'use client'

import { cn } from '@/lib/utils'
import { OnboardingFormData } from '@/lib/onboarding/types'
import { StepErrors } from '@/lib/onboarding/validate'

const INDUSTRY_OPTIONS: Array<OnboardingFormData['industry']> = [
  'HVAC',
  'Plumbing',
  'HVAC + Plumbing',
]

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (digits.length <= 3) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

const TEXT_SANITIZE = /[<>{}"'\\]/g
const INPUT_CLASS =
  'w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all'
const LABEL_CLASS = 'block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase'

interface Props {
  data: OnboardingFormData
  setData: React.Dispatch<React.SetStateAction<OnboardingFormData>>
  errors: StepErrors
}

export default function Step1Business({ data, setData, errors }: Props) {
  const set = (field: keyof OnboardingFormData, value: string) =>
    setData((p) => ({ ...p, [field]: value }))

  return (
    <div className="space-y-5">
      {/* Business Name */}
      <div>
        <label className={LABEL_CLASS}>
          Business Name <span className="text-brand-blue">*</span>
        </label>
        <input
          type="text"
          value={data.bizName}
          onChange={(e) => set('bizName', e.target.value.replace(TEXT_SANITIZE, '').slice(0, 80))}
          placeholder="Smith's Plumbing Co."
          className={cn(INPUT_CLASS, errors.bizName && 'border-red-400/50')}
        />
        {errors.bizName && <p className="text-[12px] text-red-400 mt-1">{errors.bizName}</p>}
      </div>

      {/* Owner's Name */}
      <div>
        <label className={LABEL_CLASS}>
          Owner's Name <span className="text-brand-blue">*</span>
        </label>
        <input
          type="text"
          value={data.ownerName}
          onChange={(e) => set('ownerName', e.target.value.replace(TEXT_SANITIZE, '').slice(0, 60))}
          placeholder="John Smith"
          className={cn(INPUT_CLASS, errors.ownerName && 'border-red-400/50')}
        />
        {errors.ownerName && <p className="text-[12px] text-red-400 mt-1">{errors.ownerName}</p>}
      </div>

      {/* Phone numbers — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL_CLASS}>
            Owner's Cell <span className="text-brand-blue">*</span>
          </label>
          <input
            type="tel"
            value={data.ownerCell}
            onChange={(e) => set('ownerCell', formatPhone(e.target.value))}
            placeholder="(555) 000-0000"
            className={cn(INPUT_CLASS, errors.ownerCell && 'border-red-400/50')}
          />
          {errors.ownerCell && <p className="text-[12px] text-red-400 mt-1">{errors.ownerCell}</p>}
        </div>
        <div>
          <label className={LABEL_CLASS}>
            Business Phone <span className="text-brand-blue">*</span>
          </label>
          <input
            type="tel"
            value={data.bizPhone}
            onChange={(e) => set('bizPhone', formatPhone(e.target.value))}
            placeholder="(555) 000-0000"
            className={cn(INPUT_CLASS, errors.bizPhone && 'border-red-400/50')}
          />
          {errors.bizPhone && <p className="text-[12px] text-red-400 mt-1">{errors.bizPhone}</p>}
        </div>
      </div>

      {/* City & State */}
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <div>
          <label className={LABEL_CLASS}>
            City <span className="text-brand-blue">*</span>
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => set('city', e.target.value.replace(TEXT_SANITIZE, '').slice(0, 60))}
            placeholder="Austin"
            className={cn(INPUT_CLASS, errors.city && 'border-red-400/50')}
          />
          {errors.city && <p className="text-[12px] text-red-400 mt-1">{errors.city}</p>}
        </div>
        <div className="w-28">
          <label className={LABEL_CLASS}>
            State <span className="text-brand-blue">*</span>
          </label>
          <select
            value={data.state}
            onChange={(e) => set('state', e.target.value)}
            className={cn(
              INPUT_CLASS,
              'appearance-none cursor-pointer',
              errors.state && 'border-red-400/50',
              !data.state && 'text-brand-text/25',
            )}
          >
            <option value="" disabled>—</option>
            {US_STATES.map((s) => (
              <option key={s} value={s} className="bg-[#071d2e] text-brand-text">{s}</option>
            ))}
          </select>
          {errors.state && <p className="text-[12px] text-red-400 mt-1">{errors.state}</p>}
        </div>
      </div>

      {/* Industry */}
      <div>
        <label className={LABEL_CLASS}>
          Industry <span className="text-brand-blue">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {INDUSTRY_OPTIONS.map((option) => {
            const active = data.industry === option
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setData((p) => ({ ...p, industry: option, services: [] }))
                }}
                className={cn(
                  'flex items-center justify-center rounded-[8px] px-2 py-2.5 text-[13px] font-semibold border-2 transition-all text-center',
                  active
                    ? 'bg-brand-blue/15 border-brand-blue text-brand-text'
                    : 'bg-white/[.04] border-brand-text/10 text-brand-text/55 hover:border-brand-blue/30 hover:text-brand-text/80',
                )}
              >
                {option}
              </button>
            )
          })}
        </div>
        {errors.industry && <p className="text-[12px] text-red-400 mt-1">{errors.industry}</p>}
      </div>
    </div>
  )
}
