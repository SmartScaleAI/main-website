"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/components/shared/data";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-[100px] px-6 bg-brand-blue/[.015]">
      <div className="max-w-[760px] mx-auto">
        {/* Heading */}
        <AnimatedSection>
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.14em] text-brand-blue font-semibold mb-[14px]">
              FAQ
            </p>
            <h2
              className="font-extrabold text-brand-text leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(26px, 4.5vw, 48px)" }}
            >
              Questions we{" "}
              <span className="text-brand-blue">always get asked.</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Accordion */}
        <AnimatedSection delay={0.1}>
          <div className="border-t border-white/[.07]">
            <Accordion multiple={false}>
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={i}
                  className="border-b border-white/[.07] border-t-0"
                >
                  <AccordionTrigger className="py-[22px] text-brand-text font-medium text-[15px] text-left hover:no-underline hover:text-brand-text [&>svg]:text-brand-blue [&>svg]:opacity-70">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-[22px] text-sm text-brand-text/55 leading-[1.7]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
