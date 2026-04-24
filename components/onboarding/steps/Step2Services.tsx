'use client'

import { cn } from '@/lib/utils'
import { OnboardingFormData } from '@/lib/onboarding/types'
import { StepErrors } from '@/lib/onboarding/validate'
import { CheckCircle } from 'lucide-react'

const HVAC_SERVICES = [
  'AC repair and maintenance',
  'Heating and furnace repair',
  'HVAC installation',
  'Duct cleaning',
]

const PLUMBING_SERVICES = [
  'Drain cleaning',
  'Leak detection and repair',
  'Water heater services',
  'Emergency plumbing',
]

const INPUT_CLASS =
  'w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all'
const LABEL_CLASS = 'block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase'

interface Props {
  data: OnboardingFormData
  setData: React.Dispatch<React.SetStateAction<OnboardingFormData>>
  errors: StepErrors
}

function getServiceOptions(industry: OnboardingFormData['industry']) {
  if (industry === 'HVAC') return HVAC_SERVICES
  if (industry === 'Plumbing') return PLUMBING_SERVICES
  return [...HVAC_SERVICES, ...PLUMBING_SERVICES]
}

interface HoursRowProps {
  label: string
  value: OnboardingFormData['hours']['weekday']
  onChange: (val: OnboardingFormData['hours']['weekday']) => void
}

function HoursRow({ label, value, onChange }: HoursRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-brand-text/60 w-20 flex-none">{label}</span>
      <button
        type="button"
        onClick={() => onChange({ ...value, closed: !value.closed })}
        className={cn(
          'flex-none text-[12px] font-semibold px-2.5 py-1 rounded-[6px] border transition-all',
          value.closed
            ? 'bg-brand-blue/15 border-brand-blue text-brand-text'
            : 'bg-white/[.04] border-brand-text/10 text-brand-text/45 hover:border-brand-blue/30',
        )}
      >
        Closed
      </button>
      <input
        type="time"
        disabled={value.closed}
        value={value.open}
        onChange={(e) => onChange({ ...value, open: e.target.value })}
        className={cn(
          'flex-1 min-w-0 bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3 py-2 text-[13px] text-brand-text focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all',
          value.closed && 'opacity-30 pointer-events-none',
        )}
      />
      <span className="text-[12px] text-brand-text/30 flex-none">to</span>
      <input
        type="time"
        disabled={value.closed}
        value={value.close}
        onChange={(e) => onChange({ ...value, close: e.target.value })}
        className={cn(
          'flex-1 min-w-0 bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3 py-2 text-[13px] text-brand-text focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all',
          value.closed && 'opacity-30 pointer-events-none',
        )}
      />
    </div>
  )
}

export default function Step2Services({ data, setData, errors }: Props) {
  const serviceOptions = getServiceOptions(data.industry)
  const otherChecked = data.services.includes('__other__')

  const toggleService = (svc: string) => {
    setData((p) => ({
      ...p,
      services: p.services.includes(svc)
        ? p.services.filter((s) => s !== svc)
        : [...p.services, svc],
    }))
  }

  const toggleOther = () => {
    if (otherChecked) {
      setData((p) => ({
        ...p,
        services: p.services.filter((s) => s !== '__other__'),
        otherService: '',
      }))
    } else {
      setData((p) => ({ ...p, services: [...p.services, '__other__'] }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Services */}
      <div>
        <label className={LABEL_CLASS}>
          Services Offered <span className="text-brand-blue">*</span>
        </label>
        <div className="space-y-2.5">
          {serviceOptions.map((svc) => {
            const checked = data.services.includes(svc)
            return (
              <label key={svc} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex-none">
                  <input type="checkbox" checked={checked} onChange={() => toggleService(svc)} className="peer sr-only" />
                  <div
                    className={cn(
                      'w-4 h-4 rounded border-2 flex items-center justify-center transition-all',
                      checked
                        ? 'bg-brand-blue border-brand-blue'
                        : 'border-brand-text/20 bg-white/[.03] group-hover:border-brand-blue/40',
                    )}
                  >
                    {checked && <CheckCircle size={10} className="text-brand-bg" strokeWidth={3} />}
                  </div>
                </div>
                <span className="text-[14px] text-brand-text/70">{svc}</span>
              </label>
            )
          })}

          {/* Other */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex-none">
              <input type="checkbox" checked={otherChecked} onChange={toggleOther} className="peer sr-only" />
              <div
                className={cn(
                  'w-4 h-4 rounded border-2 flex items-center justify-center transition-all',
                  otherChecked
                    ? 'bg-brand-blue border-brand-blue'
                    : 'border-brand-text/20 bg-white/[.03] group-hover:border-brand-blue/40',
                )}
              >
                {otherChecked && <CheckCircle size={10} className="text-brand-bg" strokeWidth={3} />}
              </div>
            </div>
            <span className="text-[14px] text-brand-text/70">Other</span>
          </label>

          {otherChecked && (
            <input
              type="text"
              value={data.otherService}
              onChange={(e) =>
                setData((p) => ({ ...p, otherService: e.target.value.slice(0, 120) }))
              }
              placeholder="Describe the service…"
              className={cn(INPUT_CLASS, 'ml-7')}
            />
          )}
        </div>
        {errors.services && <p className="text-[12px] text-red-400 mt-1.5">{errors.services}</p>}
      </div>

      {/* Service Area */}
      <div>
        <label className={LABEL_CLASS}>
          Cities / Zip Codes Served <span className="text-brand-blue">*</span>
        </label>
        <input
          type="text"
          value={data.serviceArea}
          onChange={(e) =>
            setData((p) => ({ ...p, serviceArea: e.target.value.slice(0, 200) }))
          }
          placeholder="Austin, Round Rock, Cedar Park, 78701…"
          className={cn(INPUT_CLASS, errors.serviceArea && 'border-red-400/50')}
        />
        {errors.serviceArea && (
          <p className="text-[12px] text-red-400 mt-1">{errors.serviceArea}</p>
        )}
      </div>

      {/* Business Hours */}
      <div>
        <label className={LABEL_CLASS}>Business Hours</label>
        <div className="space-y-3">
          <HoursRow
            label="Weekdays"
            value={data.hours.weekday}
            onChange={(v) => setData((p) => ({ ...p, hours: { ...p.hours, weekday: v } }))}
          />
          <HoursRow
            label="Saturday"
            value={data.hours.saturday}
            onChange={(v) => setData((p) => ({ ...p, hours: { ...p.hours, saturday: v } }))}
          />
          <HoursRow
            label="Sunday"
            value={data.hours.sunday}
            onChange={(v) => setData((p) => ({ ...p, hours: { ...p.hours, sunday: v } }))}
          />
        </div>
      </div>

      {/* After-hours Emergency */}
      <div>
        <label className={LABEL_CLASS}>After-hours Emergency Calls</label>
        <div className="grid grid-cols-2 gap-3">
          {(['Yes', 'No'] as const).map((opt) => {
            const active = data.afterHoursEmergency === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setData((p) => ({ ...p, afterHoursEmergency: opt }))}
                className={cn(
                  'flex items-center justify-center rounded-[8px] px-3.5 py-3 text-[14px] font-semibold border-2 transition-all',
                  active
                    ? 'bg-brand-blue/15 border-brand-blue text-brand-text'
                    : 'bg-white/[.04] border-brand-text/10 text-brand-text/55 hover:border-brand-blue/30 hover:text-brand-text/80',
                )}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
