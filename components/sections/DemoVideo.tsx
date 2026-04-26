"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  function handlePlay() {
    setHasPlayed(true);
    videoRef.current?.play();
  }

  return (
    <section className="pt-0 pb-20 px-6 relative overflow-hidden">
      <div className="max-w-225 mx-auto">
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-blue/8 border border-brand-blue/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
            <span className="text-[11px] text-brand-blue tracking-widest font-semibold">
              LIVE DEMO
            </span>
          </div>

          <h2
            className="font-extrabold leading-[1.1] tracking-[-0.02em] text-brand-text mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            Hear the AI Handle a Real Call
          </h2>

          <p className="text-[16px] leading-[1.65] text-brand-text/55 font-light max-w-140 mx-auto">
            From the first ring to a booked appointment — this is exactly what
            your customers experience, 24 hours a day.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div
            className="relative rounded-[20px] overflow-hidden border border-brand-blue/20"
            style={{
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(41,182,246,0.05)",
            }}
          >
            <video
              ref={videoRef}
              src="/demo-call.mp4"
              preload="metadata"
              playsInline
              controls={hasPlayed}
              className="w-full block"
            />

            {!hasPlayed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <button
                  onClick={handlePlay}
                  aria-label="Play demo"
                  className="w-18 h-18 rounded-full bg-brand-blue flex items-center justify-center transition-all duration-200 hover:bg-brand-blue-light hover:scale-105 shadow-[0_8px_32px_rgba(41,182,246,0.45)]"
                >
                  <Play
                    size={28}
                    color="#071d2e"
                    fill="#071d2e"
                    className="ml-1"
                  />
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
