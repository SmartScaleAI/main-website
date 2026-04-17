import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "./ScrollToTop";

export const metadata = {
  title: "Privacy Policy — SmartScale AI",
  description: "Privacy Policy for SmartScale AI services.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-brand-blue/10 pt-7 mt-7">
      <h2 className="text-[17px] font-bold text-brand-blue mb-4">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-[14px] font-semibold text-brand-text/80 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] text-brand-text/55 leading-relaxed">{children}</p>
  );
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[14px] text-brand-text/55 leading-relaxed">
          <span className="mt-1.75 w-1.5 h-1.5 rounded-full bg-brand-blue/60 flex-none" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "var(--color-brand-bg)" }}>
      <ScrollToTop />
      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(41,182,246,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(41,182,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(41,182,246,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black, transparent)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={24} />
          <span
            className="text-[17px] font-bold tracking-[-0.01em] text-brand-text"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            SmartScale <span className="text-brand-blue">AI</span>
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1 text-[14px] text-brand-text/40 hover:text-brand-text/70 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 px-4 pb-16 pt-4 max-w-5xl mx-auto w-full">
        <div
          className="bg-white/3 border border-brand-blue/15 rounded-2xl p-8 md:p-10 backdrop-blur-md"
          style={{
            boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(41,182,246,0.08)",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-brand-text tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-[13px] text-brand-text/40">Effective Date: April 17, 2025</p>
          </div>

          {/* 1. Introduction */}
          <Section title="1. Introduction">
            <div className="space-y-3">
              <Body>
                SmartScale AI (&ldquo;SmartScale AI,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an AI automation agency
                that provides subscription-based AI tools and services to small and mid-sized businesses.
                We are committed to protecting the privacy of our clients, their employees, and users of our services.
              </Body>
              <Body>
                This Privacy Policy explains how we collect, use, disclose, and safeguard personal information in
                connection with our website (smartaiscaling.com), client portal, and AI-powered services — including
                our AI voice receptionist product. It applies to all users located in the United States and Canada.
              </Body>
              <Body>
                By accessing our website, using our client portal, or engaging our services, you agree to the practices
                described in this Policy. If you do not agree, please discontinue use of our services.
              </Body>
            </div>
          </Section>

          {/* 2. Information We Collect */}
          <Section title="2. Information We Collect">
            <SubSection title="2.1 Business Contact Information">
              <Body>When you sign up, contact us, or engage our services, we may collect:</Body>
              <Ul items={["Full name and job title", "Business email address", "Phone number", "Business name and address"]} />
            </SubSection>

            <SubSection title="2.2 Payment and Billing Information">
              <Body>
                To process subscription payments, we collect billing-related information such as billing address and
                payment method details. Payment card data is processed directly by our payment processor, Stripe, Inc.,
                and is not stored on our systems.
              </Body>
            </SubSection>

            <SubSection title="2.3 Call Recordings and Transcripts">
              <div className="space-y-2">
                <Body>
                  Our AI voice receptionist product processes inbound phone calls on behalf of our clients. This may
                  result in the recording and transcription of calls between our AI agent and callers (end users).
                  These recordings and transcripts are used solely to provide and improve the services.
                </Body>
                <Body>
                  Clients are responsible for ensuring their end users are notified of call recording in accordance
                  with applicable law (see Section 9 — Client Responsibilities).
                </Body>
              </div>
            </SubSection>

            <SubSection title="2.4 End-User and Customer Data">
              <Body>
                In the course of delivering AI automation services, we may process personal information about our
                clients&rsquo; customers or end users, such as names, phone numbers, appointment details, and responses
                to AI-driven interactions. We process this data solely as a service provider acting on behalf of our clients.
              </Body>
            </SubSection>

            <SubSection title="2.5 Usage and Analytics Data">
              <Body>
                We automatically collect technical and behavioral data when you interact with our website or client
                portal, including:
              </Body>
              <Ul
                items={[
                  "IP address and approximate location",
                  "Browser type and operating system",
                  "Pages visited, time on site, and clickstream data",
                  "Referring URLs and search terms",
                ]}
              />
              <p className="text-[14px] text-brand-text/55 leading-relaxed mt-3">
                This data is collected via cookies and third-party analytics tools to help us improve our platform
                and user experience.
              </p>
            </SubSection>
          </Section>

          {/* 3. How We Use Your Information */}
          <Section title="3. How We Use Your Information">
            <Body>We use the information we collect to:</Body>
            <Ul
              items={[
                "Provide, operate, and improve our AI tools and services",
                "Process payments and manage your subscription",
                "Communicate with you about your account, updates, and support",
                "Train and refine AI models that power our services (using de-identified or aggregated data where possible)",
                "Monitor and analyze usage trends to improve platform performance",
                "Comply with our legal obligations and enforce our agreements",
                "Detect and prevent fraud, abuse, or security incidents",
              ]}
            />
          </Section>

          {/* 4. How We Share Your Information */}
          <Section title="4. How We Share Your Information">
            <Body>
              We do not sell your personal information. We may share your information with the following categories
              of third parties:
            </Body>

            <SubSection title="4.1 Sub-Processors and Service Providers">
              <Body>
                We share information with vendors who process data on our behalf to deliver and improve our services.
                These providers are contractually bound to protect your data. Key categories include:
              </Body>
              <Ul
                items={[
                  "GoHighLevel (GHL) — CRM, client management, appointment booking, and pipeline management",
                  "Retell AI — AI voice agent infrastructure: processes call audio and transcripts",
                  "Stripe, Inc. — Payment processing and billing management",
                ]}
              />
              <p className="text-[14px] text-brand-text/55 leading-relaxed mt-3">
                Each of these providers maintains their own privacy and security practices. We encourage you to review
                their policies.
              </p>
            </SubSection>

            <SubSection title="4.2 Legal and Compliance Disclosures">
              <Body>
                We may disclose your information when required by law, court order, or government authority, or when
                we reasonably believe disclosure is necessary to protect the rights, property, or safety of SmartScale AI,
                our clients, or the public.
              </Body>
            </SubSection>

            <SubSection title="4.3 Business Transfers">
              <Body>
                In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may
                be transferred as part of that transaction. We will provide notice before your information becomes subject
                to a materially different privacy policy.
              </Body>
            </SubSection>
          </Section>

          {/* 5. Call Recording Notice */}
          <Section title="5. Call Recording Notice">
            <div className="space-y-3">
              <Body>
                Our AI voice receptionist may record and transcribe telephone calls. Call recordings may be subject to
                federal and state/provincial consent laws. In the United States, federal law generally requires one-party
                consent, but many states (including California and Illinois) require all-party consent. In Canada,
                consent requirements vary by province.
              </Body>
              <Body>
                Clients deploying our AI receptionist are solely responsible for ensuring proper disclosures are made to
                callers and that applicable recording consent laws are followed in their jurisdiction. SmartScale AI is
                not liable for client failures to obtain required consents.
              </Body>
            </div>
          </Section>

          {/* 6. Cookies and Tracking Technologies */}
          <Section title="6. Cookies and Tracking Technologies">
            <Body>
              Our website uses cookies and similar tracking technologies to enhance your experience, analyze traffic,
              and support platform functionality. These may include:
            </Body>
            <Ul
              items={[
                "Essential cookies — required for the site to function",
                "Analytics cookies — used to understand how visitors interact with our site",
                "Preference cookies — used to remember your settings and choices",
              ]}
            />
            <p className="text-[14px] text-brand-text/55 leading-relaxed mt-3">
              You may control cookie preferences through your browser settings. Note that disabling certain cookies
              may affect the functionality of our website or portal.
            </p>
          </Section>

          {/* 7. Data Retention */}
          <Section title="7. Data Retention">
            <div className="space-y-3">
              <Body>
                We retain your personal information for as long as necessary to fulfill the purposes described in this
                Policy, maintain your account, and comply with our legal obligations. When data is no longer needed,
                we delete or anonymize it in a secure manner.
              </Body>
              <Body>
                Call recordings and transcripts are retained for a limited period as defined in your service agreement
                and deleted thereafter, unless a longer retention period is required by law or requested by the client.
              </Body>
            </div>
          </Section>

          {/* 8. Your Rights and Choices */}
          <Section title="8. Your Rights and Choices">
            <Body>
              Depending on your location and applicable law, you may have the following rights with respect to your
              personal information:
            </Body>
            <Ul
              items={[
                "Access — Request a copy of the personal information we hold about you",
                "Correction — Request that we correct inaccurate or incomplete information",
                "Deletion — Request that we delete your personal information, subject to legal retention requirements",
                "Opt-Out — Opt out of non-essential data collection or marketing communications",
                "Data Portability — Request your data in a structured, machine-readable format",
              ]}
            />
            <p className="text-[14px] text-brand-text/55 leading-relaxed mt-3">
              To exercise any of these rights, please contact us at the address listed in Section 11. We will respond
              to verified requests within 30 days. We do not discriminate against individuals who exercise their
              privacy rights.
            </p>
          </Section>

          {/* 9. Client Responsibilities */}
          <Section title="9. Client Responsibilities">
            <Body>
              Our clients (businesses that subscribe to SmartScale AI services) are responsible for:
            </Body>
            <Ul
              items={[
                "Ensuring their end users and customers are informed about how their data is collected and used through SmartScale AI-powered tools",
                "Obtaining all required consents for call recording and AI-driven interactions",
                "Complying with all applicable privacy laws in their industry and jurisdiction, including PIPEDA in Canada and relevant U.S. state privacy laws",
              ]}
            />
            <p className="text-[14px] text-brand-text/55 leading-relaxed mt-3">
              SmartScale AI acts as a data processor on behalf of its clients with respect to end-user data. Clients
              are the data controller and bear primary responsibility for lawful data processing under applicable law.
            </p>
          </Section>

          {/* 10. Data Security */}
          <Section title="10. Data Security">
            <div className="space-y-3">
              <Body>
                We implement reasonable administrative, technical, and physical safeguards to protect your personal
                information from unauthorized access, disclosure, alteration, or destruction. Our encryption standards
                are selected in part based on their security posture.
              </Body>
              <Body>
                However, no method of transmission over the internet or electronic storage is 100% secure. We cannot
                guarantee absolute security and encourage clients to use strong passwords and secure their own systems.
              </Body>
              <Body>
                In the event of a data breach that affects your personal information, we will notify you as required
                by applicable law.
              </Body>
            </div>
          </Section>

          {/* 11. Contact Us */}
          <Section title="11. Contact Us">
            <Body>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
              please contact us:
            </Body>
            <div className="mt-4 bg-brand-blue/5 border border-brand-blue/15 rounded-[10px] p-5">
              <p className="text-[14px] font-semibold text-brand-text/80 mb-1">SmartScale AI</p>
              <p className="text-[14px] text-brand-text/55">
                Email:{" "}
                <a
                  href="mailto:tyler@smartaiscaling.com"
                  className="text-brand-blue/80 hover:text-brand-blue transition-colors"
                >
                  tyler@smartaiscaling.com
                </a>
              </p>
              <p className="text-[14px] text-brand-text/55">
                Website:{" "}
                <a
                  href="https://www.smartaiscaling.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue/80 hover:text-brand-blue transition-colors"
                >
                  www.smartaiscaling.com
                </a>
              </p>
            </div>
          </Section>

          {/* 12. Changes to This Policy */}
          <Section title="12. Changes to This Policy">
            <div className="space-y-3">
              <Body>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                or legal requirements. When we make material changes we will update the Effective Date at the top of
                this document and, where appropriate, notify clients by email or through the client portal.
              </Body>
              <Body>
                Your continued use of our services after any updates constitutes your acceptance of the revised Policy.
              </Body>
            </div>
          </Section>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-brand-blue/10">
            <p className="text-[12px] text-brand-text/25 leading-relaxed">
              This document is a template and does not constitute legal advice. SmartScale AI recommends a licensed attorney to review the Privacy Policy to ensure compliance with all applicable privacy laws.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
