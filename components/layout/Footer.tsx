import { Logo } from "@/components/shared/Logo";

const FOOTER_LINKS = ["Privacy Policy", "Terms of Service", "Contact"];

export function Footer() {
  return (
    <footer className="border-t border-brand-blue/[.08] py-8 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-5">
        {/* Brand */}
        <div className="flex items-center gap-[10px]">
          <Logo size={18} />
          <span
            className="text-sm font-extrabold tracking-[-0.01em] text-brand-text"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            SmartScale <span className="text-brand-blue">AI</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-6 flex-wrap">
          {FOOTER_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-brand-text/25 text-xs no-underline transition-colors duration-200 hover:text-brand-blue/70"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-brand-text/15 text-xs">
          © 2026 SmartScale AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
