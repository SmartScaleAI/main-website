'use client'

import { cn } from '@/lib/utils'
import { OnboardingFormData } from '@/lib/onboarding/types'
import { StepErrors } from '@/lib/onboarding/validate'

const BOOKING_METHODS: Array<OnboardingFormData['bookingMethod']> = [
  'Phone',
  'Online booking link',
  'ServiceTitan',
  'Housecall Pro',
  'Jobber',
]

const TEXTAREA_SANITIZE = /[<>{}\\]/g
const INPUT_CLASS =
  'w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all'
const LABEL_CLASS = 'block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase'

interface Props {
  data: OnboardingFormData
  setData: React.Dispatch<React.SetStateAction<OnboardingFormData>>
  errors: StepErrors
}

export default function Step3AICaller({ data, setData, errors }: Props) {
  return (
    <div className="space-y-5">
      {/* AI Name */}
      <div>
        <label className={LABEL_CLASS}>
          AI Receptionist Name <span className="text-brand-blue">*</span>
        </label>
        <input
          type="text"
          value={data.aiName}
          onChange={(e) =>
            setData((p) => ({
              ...p,
              aiName: e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 30),
            }))
          }
          placeholder="Aria"
          className={cn(INPUT_CLASS, errors.aiName && 'border-red-400/50')}
        />
        <p className="text-[11px] text-brand-text/30 mt-1">Letters only — this is what your AI caller will be named.</p>
        {errors.aiName && <p className="text-[12px] text-red-400 mt-1">{errors.aiName}</p>}
      </div>

      {/* Booking Method */}
      <div>
        <label className={LABEL_CLASS}>
          Booking Method <span className="text-brand-blue">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {BOOKING_METHODS.map((method) => {
            const active = data.bookingMethod === method
            return (
              <button
                key={method}
                type="button"
                onClick={() => setData((p) => ({ ...p, bookingMethod: method }))}
                className={cn(
                  'flex items-center justify-center rounded-[8px] px-2 py-2.5 text-[13px] font-semibold border-2 transition-all text-center',
                  active
                    ? 'bg-brand-blue/15 border-brand-blue text-brand-text'
                    : 'bg-white/[.04] border-brand-text/10 text-brand-text/55 hover:border-brand-blue/30 hover:text-brand-text/80',
                )}
              >
                {method}
              </button>
            )
          })}
        </div>
      </div>

      {/* Business Notes */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <label className={LABEL_CLASS.replace('mb-1.5', '')}>Business Notes</label>
          <span className="text-[11px] text-brand-text/35 italic">Optional</span>
        </div>
        <textarea
          value={data.bizNotes}
          onChange={(e) =>
            setData((p) => ({
              ...p,
              bizNotes: e.target.value.replace(TEXTAREA_SANITIZE, '').slice(0, 600),
            }))
          }
          placeholder="Anything else your AI caller should know — special offers, service area notes, common questions, etc."
          rows={4}
          className={cn(INPUT_CLASS, 'resize-none leading-relaxed')}
        />
        <p className="text-[11px] text-brand-text/25 mt-1 text-right">
          {data.bizNotes.length}/600
        </p>
      </div>
    </div>
  )
}
