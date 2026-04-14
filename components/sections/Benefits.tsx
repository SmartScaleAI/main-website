import {
  Phone,
  Calendar,
  ArrowLeftRight,
  MessageSquare,
  Users,
  Zap,
  LucideIcon,
} from "lucide-react";
import { BENEFITS } from "@/components/shared/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const ICON_MAP: Record<string, LucideIcon> = {
  Phone,
  Calendar,
  ArrowLeftRight,
  MessageSquare,
  Users,
  Zap,
};

export function Benefits() {
  return (
    <section className="py-20 md:py-[100px] px-6 bg-brand-blue/[.015]">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <AnimatedSection>
          <div className="mb-14">
            <p className="text-[11px] tracking-[0.14em] text-brand-blue font-semibold mb-[14px]">
              WHAT YOU GET
            </p>
            <h2
              className="font-extrabold leading-[1.1] text-brand-text tracking-[-0.02em] max-w-[560px]"
              style={{ fontSize: "clamp(26px, 4.5vw, 50px)" }}
            >
              Everything a receptionist does.{" "}
              <span className="text-brand-blue">Smarter.</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b, i) => {
            const Icon = ICON_MAP[b.icon];
            return (
              <AnimatedSection key={i} delay={(i % 3) * 0.1}>
                <div className="bg-white/[.02] border border-white/[.05] rounded-[10px] p-6 md:p-7 transition-all duration-300 hover:bg-brand-blue/[.04] hover:border-brand-blue/20 hover:-translate-y-[3px] h-full">
                  <div className="mb-4 w-11 h-11 bg-brand-blue/10 border border-brand-blue/20 rounded-[10px] flex items-center justify-center">
                    {Icon && <Icon size={20} color="#29b6f6" />}
                  </div>
                  <h3 className="text-[15px] font-bold text-brand-text mb-[10px]">
                    {b.title}
                  </h3>
                  <p className="text-sm text-brand-text/45 leading-[1.65]">
                    {b.desc}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
