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

export interface Plan {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const NAV_ITEMS: [string, string][] = [
  ["how-it-works", "How It Works"],
  ["pricing", "Pricing"],
  ["faq", "FAQ"],
];

export const STATS: StatItem[] = [
  { value: "24/7", label: "Always Answering" },
  { value: "< 2s", label: "Answer Time" },
  { value: "80%", label: "Calls Resolved by AI" },
  { value: "0", label: "Missed Opportunities" },
];

export const STEPS: Step[] = [
  {
    number: "01",
    title: "We Learn Your Business",
    desc: "We gather your services, hours, FAQs, and booking rules. SmartScale AI configures and trains your receptionist — ready to go live in under a week.",
  },
  {
    number: "02",
    title: "AI Answers Every Call",
    desc: "Your dedicated number is live 24/7. SmartScale AI books appointments, answers questions, and transfers urgent calls to your team instantly.",
  },
  {
    number: "03",
    title: "You Focus on Your Business",
    desc: "Every caller is logged, every appointment confirmed. You focus on your business. SmartScale handles the phones.",
  },
];

export const BENEFITS: Benefit[] = [
  {
    icon: "Phone",
    title: "Never Miss a Call Again",
    desc: "Every call answered instantly — nights, weekends, holidays. No voicemail. No missed customers to a competitor.",
  },
  {
    icon: "Calendar",
    title: "Appointments Booked Automatically",
    desc: "SmartScale AI books directly to your calendar based on your real availability. Confirmation texts sent instantly.",
  },
  {
    icon: "ArrowLeftRight",
    title: "Smart Call Transfers",
    desc: "Urgent situations? Your AI knows exactly when to hand off to a real person — every single time.",
  },
  {
    icon: "MessageSquare",
    title: "Knows Your Business Cold",
    desc: "Pricing, service area, availability — SmartScale AI is trained on your specific business and answers confidently.",
  },
  {
    icon: "Users",
    title: "Every Caller Becomes a Lead",
    desc: "All callers are automatically saved to your CRM with full call details, notes, and next steps.",
  },
  {
    icon: "Zap",
    title: "Real-Time Call Summaries",
    desc: "Get an instant notification after every call — who called, what they needed, what was booked.",
  },
];

export const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "$299",
    desc: "Perfect for small operations ready to stop missing calls",
    features: [
      "AI receptionist 24/7",
      "Up to 200 calls/mo",
      "Appointment booking",
      "SMS confirmations",
      "Basic call summaries",
      "Email support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Standard",
    price: "$399",
    desc: "Most popular for growing businesses",
    features: [
      "Everything in Starter",
      "Up to 400 calls/mo",
      "After-hours handling",
      "CRM lead pipeline",
      "Review request automation",
      "Priority support",
    ],
    cta: "Get Started",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "$599",
    desc: "For high-volume businesses that can't miss anything",
    features: [
      "Everything in Standard",
      "Unlimited calls",
      "Missed call text-back",
      "Advanced analytics dashboard",
      "Multi-location support",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    highlight: false,
  },
];

export const FAQS: FaqItem[] = [
  {
    q: "Will it sound robotic?",
    a: "Not at all. SmartScale AI uses the latest voice technology — it sounds natural, professional, and conversational. We give your receptionist a name and personality that represents your brand.",
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
    a: "No long-term contracts. Cancel anytime with 30 days notice. We'll help you transition your number back with no hassle.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "Zero. SmartScale AI handles everything end to end. You get a phone number, a calendar that fills itself, and a simple dashboard showing every call.",
  },
];

export const HERO_PROOF_ICONS = [
  { name: "Stethoscope", label: "Medical" },
  { name: "Scissors",    label: "Salon" },
  { name: "Scale",       label: "Legal" },
  { name: "Utensils",    label: "Restaurant" },
  { name: "Car",         label: "Auto" },
];
