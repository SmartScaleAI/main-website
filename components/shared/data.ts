export interface StatItem {
  value: string;
  label: string;
}

export interface Step {
  number: string;
  title: string;
  desc: string;
}

export interface Benefit {
  icon: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const NAV_ITEMS: [string, string][] = [
  ["how-it-works", "How It Works"],
  ["faq", "FAQ"],
];

export const STATS: StatItem[] = [
  { value: "24/7", label: "Lead Gen & Call Capture" },
  { value: "< 2s", label: "AI Answer Time" },
  { value: "80%", label: "Calls Resolved by AI" },
  { value: "0", label: "Missed Booked Jobs" },
];

export const STEPS: Step[] = [
  {
    number: "01",
    title: "We Build Your System",
    desc: "We learn your services, coverage area, and pricing. We launch targeted ad campaigns and configure your AI receptionist — live in under a week.",
  },
  {
    number: "02",
    title: "Leads Come In Around the Clock",
    desc: "Your ads generate inbound calls day and night. Your AI receptionist answers every one instantly, booking appointments and capturing every lead.",
  },
  {
    number: "03",
    title: "You Show Up and Get Paid",
    desc: "Every lead captured, every appointment confirmed. You focus on doing the work — SmartScale handles the rest.",
  },
];

export const BENEFITS: Benefit[] = [
  {
    icon: "Megaphone",
    title: "Ads Built for Your Trade",
    desc: "Done-for-you campaigns targeting homeowners who need HVAC or plumbing in your area. We run, optimize, and manage everything — 24/7.",
  },
  {
    icon: "Phone",
    title: "Never Miss a Call Again",
    desc: "Every call answered instantly — nights, weekends, holidays. No voicemail. No missed jobs to a competitor.",
  },
  {
    icon: "Calendar",
    title: "Appointments Booked Automatically",
    desc: "Your AI receptionist books directly to your calendar based on your real availability. Confirmation texts sent instantly.",
  },
  {
    icon: "Link2",
    title: "One Integrated System",
    desc: "Your ads feed your receptionist. Every dollar you spend on ads turns into a captured lead — nothing falls through the cracks.",
  },
  {
    icon: "MessageSquare",
    title: "Trained on Your Trade",
    desc: "Services, service area, pricing — your AI knows HVAC and plumbing inside out and answers every caller confidently.",
  },
  {
    icon: "Zap",
    title: "Real-Time Job Summaries",
    desc: "Get an instant notification after every call — who called, what they needed, and what was booked.",
  },
];

export const FAQS: FaqItem[] = [
  {
    q: "How much does it cost?",
    a: "Our pricing is tailored to your business. Book a free demo call and we'll walk you through everything — no pressure, no commitment.",
  },
  {
    q: "Do you handle the ads too?",
    a: "Yes — ads management is fully included. We build, run, and optimize your campaigns. Your ad spend goes directly to ads and is never bundled into our fee.",
  },
  {
    q: "Will the AI sound robotic?",
    a: "Not at all. SmartScale AI uses the latest voice technology — it sounds natural, professional, and conversational. It's trained specifically on HVAC and plumbing so it can talk the talk with every caller.",
  },
  {
    q: "What if a caller needs a real person?",
    a: "Your AI knows exactly when to hand off. You set the rules — emergency calls, complex situations, or any caller who asks for a human gets transferred to your team instantly.",
  },
  {
    q: "Can I keep my existing business number?",
    a: "Yes. We can port your existing number into SmartScale or set up a simple forward — whichever works best for your business.",
  },
  {
    q: "How long does setup take?",
    a: "Most clients are live within 5–7 business days. SmartScale handles all the configuration. You just join a one-hour onboarding call and answer our questions.",
  },
  {
    q: "What if I want to cancel?",
    a: "We require a 3-month minimum engagement to give the system time to perform. After that, continue month-to-month with 30 days notice.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "Zero. SmartScale AI handles everything end to end. You get a phone number, a calendar that fills itself, and a simple dashboard showing every call.",
  },
];
