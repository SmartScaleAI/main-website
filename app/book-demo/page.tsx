"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  ClipboardList,
  PartyPopper,
  ArrowRight,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

enum Step {
  Info = 1,
  Schedule = 2,
  Confirmed = 3,
}

const BUSINESS_TYPES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping / Lawn Care",
  "Pest Control",
  "Cleaning / Maid Services",
  "Pool Service",
  "Painting",
  "Garage Door",
  "General Contractor",
  "Other",
];

const STEPS = [
  { value: Step.Info, label: "Your Info", Icon: ClipboardList },
  { value: Step.Schedule, label: "Schedule", Icon: Calendar },
  { value: Step.Confirmed, label: "Confirmed", Icon: PartyPopper },
];

interface FormData {
  firstName: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  businessTypes: string[];
  smsConsent: boolean;
  marketingConsent: boolean;
}

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  businessName: "",
  phone: "",
  email: "",
  businessTypes: [],
  smsConsent: false,
  marketingConsent: false,
};

function BusinessTypeSelect({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (type: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label =
    selected.length === 0
      ? "Select business types…"
      : selected.length === 1
        ? selected[0]
        : `${selected.length} types selected`;

  return (
    <div className="relative" ref={ref}>
      <label className="block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase">
        Business Type <span className="text-brand-blue">*</span>
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between bg-white/[.04] border rounded-[8px] px-3.5 py-2.5 text-[14px] transition-all text-left",
          open
            ? "border-brand-blue/50 ring-1 ring-brand-blue/30"
            : "border-brand-text/10 hover:border-brand-blue/30",
          selected.length === 0 ? "text-brand-text/25" : "text-brand-text",
        )}
      >
        <span className="truncate">{label}</span>
        <ChevronDown
          size={15}
          className={cn(
            "flex-none text-brand-text/35 transition-transform duration-200 ml-2",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-[10px] border border-brand-blue/15 bg-[#0b2538] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="max-h-[220px] overflow-y-auto py-1">
            {BUSINESS_TYPES.map((type) => {
              const active = selected.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onToggle(type)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] text-left transition-colors hover:bg-brand-blue/[.07]"
                >
                  <span
                    className={cn(
                      "w-4 h-4 rounded border-2 flex items-center justify-center flex-none transition-all",
                      active
                        ? "bg-brand-blue border-brand-blue"
                        : "border-brand-text/20 bg-white/[.03]",
                    )}
                  >
                    {active && (
                      <Check size={9} color="#071d2e" strokeWidth={3.5} />
                    )}
                  </span>
                  <span
                    className={
                      active ? "text-brand-text" : "text-brand-text/55"
                    }
                  >
                    {type}
                  </span>
                </button>
              );
            })}
          </div>
          {selected.length > 0 && (
            <div className="border-t border-brand-blue/10 px-3.5 py-2 flex items-center justify-between">
              <span className="text-[11px] text-brand-text/30">
                {selected.length} selected
              </span>
              <button
                type="button"
                onClick={() => selected.forEach((t) => onToggle(t))}
                className="text-[11px] text-brand-blue/60 hover:text-brand-blue transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function BookDemoPage() {
  const [step, setStep] = useState(Step.Info);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [error, setError] = useState("");
  const [iframeHeight, setIframeHeight] = useState<number | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (step !== Step.Schedule) return;
    function onMessage(e: MessageEvent) {
      const d = e.data;
      // Debug: log every message from the iframe to find the exact format
      console.log("[GHL postMessage]", typeof d, d);
      const str = typeof d === "string" ? d : JSON.stringify(d ?? "");
      if (
        d === "appointmentBooked" ||
        d?.event === "appointmentBooked" ||
        d?.type === "appointmentBooked" ||
        d?.eventType === "appointmentBooked" ||
        d?.message === "appointmentBooked" ||
        d?.action === "appointmentBooked" ||
        str.toLowerCase().includes("appointmentbooked") ||
        str.toLowerCase().includes("appointment_booked") ||
        str.toLowerCase().includes("meeting") ||
        (typeof d === "string" && d.toLowerCase().includes("booked"))
      ) {
        console.log("[GHL] Booking detected, advancing to step 3");
        fetch("/api/book-demo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }).catch(() => {});
        setStep(Step.Confirmed);
      }
      // Capture GHL height resize messages
      const h =
        typeof d === "number"
          ? d
          : typeof d?.height === "number"
            ? d.height
            : typeof d?.value === "number" && d?.type === "height"
              ? d.value
              : null;
      if (h && h > 100) setIframeHeight(h);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [step, form]);

  // Re-inject form_embed.js each time step 2 mounts so GHL auto-resizes the iframe
  useEffect(() => {
    if (step !== Step.Schedule) return;
    const existing = document.getElementById("ghl-form-embed");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "ghl-form-embed";
    script.src = "https://links.smartaiscaling.com/js/form_embed.js";
    document.body.appendChild(script);
    return () => {
      document.getElementById("ghl-form-embed")?.remove();
      setIframeHeight(null);
      setIframeLoaded(false);
    };
  }, [step]);

  function toggleBusinessType(type: string) {
    setForm((prev) => ({
      ...prev,
      businessTypes: prev.businessTypes.includes(type)
        ? prev.businessTypes.filter((t) => t !== type)
        : [...prev.businessTypes, type],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.businessName ||
      !form.phone ||
      !form.email
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.businessTypes.length === 0) {
      setError("Please select at least one business type.");
      return;
    }
    if (!form.smsConsent) {
      setError("Please consent to receive SMS messages to continue.");
      return;
    }

    setStep(Step.Schedule);
  }

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: "var(--color-brand-bg)" }}
    >
      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(41,182,246,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,182,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(41,182,246,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-[10px]">
          <Logo size={24} />
          <span
            className="text-[17px] font-bold tracking-[-0.01em] text-brand-text"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            SmartScale <span className="text-brand-blue">AI</span>
          </span>
        </Link>
        {step !== Step.Confirmed && (
          <Link
            href="/"
            className="flex items-center gap-1 text-[14px] text-brand-text/40 hover:text-brand-text/70 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10 animate-fade-up">
          {STEPS.map((s, i) => (
            <div key={s.value} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-[13px] font-bold",
                    step > s.value
                      ? "bg-brand-blue border-brand-blue text-brand-bg"
                      : step === s.value
                        ? "border-brand-blue text-brand-blue bg-brand-blue/10"
                        : "border-brand-text/15 text-brand-text/25 bg-transparent",
                  )}
                >
                  {step > s.value ? <CheckCircle size={16} /> : s.value}
                </div>
                <span
                  className={cn(
                    "text-[11px] font-medium tracking-wide hidden sm:block",
                    step === s.value ? "text-brand-blue" : "text-brand-text/30",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-16 sm:w-24 h-px mx-2 mb-4 transition-all duration-300",
                    step > s.value ? "bg-brand-blue/60" : "bg-brand-text/10",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 — Lead Form */}
        {step === Step.Info && (
          <div
            className="w-full max-w-xl animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="bg-white/[.03] border border-brand-blue/15 rounded-[16px] p-8 backdrop-blur-[12px]"
              style={{
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(41,182,246,0.08)",
              }}
            >
              <h1 className="text-[22px] font-bold text-brand-text mb-1 tracking-tight">
                Book Your Free Demo
              </h1>
              <p className="text-[14px] text-brand-text/45 mb-7">
                Tell us about your business and we&apos;ll show you exactly how
                SmartScale AI can help.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase">
                      First Name <span className="text-brand-blue">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, firstName: e.target.value }))
                      }
                      placeholder="John"
                      className="w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase">
                      Last Name <span className="text-brand-blue">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, lastName: e.target.value }))
                      }
                      placeholder="Smith"
                      className="w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase">
                    Business Name <span className="text-brand-blue">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, businessName: e.target.value }))
                    }
                    placeholder="Smith's Plumbing Co."
                    className="w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                  />
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase">
                      Phone <span className="text-brand-blue">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="(555) 000-0000"
                      className="w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-brand-text/60 mb-1.5 tracking-wide uppercase">
                      Email <span className="text-brand-blue">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="john@example.com"
                      className="w-full bg-white/[.04] border border-brand-text/10 rounded-[8px] px-3.5 py-2.5 text-[14px] text-brand-text placeholder:text-brand-text/25 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                    />
                  </div>
                </div>

                {/* Business Type */}
                <BusinessTypeSelect
                  selected={form.businessTypes}
                  onToggle={toggleBusinessType}
                />

                {/* Consent checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 flex-none">
                      <input
                        type="checkbox"
                        checked={form.smsConsent}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            smsConsent: e.target.checked,
                          }))
                        }
                        className="peer sr-only"
                      />
                      <div
                        className={cn(
                          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                          form.smsConsent
                            ? "bg-brand-blue border-brand-blue"
                            : "border-brand-text/20 bg-white/[.03] group-hover:border-brand-blue/40",
                        )}
                      >
                        {form.smsConsent && (
                          <CheckCircle
                            size={10}
                            className="text-brand-bg"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                    </div>
                    <span className="text-[14px] leading-[1.6] text-brand-text/45">
                      By checking this box, I consent to receive non-marketing
                      text messages from{" "}
                      <strong className="text-brand-text/70 font-semibold">
                        SmartScale AI
                      </strong>{" "}
                      about your AI receptionist demo request. Message frequency
                      varies, message &amp; data rates may apply. Text HELP for
                      assistance, reply STOP to opt out.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 flex-none">
                      <input
                        type="checkbox"
                        checked={form.marketingConsent}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            marketingConsent: e.target.checked,
                          }))
                        }
                        className="peer sr-only"
                      />
                      <div
                        className={cn(
                          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                          form.marketingConsent
                            ? "bg-brand-blue border-brand-blue"
                            : "border-brand-text/20 bg-white/[.03] group-hover:border-brand-blue/40",
                        )}
                      >
                        {form.marketingConsent && (
                          <CheckCircle
                            size={10}
                            className="text-brand-bg"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                    </div>
                    <span className="text-[14px] leading-[1.6] text-brand-text/45">
                      By checking this box, I consent to receive marketing and
                      promotional messages including special offers, discounts,
                      new product updates among others from{" "}
                      <strong className="text-brand-text/70 font-semibold">
                        SmartScale AI
                      </strong>{" "}
                      at the phone number provided. Frequency may vary. Message
                      &amp; data rates may apply. Text HELP for assistance,
                      reply STOP to opt out.
                    </span>
                  </label>
                </div>

                {error && (
                  <p className="text-[13px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-[8px] px-4 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-blue text-brand-bg font-bold text-[15px] px-8 py-[14px] rounded-[6px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)]"
                >
                  Continue to Schedule →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2 — Schedule */}
        {step === Step.Schedule && (
          <div
            className="w-full max-w-5xl animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="bg-white/[.03] border border-brand-blue/15 rounded-[16px] p-6 md:p-8 backdrop-blur-[12px]"
              style={{
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(41,182,246,0.08)",
              }}
            >
              <div className="relative flex items-start mb-1">
                <button
                  type="button"
                  onClick={() => setStep(Step.Info)}
                  className="flex items-center gap-1 text-[14px] text-brand-text/40 hover:text-brand-text/70 transition-colors pt-[5px] flex-none"
                >
                  <ArrowLeft size={14} className="mt-[1px]" />
                  Back
                </button>
                <div className="absolute inset-x-0 text-center pointer-events-none">
                  <h2 className="text-[22px] font-bold text-brand-text tracking-normal">
                    Schedule Your Demo
                  </h2>
                  <p className="text-[14px] text-brand-text/45 mt-1">
                    Pick a time that works for you — the call usually takes
                    45-60 minutes.
                  </p>
                </div>
                <div className="flex-1" />
              </div>
              <div className="h-12" />

              <div className="relative overflow-hidden" style={{ minHeight: "600px" }}>
                {/* Loader shown until iframe fires onLoad */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin" />
                    <span className="text-[13px] text-brand-text/30">Loading calendar…</span>
                  </div>
                )}
                <div style={{ marginTop: "-16px", marginBottom: "-16px", opacity: iframeLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}>
                  <iframe
                    src={`https://links.smartaiscaling.com/widget/booking/zUALVUIV1ZRWmPgr9TIi?first_name=${encodeURIComponent(form.firstName)}&last_name=${encodeURIComponent(form.lastName)}&phone=${encodeURIComponent(form.phone)}&email=${encodeURIComponent(form.email)}`}
                    onLoad={() => setIframeLoaded(true)}
                    style={{
                      width: "100%",
                      border: "none",
                      display: "block",
                      height: iframeHeight ? `${iframeHeight}px` : undefined,
                      minHeight: iframeHeight ? undefined : "min(900px, 80svh)",
                    }}
                    id="zUALVUIV1ZRWmPgr9TIi_1776398703235"
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-[14px] text-brand-text/30">
                You&apos;ll be moved to the next step automatically once your
                call is booked.
              </p>
            </div>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === Step.Confirmed && (
          <div
            className="w-full max-w-lg text-center animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            <div
              className="bg-white/[.03] border border-brand-blue/15 rounded-[16px] p-10 backdrop-blur-[12px]"
              style={{
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(41,182,246,0.08)",
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-brand-blue/20">
                <CheckCircle size={32} color="#29b6f6" />
              </div>

              <h2 className="text-[26px] font-bold text-brand-text mb-2 tracking-normal">
                You&apos;re all set{form.firstName ? `, ${form.firstName}` : ""}
                !
              </h2>
              <p className="text-[14px] text-brand-text/50 mb-8">
                Your discovery call is booked. We&apos;re looking forward to
                showing you what SmartScale AI can do for your business.
              </p>

              {/* What to expect */}
              <div className="bg-brand-blue/[.05] border border-brand-blue/15 rounded-[12px] p-5 text-left mb-8">
                <p className="text-[14px] font-bold text-brand-blue tracking-[0.08em] uppercase mb-4">
                  What to expect next
                </p>
                <ol className="space-y-3">
                  {[
                    "Check your email for a calendar invite with the call details.",
                    "We'll call you at your scheduled time — no prep needed.",
                    "Come ready to talk about your business goals and we'll handle the rest.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center flex-none text-[12px] pb-0.5 pl-px font-bold text-brand-blue mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-[13px] text-brand-text/60 leading-[1.55]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <Link href="/">
                <Button
                  variant="outline"
                  className="border-brand-text/15 text-brand-text/60 hover:border-brand-blue/40 hover:text-brand-blue transition-all text-[14px] px-6 py-3 rounded-lg"
                >
                  <ArrowLeft /> <span className="mb-[2.5px]">Back to Home</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
