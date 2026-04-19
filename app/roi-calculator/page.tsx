import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { RoiCalculator } from "./RoiCalculator"

export const metadata = {
  title: "ROI Calculator — SmartScale AI",
  description:
    "See exactly how much revenue you're leaving on the table and how fast SmartScale AI pays for itself. Built for HVAC & plumbing businesses.",
}

export default function RoiCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Navbar />
      <main className="flex-1">
        <RoiCalculator />
      </main>
      <Footer />
    </div>
  )
}
