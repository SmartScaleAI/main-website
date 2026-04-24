"use client"

import { useState } from "react"

function fmtDollar(n: number) {
  return "$" + Math.round(n).toLocaleString()
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-blue whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-brand-blue/10" />
    </div>
  )
}

function InputCard({
  label, value, onChange, min, max, prefix, suffix,
  rangeMin, rangeMax, rangeMinLabel, rangeMaxLabel,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  prefix?: string
  suffix?: string
  rangeMin: number
  rangeMax: number
  rangeMinLabel: string
  rangeMaxLabel: string
}) {
  const [localVal, setLocalVal] = useState("")
  const [focused, setFocused] = useState(false)

  function commit(raw: string) {
    const v = Number(raw)
    const clamped = isNaN(v) || raw === "" ? value : Math.max(min, Math.min(max, v))
    onChange(clamped)
    setLocalVal(String(clamped))
  }

  return (
    <div className="bg-[#0d2233] border border-brand-blue/10 rounded-md p-5 transition-colors duration-200 focus-within:border-brand-blue/40">
      <div className="flex items-center justify-between mb-2.5">
        <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b8fa8]">
          {label}
        </label>
        <span className="text-[10px] text-brand-blue/50 tracking-wide">tap to edit</span>
      </div>
      <div className={`flex items-center gap-2 border-b pb-1 transition-colors duration-150 ${focused ? "border-brand-blue/60" : "border-transparent"}`}>
        {prefix && (
          <span className="text-[20px] font-bold text-brand-blue">{prefix}</span>
        )}
        <input
          type="number"
          value={focused ? localVal : value}
          min={min}
          max={max}
          onFocus={() => {
            setLocalVal(String(value))
            setFocused(true)
          }}
          onChange={(e) => {
            setLocalVal(e.target.value)
            const v = Number(e.target.value)
            if (!isNaN(v) && e.target.value !== "") {
              onChange(Math.max(min, Math.min(max, v)))
            }
          }}
          onBlur={(e) => {
            setFocused(false)
            commit(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur()
          }}
          className="roi-num-input bg-transparent border-none outline-none text-brand-text font-extrabold text-[28px] w-full"
        />
        {suffix && (
          <span className="text-[20px] font-bold text-brand-blue">{suffix}</span>
        )}
      </div>
      <input
        type="range"
        min={rangeMin}
        max={rangeMax}
        value={Math.min(value, rangeMax)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range w-full mt-3"
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-[11px] text-[#6b8fa8]">{rangeMinLabel}</span>
        <span className="text-[11px] text-[#6b8fa8]">{rangeMaxLabel}</span>
      </div>
    </div>
  )
}

function ResultCell({
  label, value, color, sub, isLast3n,
}: {
  label: string
  value: string
  color: "blue" | "green"
  sub: string
  isLast3n?: boolean
}) {
  const valueColor = color === "green" ? "#3edfa0" : "#29b6f6"
  return (
    <div
      className={`p-6 border-b border-brand-blue/[0.07] ${isLast3n ? "" : "border-r border-brand-blue/[0.07]"}`}
    >
      <div className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#6b8fa8] mb-2">
        {label}
      </div>
      <div className="text-[28px] font-extrabold leading-none" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-[11px] text-[#6b8fa8] mt-1">{sub}</div>
    </div>
  )
}

export function RoiCalculator() {
  const [calls, setCalls] = useState(150)
  const [missedRate, setMissedRate] = useState(35)
  const [jobValue, setJobValue] = useState(450)
  const [closeRate, setCloseRate] = useState(40)
  const missedCallsPerMonth = Math.round((calls * missedRate) / 100)
  const jobsRecovered = Math.round((missedCallsPerMonth * closeRate) / 100)
  const missedRevenue = jobsRecovered * jobValue
  const totalRevenue3mo = missedRevenue * 3

  return (
    <>
      <style>{`
        .roi-range {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: #1a3a5c;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        .roi-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #29b6f6;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(41,182,246,0.35);
        }
        .roi-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #29b6f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(41,182,246,0.35);
        }
        .roi-num-input {
          -moz-appearance: textfield;
        }
        .roi-num-input::-webkit-outer-spin-button,
        .roi-num-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,182,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(41,182,246,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      <div className="relative z-10 max-w-[860px] mx-auto px-6 pt-[calc(68px+48px)] pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="font-extrabold uppercase leading-none tracking-[-0.01em] text-brand-text mb-4"
            style={{ fontSize: "clamp(36px, 7vw, 64px)" }}
          >
            ROI <span className="text-brand-blue">Calculator</span>
          </h1>
          <p className="text-[15px] text-[#6b8fa8] max-w-120 mx-auto leading-relaxed">
            Show HVAC & plumbing clients exactly how much revenue they&apos;re leaving
            on the table — and how fast SmartScale AI pays for itself.
          </p>
        </div>

        {/* Step 1: Call Volume */}
        <SectionLabel>Your Call Volume</SectionLabel>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-6">
          <InputCard
            label="Monthly Inbound Calls"
            value={calls}
            onChange={setCalls}
            min={10}
            max={2000}
            rangeMin={10}
            rangeMax={500}
            rangeMinLabel="10"
            rangeMaxLabel="500+"
          />
          <InputCard
            label="Missed Call Rate"
            value={missedRate}
            onChange={setMissedRate}
            min={5}
            max={70}
            suffix="%"
            rangeMin={5}
            rangeMax={70}
            rangeMinLabel="5%"
            rangeMaxLabel="70%"
          />
        </div>

        {/* Leads Delivered Callout */}
        <div
          className="rounded-lg px-8 py-6 mb-8 flex items-center justify-between gap-6 max-sm:flex-col max-sm:text-center"
          style={{ background: "linear-gradient(135deg, rgba(41,182,246,0.12), rgba(41,182,246,0.06))", border: "1px solid rgba(41,182,246,0.3)" }}
        >
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-blue mb-1">
              Calls We Capture For You
            </div>
            <div className="text-[13px] text-[#6b8fa8] leading-relaxed">
              Every month, SmartScale AI answers {missedCallsPerMonth} calls your business would have missed — connecting you with customers before they call a competitor.
            </div>
          </div>
          <div className="shrink-0 text-center">
            <div className="text-[56px] font-extrabold leading-none text-brand-blue">
              {missedCallsPerMonth}
            </div>
            <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b8fa8] mt-1">
              captured calls / mo
            </div>
          </div>
        </div>

        {/* Step 2: Close Potential */}
        <SectionLabel>Your Close Potential</SectionLabel>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
          <InputCard
            label="My Close Rate on These Leads"
            value={closeRate}
            onChange={setCloseRate}
            min={5}
            max={80}
            suffix="%"
            rangeMin={5}
            rangeMax={80}
            rangeMinLabel="5%"
            rangeMaxLabel="80%"
          />
          <InputCard
            label="Avg Job Value"
            value={jobValue}
            onChange={setJobValue}
            min={100}
            max={15000}
            prefix="$"
            rangeMin={100}
            rangeMax={5000}
            rangeMinLabel="$100"
            rangeMaxLabel="$5,000+"
          />
        </div>

        {/* Results block */}
        <SectionLabel>Your Revenue Projection</SectionLabel>
        <div className="bg-[#0d2233] border border-brand-blue/15 rounded-lg overflow-hidden mb-6">
          <div
            className="px-6 py-5 border-b border-brand-blue/10"
            style={{ background: "linear-gradient(135deg, #0f2540, #0d2233)" }}
          >
            <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#6b8fa8]">
              Monthly Revenue Impact
            </span>
          </div>
          <div className="grid grid-cols-2">
            <ResultCell label="Calls Captured / Mo" value={String(missedCallsPerMonth)} color="blue" sub="answered before they're lost" />
            <ResultCell label="Jobs Recovered" value={String(jobsRecovered)} color="blue" sub="booked from callbacks" />
            <ResultCell label="Missed Call Revenue" value={fmtDollar(missedRevenue)} color="green" sub="per month" isLast3n />
            <ResultCell label="Total New Revenue" value={fmtDollar(totalRevenue3mo)} color="green" sub="first 3 months" isLast3n />
          </div>
        </div>

        {/* Assumptions */}
        <p className="text-[11px] text-[#6b8fa8] text-center leading-relaxed mt-8 px-4">
          * Projections based on industry averages for HVAC & plumbing businesses. Missed call rate
          industry benchmark: 30–40%.
          Individual results will vary based on market, service area, and business size.
        </p>
      </div>
    </>
  )
}
