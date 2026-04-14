import { Check } from "lucide-react";
import { PLANS } from "@/components/shared/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Pricing() {
  return (
    <section id="pricing" className="py-[100px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.14em] text-brand-blue font-semibold mb-[14px]">
              PRICING
            </p>
            <h2
              className="font-extrabold text-brand-text leading-[1.1] mb-[14px] tracking-[-0.02em]"
              style={{ fontSize: "clamp(26px, 4.5vw, 50px)" }}
            >
              Simple, transparent pricing.
            </h2>
            <p className="text-brand-text/40 text-[16px] font-light">
              All plans include a one-time setup. No contracts. Cancel anytime.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-5 justify-center flex-wrap">
          {PLANS.map((plan, i) => (
            <AnimatedSection key={i} delay={i * 0.12} className="flex-1 min-w-[260px] max-w-[360px] w-full mx-auto md:mx-0">
              <div
                className={`relative rounded-[12px] px-[30px] py-9 h-full transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] ${
                  plan.highlight
                    ? "bg-brand-blue/[.06] border border-brand-blue/35 hover:border-brand-blue/60 hover:shadow-[0_20px_60px_rgba(41,182,246,0.12)]"
                    : "bg-white/[.025] border border-white/[.07] hover:border-brand-blue/20"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 bg-brand-blue text-brand-bg text-[10px] font-bold tracking-[0.08em] px-[14px] py-[4px] rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-2">
                  <span className="text-[11px] text-brand-text/35 tracking-[0.1em] font-semibold">
                    {plan.name.toUpperCase()}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-[6px]">
                  <span
                    className={`text-[52px] font-extrabold leading-none tracking-[-0.03em] ${
                      plan.highlight ? "text-brand-blue" : "text-brand-text"
                    }`}
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-brand-text/30 text-sm">/mo</span>
                </div>

                {/* Description */}
                <p className="text-[13px] text-brand-text/40 mb-7 leading-[1.5]">
                  {plan.desc}
                </p>

                {/* Features */}
                <div className="mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-[10px] mb-[10px]">
                      <Check
                        size={15}
                        color="#29b6f6"
                        strokeWidth={2.5}
                        className="mt-[2px] flex-shrink-0"
                      />
                      <span className="text-sm text-brand-text/60 leading-[1.4]">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className={`block w-full py-[14px] text-center text-[15px] font-bold rounded-[6px] tracking-[0.02em] transition-all duration-200 hover:-translate-y-px ${
                    plan.highlight
                      ? "bg-brand-blue text-brand-bg hover:bg-brand-blue-light hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)]"
                      : "bg-transparent text-brand-text border border-brand-text/20 hover:border-brand-blue/50 hover:text-brand-blue"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Setup note */}
        <AnimatedSection>
          <p className="text-center mt-8 text-[13px] text-brand-text/25">
            + One-time setup fee of $500 · Includes full AI configuration, training &amp; onboarding call
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
