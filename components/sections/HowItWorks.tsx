import { STEPS } from "@/components/shared/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-[100px] px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <AnimatedSection>
          <div className="text-center mb-[72px]">
            <p className="text-[11px] tracking-[0.14em] text-brand-blue font-semibold mb-[14px]">
              THE PROCESS
            </p>
            <h2
              className="font-extrabold leading-[1.1] text-brand-text tracking-[-0.02em]"
              style={{ fontSize: "clamp(26px, 4.5vw, 50px)" }}
            >
              Live in under a week.{" "}
              <span className="text-brand-blue">We handle everything.</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-9 md:gap-0 relative">
          {/* Connector lines (desktop only) — split into two segments to avoid overlapping circle 02 */}
          <div
            className="hidden md:block absolute top-8 h-px"
            style={{
              left: "calc(16.6% + 32px)",
              right: "calc(50% + 32px)",
              background:
                "linear-gradient(90deg, rgba(41,182,246,0.5), rgba(41,182,246,0.1))",
            }}
          />
          <div
            className="hidden md:block absolute top-8 h-px"
            style={{
              left: "calc(50% + 32px)",
              right: "calc(16.6% + 32px)",
              background:
                "linear-gradient(90deg, rgba(41,182,246,0.1), rgba(41,182,246,0.5))",
            }}
          />

          {STEPS.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.15} className="flex-1">
              <div className="px-6 text-center">
                <div className="w-16 h-16 rounded-full border border-brand-blue/35 bg-brand-blue/6 flex items-center justify-center mx-auto mb-6 relative z-1">
                  <span
                    className="text-[18px] font-extrabold text-brand-blue"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-[17px] font-bold text-brand-text mb-3 leading-[1.3]">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-text/45 leading-[1.7]">
                  {step.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
