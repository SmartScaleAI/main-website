import { STATS } from "@/components/shared/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Stats() {
  return (
    <section className="border-t border-brand-blue/[.08] border-b border-brand-blue/[.08] py-10 px-6 bg-brand-blue/[.02]">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {STATS.map((s, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="text-center">
              <div
                className="font-extrabold text-brand-blue leading-none mb-[6px] tracking-[-0.02em]"
                style={{ fontSize: "clamp(28px, 5vw, 44px)" }}
              >
                {s.value}
              </div>
              <div className="text-[13px] text-brand-text/40 tracking-[0.04em]">
                {s.label}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
