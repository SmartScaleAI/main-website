import {
  Phone,
  Calendar,
  Stethoscope,
  Scissors,
  Scale,
  Utensils,
  Car,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

const PROOF_ICONS = [
  { Icon: Stethoscope, label: "Medical" },
  { Icon: Scissors,    label: "Salon" },
  { Icon: Scale,       label: "Legal" },
  { Icon: Utensils,    label: "Restaurant" },
  { Icon: Car,         label: "Auto" },
];

const CALL_MESSAGES = [
  { role: "ai",   text: "Thanks for calling! This is Alex, your AI receptionist. How can I help?" },
  { role: "user", text: "Hi, I'd like to schedule an appointment" },
  { role: "ai",   text: "Of course! I have openings this week. What day works best for you?" },
];

export function Hero() {
  return (
    <section
      className="min-h-screen flex items-center px-6 pt-[100px] pb-[72px] relative overflow-hidden"
    >
      {/* Radial gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(41,182,246,0.07) 0%, transparent 70%)",
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

      <div className="max-w-[1200px] mx-auto w-full flex items-center gap-[72px] flex-col md:flex-row">
        {/* Copy */}
        <div className="flex-1 min-w-0 text-center md:text-left">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-brand-blue/[.08] border border-brand-blue/20 rounded-full px-4 py-[6px] mb-7 animate-fade-up"
            style={{ animationDelay: "0s" }}
          >
            <span className="w-[6px] h-[6px] rounded-full bg-brand-blue inline-block" />
            <span className="text-[11px] text-brand-blue tracking-[0.1em] font-semibold">
              AI RECEPTIONIST FOR YOUR BUSINESS
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-extrabold leading-[1.06] tracking-[-0.025em] text-brand-text mb-5 animate-fade-up"
            style={{
              fontSize: "clamp(36px, 5.5vw, 68px)",
              animationDelay: "0.12s",
            }}
          >
            Stop Losing Customers
            <br />
            to{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #29b6f6 0%, #81d4fa 50%, #29b6f6 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Missed Calls.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="text-[17px] leading-[1.65] text-brand-text/55 mb-9 font-light animate-fade-up md:max-w-[460px] max-w-full"
            style={{ animationDelay: "0.24s" }}
          >
            SmartScale AI answers every call 24/7, books appointments, and
            sends confirmations automatically — while you focus on your business.
          </p>

          {/* CTAs */}
          <div
            className="flex gap-3 flex-wrap mb-10 justify-center md:justify-start animate-fade-up flex-col sm:flex-row items-center md:items-start"
            style={{ animationDelay: "0.36s" }}
          >
            <Link
              href="/book-demo"
              className="bg-brand-blue text-brand-bg font-bold px-8 py-[14px] rounded-[6px] text-[15px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)] w-full sm:w-auto max-w-[320px] text-center"
            >
              Book a Free Demo
            </Link>
            <a
              href="#how-it-works"
              className="bg-transparent text-brand-text border border-brand-text/20 px-8 py-[14px] rounded-[6px] text-[15px] font-normal tracking-[0.02em] transition-all duration-200 hover:border-brand-blue/50 hover:text-brand-blue hover:-translate-y-px w-full sm:w-auto max-w-[320px] text-center"
            >
              How It Works
            </a>
          </div>

          {/* Proof strip */}
          <div
            className="flex items-center gap-3 text-brand-text/35 text-[13px] animate-fade-up justify-center md:justify-start"
            style={{ animationDelay: "0.48s" }}
          >
            <div className="flex">
              {PROOF_ICONS.map(({ Icon }, i) => (
                <div
                  key={i}
                  className="w-[30px] h-[30px] bg-brand-blue/10 rounded-full border-[2px] border-brand-bg flex items-center justify-center"
                  style={{ marginLeft: i > 0 ? "-9px" : "0" }}
                >
                  <Icon size={13} color="#29b6f6" strokeWidth={2} />
                </div>
              ))}
            </div>
            <span>Works for any business, any industry</span>
          </div>
        </div>

        {/* Call card */}
        <div
          className="flex-none flex items-center justify-center relative w-full md:w-auto justify-center animate-fade-up"
          style={{ animationDelay: "0.20s" }}
        >
          {/* Pulse rings */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute w-[120px] h-[120px] rounded-full border border-brand-blue/25 animate-pulse-ring"
              style={{ animationDelay: `${i * 0.85}s` }}
            />
          ))}

          {/* Card */}
          <div
            className="w-full max-w-[340px] md:w-[300px] bg-white/[.03] border border-brand-blue/15 rounded-[16px] p-6 animate-float backdrop-blur-[12px] relative z-[1]"
            style={{
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(41,182,246,0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-[18px]">
              <div className="w-[42px] h-[42px] bg-brand-blue/10 rounded-[10px] flex items-center justify-center">
                <Phone size={18} color="#29b6f6" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-brand-text">
                  Incoming Call
                </div>
                <div className="text-[11px] text-brand-text/35">
                  (555) 391-4820
                </div>
              </div>
              <div className="ml-auto bg-brand-blue/15 border border-brand-blue/30 rounded-full px-[10px] py-[3px] text-[10px] font-bold text-brand-blue tracking-[0.06em]">
                ● LIVE
              </div>
            </div>

            {/* Messages */}
            {CALL_MESSAGES.map((msg, i) => (
              <div
                key={i}
                className={`mb-[10px] flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="rounded-[10px] px-[13px] py-[9px] max-w-[88%] text-[12px] leading-[1.55]"
                  style={{
                    background:
                      msg.role === "ai"
                        ? "rgba(41,182,246,0.1)"
                        : "rgba(255,255,255,0.06)",
                    color:
                      msg.role === "ai"
                        ? "#7dd3f5"
                        : "rgba(232,244,253,0.75)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Booking confirmation */}
            <div className="mt-[14px] bg-brand-blue/[.08] border border-brand-blue/20 rounded-[8px] px-[14px] py-[10px] flex items-center gap-[10px]">
              <CheckCircle size={18} color="#29b6f6" />
              <div>
                <div className="text-[11px] font-bold text-brand-blue tracking-[0.03em]">
                  APPOINTMENT BOOKED
                </div>
                <div className="text-[10px] text-brand-text/40 mt-[2px]">
                  Today at 1:30 PM · Confirmation sent via SMS
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-[14px] flex items-center gap-[6px] justify-end">
              <Logo size={12} />
              <span
                className="text-[10px] font-bold"
                style={{ color: "rgba(41,182,246,0.4)" }}
              >
                SmartScale AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
