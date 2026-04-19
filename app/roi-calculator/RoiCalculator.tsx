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
  return (
    <div className="bg-[#0d2233] border border-brand-blue/10 rounded-md p-5 transition-colors duration-200 focus-within:border-brand-blue/40">
      <label className="block text-[11px] font-semibold tracking-[0.15em] uppercase text-[#6b8fa8] mb-2.5">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {prefix && (
          <span className="text-[20px] font-bold text-brand-blue">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)))
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
  const [dormant, setDormant] = useState(200)
  const [reactRate, setReactRate] = useState(8)
  const missedCallsPerMonth = Math.round((calls * missedRate) / 100)
  const jobsRecovered = Math.round((missedCallsPerMonth * closeRate) / 100)
  const missedRevenue = jobsRecovered * jobValue
  const reactJobs = Math.round((dormant * reactRate) / 100)
  const reactRevenue = reactJobs * jobValue
  const totalRevenue3mo = missedRevenue * 3 + reactRevenue

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
          <div
            className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-blue border border-brand-blue/25 px-3.5 py-1.5 rounded-sm mb-5"
            style={{ background: "rgba(41,182,246,0.1)" }}
          >
            SmartScale AI
          </div>
          <h1
            className="font-extrabold uppercase leading-none tracking-[-0.01em] text-brand-text mb-4"
            style={{ fontSize: "clamp(36px, 7vw, 64px)" }}
          >
            ROI <span className="text-brand-blue">Calculator</span>
          </h1>
          <p className="text-[15px] text-[#6b8fa8] max-w-[480px] mx-auto leading-relaxed">
            Show HVAC & plumbing clients exactly how much revenue they&apos;re leaving
            on the table — and how fast SmartScale AI pays for itself.
          </p>
        </div>

        {/* Business Inputs */}
        <SectionLabel>Business Inputs</SectionLabel>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
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
          <InputCard
            label="Avg Job Value ($)"
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
          <InputCard
            label="Close Rate on Recovered Leads"
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
            label="Dormant Customers in Database"
            value={dormant}
            onChange={setDormant}
            min={0}
            max={5000}
            rangeMin={0}
            rangeMax={2000}
            rangeMinLabel="0"
            rangeMaxLabel="2,000+"
          />
          <InputCard
            label="Reactivation Close Rate"
            value={reactRate}
            onChange={setReactRate}
            min={1}
            max={30}
            suffix="%"
            rangeMin={1}
            rangeMax={30}
            rangeMinLabel="1%"
            rangeMaxLabel="30%"
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
          <div className="grid grid-cols-3 max-sm:grid-cols-2">
            <ResultCell label="Missed Calls / Mo" value={String(missedCallsPerMonth)} color="blue" sub="recovered with AI" />
            <ResultCell label="Jobs Recovered" value={String(jobsRecovered)} color="blue" sub="booked from callbacks" />
            <ResultCell label="Missed Call Revenue" value={fmtDollar(missedRevenue)} color="green" sub="per month" isLast3n />
            <ResultCell label="Reactivation Jobs" value={String(reactJobs)} color="blue" sub="from dormant list" />
            <ResultCell label="Reactivation Revenue" value={fmtDollar(reactRevenue)} color="green" sub="one-time campaign" />
            <ResultCell label="Total New Revenue" value={fmtDollar(totalRevenue3mo)} color="green" sub="first 3 months" isLast3n />
          </div>
        </div>

        {/* Assumptions */}
        <p className="text-[11px] text-[#6b8fa8] text-center leading-relaxed mt-8 px-4">
          * Projections based on industry averages for HVAC & plumbing businesses. Missed call rate
          industry benchmark: 30–40%. Reactivation campaigns typically yield 5–12% response.
          Individual results will vary based on market, service area, and business size.
        </p>
      </div>
    </>
  )
}
