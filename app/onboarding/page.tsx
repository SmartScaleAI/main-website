import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/shared/Logo'
import OnboardingForm from '@/components/onboarding/OnboardingForm'

export const metadata: Metadata = {
  title: 'Get Started | SmartScale AI',
  description: 'Set up your AI receptionist and lead generation system.',
  robots: { index: false, follow: false },
}

export default function OnboardingPage() {
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ background: 'var(--color-brand-bg)' }}
    >
      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(41,182,246,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(41,182,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(41,182,246,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-[10px]">
          <Logo size={24} />
          <span
            className="text-[17px] font-bold tracking-[-0.01em] text-brand-text"
            style={{ fontFamily: 'var(--font-barlow)' }}
          >
            SmartScale <span className="text-brand-blue">AI</span>
          </span>
        </Link>
      </div>

      <OnboardingForm />
    </div>
  )
}
