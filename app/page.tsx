import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { DemoVideo } from "@/components/sections/DemoVideo";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { Faq } from "@/components/sections/Faq";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DemoVideo />
        <Stats />
        <HowItWorks />
        <Benefits />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
