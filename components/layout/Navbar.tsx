"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { NAV_ITEMS } from "@/components/shared/data";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY > 40) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const wasOpen = menuOpen;
    setMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      wasOpen ? 300 : 0
    );
  };

  const navBg = scrolled || menuOpen
    ? "bg-brand-bg/95 backdrop-blur-lg border-b border-brand-blue/[.08]"
    : "bg-transparent border-b border-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] px-6 h-[68px] flex items-center justify-between transition-all duration-400 ${navBg}`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-[10px]">
        <Logo size={24} />
        <span
          className="text-[17px] font-extrabold tracking-[-0.01em] text-brand-text"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          SmartScale <span className="text-brand-blue">AI</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-10">
        <div className="flex gap-8">
          {NAV_ITEMS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-brand-text/55 text-sm cursor-pointer hover:text-brand-text transition-colors duration-200 bg-transparent border-none tracking-[0.01em]"
            >
              {label}
            </button>
          ))}
          <Link
            href="/roi-calculator"
            className="text-brand-text/55 text-sm hover:text-brand-text transition-colors duration-200 tracking-[0.01em]"
          >
            ROI Calculator
          </Link>
        </div>
        <Link
          href="/book-demo"
          className="bg-brand-blue text-brand-bg text-[13px] font-bold px-[22px] py-[10px] rounded-[6px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(41,182,246,0.3)]"
        >
          Book a Demo
        </Link>
      </div>

      {/* Mobile hamburger */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger
          className="md:hidden p-2 flex items-center justify-center bg-transparent border-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Hamburger open={menuOpen} />
        </SheetTrigger>
        <SheetContent
          side="top"
          showCloseButton={false}
          className="border-t border-brand-blue/10 bg-brand-bg/98 backdrop-blur-2xl px-0 shadow-none"
          style={{ top: "68px", height: "auto" }}
        >
          <div className="flex flex-col">
            {NAV_ITEMS.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-8 py-[22px] text-[22px] font-bold text-brand-text/65 bg-transparent border-none border-b border-brand-blue/[.07] cursor-pointer text-left transition-colors duration-200 hover:text-brand-blue hover:bg-brand-blue/[.04]"
                style={{ fontFamily: "var(--font-barlow)", letterSpacing: "-0.01em" }}
              >
                {label}
              </button>
            ))}
            <Link
              href="/roi-calculator"
              onClick={() => setMenuOpen(false)}
              className="px-8 py-[22px] text-[22px] font-bold text-brand-text/65 border-b border-brand-blue/[.07] cursor-pointer text-left transition-colors duration-200 hover:text-brand-blue hover:bg-brand-blue/[.04] block"
              style={{ fontFamily: "var(--font-barlow)", letterSpacing: "-0.01em" }}
            >
              ROI Calculator
            </Link>
            <div className="px-6 py-7">
              <Link
                href="/book-demo"
                onClick={() => setMenuOpen(false)}
                className="block w-full bg-brand-blue text-brand-bg font-bold py-4 text-[16px] rounded-[6px] tracking-[0.02em] transition-all duration-200 hover:bg-brand-blue-light text-center"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="w-[22px] flex flex-col">
      <span
        className="block w-[22px] h-[2px] bg-brand-text rounded-[2px] mb-[5px] origin-center transition-all duration-[280ms] ease-in-out"
        style={{ transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }}
      />
      <span
        className="block w-[22px] h-[2px] bg-brand-text rounded-[2px] mb-[5px] origin-center transition-all duration-[280ms] ease-in-out"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="block w-[22px] h-[2px] bg-brand-text rounded-[2px] origin-center transition-all duration-[280ms] ease-in-out"
        style={{ transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }}
      />
    </div>
  );
}
