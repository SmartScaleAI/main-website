import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function CtaSection() {
  return (
    <section className="py-[100px] px-6 relative overflow-hidden text-center">
      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(41,182,246,0.09) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,182,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(41,182,246,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
        }}
      />

      <AnimatedSection>
        <div className="max-w-[620px] mx-auto relative">
          <h2
            className="font-extrabold text-brand-text leading-[1.08] mb-[18px] tracking-[-0.025em]"
            style={{ fontSize: "clamp(28px, 5.5vw, 58px)" }}
          >
            Ready to scale smarter
            <br />
            with <span className="text-brand-blue">SmartScale AI?</span>
          </h2>
          <p className="text-[17px] text-brand-text/45 mb-10 leading-[1.65] font-light">
            Setup takes less than a week. No technical knowledge needed. No
            long-term contracts. Just more booked jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-[14px] justify-center flex-wrap">
            <a
              href="#pricing"
              className="bg-brand-blue text-brand-bg font-bold px-10 py-[17px] rounded-[6px] text-[16px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)] w-full sm:w-auto max-w-[320px] mx-auto sm:mx-0 text-center"
            >
              Get Started Today
            </a>
            <a
              href="#"
              className="bg-transparent text-brand-text border border-brand-text/20 px-10 py-[17px] rounded-[6px] text-[16px] font-normal tracking-[0.02em] transition-all duration-200 hover:border-brand-blue/50 hover:text-brand-blue hover:-translate-y-px w-full sm:w-auto max-w-[320px] mx-auto sm:mx-0 text-center"
            >
              Book a Demo Call
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
