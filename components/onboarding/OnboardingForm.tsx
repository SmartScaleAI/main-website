"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  ArrowLeft,
  Building2,
  Wrench,
  Bot,
  Clock,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { OnboardingFormData } from "@/lib/onboarding/types";
import {
  StepErrors,
  validateStep1,
  validateStep2,
  validateStep3,
} from "@/lib/onboarding/validate";
import Step1Business from "./steps/Step1Business";
import Step2Services from "./steps/Step2Services";
import Step3AICaller from "./steps/Step3AICaller";

const STEPS = [
  { label: "Business", Icon: Building2 },
  { label: "Services", Icon: Wrench },
  { label: "AI Setup", Icon: Bot },
];

const INITIAL_DATA: OnboardingFormData = {
  bizName: "",
  ownerName: "",
  ownerCell: "",
  bizPhone: "",
  city: "",
  state: "",
  industry: "",
  services: [],
  otherService: "",
  serviceArea: "",
  hours: {
    weekday: { open: "08:00", close: "17:00", closed: false },
    saturday: { open: "09:00", close: "14:00", closed: false },
    sunday: { open: "09:00", close: "17:00", closed: true },
  },
  afterHoursEmergency: "Yes",
  aiName: "",
  bookingMethod: "Phone",
  bizNotes: "",
};

const INTRO_SECTIONS = [
  {
    Icon: Building2,
    label: "Business Info",
    description: "Your business name, contact details, location, and industry.",
  },
  {
    Icon: Wrench,
    label: "Services & Hours",
    description:
      "The services you offer, your coverage area, and business hours.",
  },
  {
    Icon: Bot,
    label: "AI Caller Setup",
    description:
      "Your AI receptionist's name, booking method, and any special notes.",
  },
];

export default function OnboardingForm() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validators = [validateStep1, validateStep2, validateStep3];

  // Re-run validation live once errors have been shown, so fields clear as the user fixes them
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    setErrors(validators[step](data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function handleNext() {
    const errs = validators[step](data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const errs = validateStep3(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(
        "Something went wrong — please try again or contact support.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
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
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-5 border border-brand-blue/20">
              <CheckCircle size={32} color="#29b6f6" />
            </div>
            <h2 className="text-[26px] font-bold text-brand-text mb-2 tracking-normal">
              You&apos;re all set!
            </h2>
            <p className="text-[14px] text-brand-text/50 mb-8">
              We&apos;re building your setup — this usually takes 3–5 business
              days. We&apos;ll reach out when everything is ready to schedule
              your go-live kickoff call.
            </p>

            <div className="bg-brand-blue/[.05] border border-brand-blue/15 rounded-[12px] p-5 text-left mb-8">
              <p className="text-[14px] font-bold text-brand-blue tracking-[0.08em] uppercase mb-4">
                What to expect next
              </p>
              <ol className="space-y-3">
                {[
                  "Your account is being configured.",
                  "We'll test everything before contacting you.",
                  "We'll schedule a kickoff call to walk you through your new system.",
                  "Feel free to reach out to us at any time — we're always happy to help.",
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
                <LogOut size={14} /> <span className="mb-[2.5px]">Exit</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10">
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
            <h1 className="text-[24px] font-bold text-brand-text mb-2 tracking-tight">
              Welcome to SmartScale <span className="text-brand-blue">AI</span>
            </h1>
            <p className="text-[14px] text-brand-text/50 mb-7 leading-relaxed">
              This short form gives us everything we need to configure your
              account. Fill it out once — we handle the rest.
            </p>

            {/* Sections overview */}
            <div className="space-y-3 mb-7">
              {INTRO_SECTIONS.map(({ Icon, label, description }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-4 bg-white/[.02] border border-brand-text/[.06] rounded-[10px] px-4 py-3.5"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-none mt-0.5">
                    <Icon size={15} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-brand-text/80 mb-0.5">
                      <span className="text-brand-text/30 mr-1.5">
                        Step {i + 1}.
                      </span>
                      {label}
                    </p>
                    <p className="text-[12px] text-brand-text/40 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Time estimate */}
            <div className="flex items-center gap-2 mb-7 text-[13px] text-brand-text/35">
              <Clock size={13} className="flex-none" />
              <span>Takes about 3–5 minutes to complete.</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setStarted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full bg-brand-blue text-brand-bg font-bold text-[15px] px-8 py-[14px] rounded-[6px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)]"
            >
              Get Started →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepTitles = ["Business Info", "Services & Hours", "AI Caller Setup"];
  const stepSubtitles = [
    "Tell us about your business so we can configure your account.",
    "What services do you offer and when are you open?",
    "Set up your AI receptionist so we can configure your voice agent.",
  ];

  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 py-10">
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10 animate-fade-up">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 text-[13px] font-bold",
                  step > i
                    ? "bg-brand-blue border-brand-blue text-brand-bg"
                    : step === i
                      ? "border-brand-blue text-brand-blue bg-brand-blue/10"
                      : "border-brand-text/15 text-brand-text/25 bg-transparent",
                )}
              >
                {step > i ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[11px] font-medium tracking-wide hidden sm:block",
                  step === i ? "text-brand-blue" : "text-brand-text/30",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-16 sm:w-24 h-px mx-2 mb-4 transition-all duration-300",
                  step > i ? "bg-brand-blue/60" : "bg-brand-text/10",
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
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
            {stepTitles[step]}
          </h1>
          <p className="text-[14px] text-brand-text/45 mb-7">
            {stepSubtitles[step]}
          </p>

          {step === 0 && (
            <Step1Business data={data} setData={setData} errors={errors} />
          )}
          {step === 1 && (
            <Step2Services data={data} setData={setData} errors={errors} />
          )}
          {step === 2 && (
            <Step3AICaller data={data} setData={setData} errors={errors} />
          )}

          {/* General error */}
          {Object.keys(errors).length > 0 && step < 2 && (
            <p className="text-[13px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-[8px] px-4 py-2.5 mt-5">
              Please fix the errors above before continuing.
            </p>
          )}
          {submitError && (
            <p className="text-[13px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-[8px] px-4 py-2.5 mt-5">
              {submitError}
            </p>
          )}

          {/* Navigation */}
          <div
            className={cn(
              "flex mt-7",
              step > 0 ? "justify-between" : "justify-end",
            )}
          >
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[14px] text-brand-text/40 hover:text-brand-text/70 transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-brand-blue text-brand-bg font-bold text-[15px] px-8 py-[14px] rounded-[6px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)]"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-brand-blue text-brand-bg font-bold text-[15px] px-8 py-[14px] rounded-[6px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? "Submitting…" : "Submit →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
