import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "SmartScale AI — Lead Generation & AI Receptionist for HVAC & Plumbing",
  description:
    "SmartScale AI runs targeted ads and answers every call 24/7 — so HVAC contractors and plumbers never miss a booked job again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={barlow.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
