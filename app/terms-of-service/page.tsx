import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "./ScrollToTop";

export const metadata = {
  title: "Terms of Service — SmartScale AI",
  description: "Terms of Service for SmartScale AI services.",
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
  return <p className="text-[14px] text-brand-text/55 leading-relaxed">{children}</p>;
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

function AllCaps({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold text-brand-text/70 leading-relaxed uppercase tracking-wide">
      {children}
    </p>
  );
}

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-[13px] text-brand-text/40">Effective Date: April 17, 2025</p>
          </div>

          {/* 1. Agreement to Terms */}
          <Section title="1. Agreement to Terms">
            <div className="space-y-3">
              <Body>
                These Terms of Service (&ldquo;Agreement&rdquo;) are a legally binding contract between SmartScale AI
                (&ldquo;SmartScale AI,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) and the businesses or individuals
                (&ldquo;Client,&rdquo; &ldquo;You,&rdquo; or &ldquo;your&rdquo;) accessing or using our AI automation services, website,
                and client portal (collectively, the &ldquo;Services&rdquo;).
              </Body>
              <Body>
                By subscribing to, accessing, or using our Services, you confirm that you have read, understood, and
                agreed to these Terms. If you are entering this Agreement on behalf of a business or other legal entity,
                you represent that you have authority to bind that entity. If you do not agree to these Terms, do not
                access or use our Services.
              </Body>
            </div>
          </Section>

          {/* 2. Description of Services */}
          <Section title="2. Description of Services">
            <Body>
              SmartScale AI provides subscription-based AI automation tools and services to small and mid-sized
              businesses. These may include:
            </Body>
            <Ul
              items={[
                "AI voice receptionist (inbound call handling, appointment booking, missed call text-back, frequently asked questions, and conversation handling)",
                "Automated workflow tools and integrations",
                "CRM and pipeline management features via our client portal",
              ]}
            />
            <p className="text-[14px] text-brand-text/55 leading-relaxed mt-3">
              The specific features and scope of Services available to you depend on your selected subscription plan.
              We reserve the right to modify, update, or discontinue features of the Services at any time, with
              reasonable notice where material changes affect your ability to use the core Services.
            </p>
          </Section>

          {/* 3. Subscriptions and Payment */}
          <Section title="3. Subscriptions and Payment">
            <SubSection title="3.1 Subscription Plans">
              <Body>
                SmartScale AI Services are offered by subscription. Subscription plans, pricing, and included features
                are described on our website and may be updated from time to time. We will provide advance notice of
                any pricing changes before they take effect for existing accounts.
              </Body>
            </SubSection>

            <SubSection title="3.2 Billing">
              <div className="space-y-2">
                <Body>
                  Subscription fees are billed on a recurring basis (monthly or annually, depending on your selected
                  plan). Your subscription will automatically renew at the end of each billing cycle unless you cancel
                  prior to the next renewal date. We do not offer prorated refunds for partial billing periods.
                </Body>
                <Body>
                  All payments are processed by Stripe, Inc. You agree to Stripe&rsquo;s terms of service in connection
                  with payment processing. SmartScale AI does not store full payment card details on its own systems.
                </Body>
              </div>
            </SubSection>

            <SubSection title="3.3 Taxes">
              <Body>
                All fees are exclusive of applicable taxes. You are responsible for paying any sales, use, VAT, GST,
                or similar taxes that may be imposed on your subscription by applicable laws, except for taxes assessed
                on SmartScale AI&rsquo;s income.
              </Body>
            </SubSection>
          </Section>

          {/* 4. Cancellation and Refund Policy */}
          <Section title="4. Cancellation and Refund Policy">
            <div className="space-y-3">
              <Body>
                You may cancel your subscription at any time through your client portal or by contacting us directly.
                Cancellations take effect at the end of the current billing period, and you will retain access to the
                Services until that date.
              </Body>
              <Body>
                All subscription fees are non-refundable. We do not provide partial refunds or credits for unused time
                remaining in a billing period at the time of cancellation. This includes cancellations made mid-cycle,
                regardless of usage level.
              </Body>
              <Body>
                SmartScale AI reserves the right to offer refunds or credits at its sole discretion in exceptional
                circumstances.
              </Body>
            </div>
          </Section>

          {/* 5. Client Responsibilities and Acceptable Use */}
          <Section title="5. Client Responsibilities and Acceptable Use">
            <SubSection title="5.1 Account Security">
              <Body>
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activity that occurs under your account. You agree to notify us immediately of any unauthorized access
                or suspected breach of security.
              </Body>
            </SubSection>

            <SubSection title="5.2 Acceptable Configuration">
              <Body>
                You are solely responsible for the accuracy and completeness of all information, scripts, FAQs, and
                workflows you configure within our platform. You acknowledge that AI-generated outputs and behaviors
                are influenced by the information you provide and that SmartScale AI is not responsible for
                misconfigured or inaccurate client-side inputs.
              </Body>
            </SubSection>

            <SubSection title="5.3 Call Recording Compliance">
              <Body>
                You are solely responsible for ensuring that your use of our AI voice receptionist complies with all
                applicable federal, state, and provincial call recording consent laws in the jurisdictions where you
                operate. This includes obtaining legally required disclosures to callers and all-party consent where
                required by law.
              </Body>
            </SubSection>

            <SubSection title="5.4 End-User Disclosures">
              <Body>
                You acknowledge that callers may interact with an AI model as part of our AI voice receptionist
                services. You are responsible for implementing AI identity disclosures to your end users where required
                by applicable law or best practice. SmartScale AI does not provide legal compliance advice.
              </Body>
            </SubSection>

            <SubSection title="5.5 Prohibited Uses">
              <Body>You agree not to use the Services to:</Body>
              <Ul
                items={[
                  "Violate any applicable law, regulation, or third-party rights",
                  "Harass, deceive, or harm end users or callers",
                  "Attempt to reverse-engineer, scrape, or otherwise access the underlying AI models or infrastructure without authorization",
                  "Transmit malware, spam, or any unauthorized automated requests",
                  "Use the Services in any high-risk context where AI errors could cause physical harm, including medical, legal, or emergency response applications",
                ]}
              />
            </SubSection>
          </Section>

          {/* 6. AI Outputs — Accuracy and Liability */}
          <Section title="6. AI Outputs — Accuracy and Liability">
            <SubSection title="6.1 Nature of AI Outputs">
              <Body>
                Our Services use AI and machine learning models to generate responses, book appointments, and handle
                call interactions. You acknowledge that AI-generated outputs are inherently imperfect and may
                occasionally be inaccurate or incomplete. SmartScale AI does not warrant that its outputs will be
                accurate, complete, or suitable for any specific purpose.
              </Body>
            </SubSection>

            <SubSection title="6.2 No Substitute for Human Review">
              <Body>
                You acknowledge and agree that AI-generated outputs should not be relied upon as a substitute for
                professional judgment in high-stakes decisions. You are responsible for reviewing and verifying all
                outputs before acting on them, particularly where accuracy has a material impact on your business or
                your customers.
              </Body>
            </SubSection>

            <SubSection title="6.3 Allocation of Liability for AI Errors">
              <Body>Notwithstanding anything else in this Agreement, liability for AI errors is limited as follows:</Body>
              <Ul
                items={[
                  "We are not liable for errors resulting from inaccurate, incomplete, or outdated information you provided during configuration",
                  "We are not liable for a caller's reliance on AI-generated information or for an AI-generated appointment being booked in error",
                  "We are not liable for missed appointments, lost business, or revenue attributable to AI errors",
                ]}
              />
              <p className="text-[14px] text-brand-text/55 leading-relaxed mt-3">
                In all cases, our liability related to AI outputs is capped as set out in Section 8 of this Agreement.
              </p>
            </SubSection>
          </Section>

          {/* 7. Intellectual Property */}
          <Section title="7. Intellectual Property">
            <SubSection title="7.1 Our IP">
              <Body>
                SmartScale AI retains all right, title, and interest in and to the Services, our platform, underlying
                AI models, workflows, software, and all related intellectual property. Nothing in this Agreement
                transfers ownership to you.
              </Body>
            </SubSection>

            <SubSection title="7.2 Your Content">
              <Body>
                You retain ownership of all scripts, data, and materials you provide to us in connection with the
                Services (&ldquo;Your Content&rdquo;). By providing Your Content, you grant SmartScale AI a limited,
                non-exclusive license to use Your Content solely to the extent necessary to configure, deliver, and
                improve the Services.
              </Body>
            </SubSection>

            <SubSection title="7.3 Feedback">
              <Body>
                If you provide us with feedback, suggestions, or ideas about our Services, you grant SmartScale AI a
                perpetual, royalty-free license to use that feedback for any business purpose, including improving our
                products and Services.
              </Body>
            </SubSection>
          </Section>

          {/* 8. Limitation of Liability */}
          <Section title="8. Limitation of Liability">
            <div className="space-y-3">
              <div className="bg-brand-blue/[.04] border border-brand-blue/10 rounded-xl p-5 space-y-3">
                <AllCaps>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SMARTSCALE AI SHALL NOT BE LIABLE FOR ANY
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
                  LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS, LOSS OF DATA, LOSS OF GOODWILL, OR COSTS OF
                  SUBSTITUTE SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </AllCaps>
                <AllCaps>
                  SMARTSCALE AI&rsquo;S TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATED TO
                  THIS AGREEMENT OR THE SERVICES SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO SMARTSCALE AI IN THE
                  THREE (3) MONTHS IMMEDIATELY PRECEDING THE CLAIM GIVING RISE TO THE CLAIM.
                </AllCaps>
              </div>
              <Body>
                These limitations apply regardless of the form of action, whether in contract, tort, negligence, strict
                liability, or otherwise, and even if SmartScale AI has been advised of the possibility of such damages.
                In some jurisdictions, our liability shall be limited to the maximum extent permitted by law.
              </Body>
            </div>
          </Section>

          {/* 9. Disclaimer of Warranties */}
          <Section title="9. Disclaimer of Warranties">
            <div className="space-y-3">
              <div className="bg-brand-blue/[.04] border border-brand-blue/10 rounded-xl p-5">
                <AllCaps>
                  THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED. SMARTSCALE AI EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING THE IMPLIED
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </AllCaps>
              </div>
              <Body>We do not warrant that:</Body>
              <Ul
                items={[
                  "The Services will operate uninterrupted or error-free",
                  "AI outputs will be accurate, complete, or suitable for your specific use case",
                  "Any defects in the Services will be corrected",
                  "The Services will meet your specific requirements",
                ]}
              />
              <Body>
                The Services are provided on a best-efforts basis without any guarantees of uptime.
              </Body>
            </div>
          </Section>

          {/* 10. Indemnification */}
          <Section title="10. Indemnification">
            <Body>
              You agree to indemnify, defend, and hold harmless SmartScale AI and its officers, directors, employees,
              contractors, and agents from and against any claims, liabilities, damages, judgments, awards, losses,
              costs, expenses, and attorneys&rsquo; fees arising out of or relating to:
            </Body>
            <Ul
              items={[
                "Your use of the Services in violation of this Agreement",
                "Your failure to obtain legally required consents or make required AI disclosures to your end users",
                "Any claim brought by a third party resulting from your use of AI outputs",
                "Any claim by a third party (including your customers or callers) arising from your use of our Services",
                "Your violation of any applicable law or regulation",
              ]}
            />
          </Section>

          {/* 11. Confidentiality */}
          <Section title="11. Confidentiality">
            <Body>
              Each party agrees to maintain in confidence proprietary or confidential information of the other party
              in connection with this Agreement (&ldquo;Confidential Information&rdquo;). Each party agrees to: (a) hold the
              other party&rsquo;s Confidential Information in confidence; (b) not disclose it to third parties without
              prior written consent; and (c) use it only to the extent necessary to fulfill its obligations under this
              Agreement. Each party agrees to use the same degree of care as it uses to protect its own confidential
              information, but not less than reasonable care, to prevent unauthorized disclosure. This obligation
              continues for three years following the disclosing party&rsquo;s disclosure.
            </Body>
          </Section>

          {/* 12. Term and Termination */}
          <Section title="12. Term and Termination">
            <SubSection title="12.1 Term">
              <Body>
                This Agreement begins on the date you first subscribe to or access the Services and continues until
                terminated in accordance with this Section.
              </Body>
            </SubSection>

            <SubSection title="12.2 Termination by You">
              <Body>
                You may cancel your subscription at any time as described in Section 4. Cancellation does not entitle
                you to any refunds unless expressly stated.
              </Body>
            </SubSection>

            <SubSection title="12.3 Termination by SmartScale AI">
              <Body>
                We may suspend or terminate your access to the Services immediately, with or without notice, if: (a)
                you materially breach this Agreement and fail to cure the breach within 30 days of receiving written
                notice; (b) you fail to pay applicable fees; (c) we determine you pose a legal, security, or
                reputational risk; or (d) we cease to offer the Services.
              </Body>
            </SubSection>

            <SubSection title="12.4 Effect of Termination">
              <Body>
                Upon termination, your right to access the Services ceases immediately. We may delete your account
                data in accordance with our data retention practices. Sections 4, 7, 8, 9, 10, 11, and 14 survive
                termination of this Agreement.
              </Body>
            </SubSection>
          </Section>

          {/* 13. Modifications to This Agreement */}
          <Section title="13. Modifications to This Agreement">
            <Body>
              SmartScale AI reserves the right to modify this Agreement at any time. When we make material changes we
              will update the Effective Date at the top of this document and notify clients by email or through the
              client portal at least 30 days before changes take effect. Your continued use of the Services after the
              effective date of any modification constitutes your acceptance of the modified Agreement. If you do not
              agree to an update, you must terminate the Services before the effective date of any modification.
            </Body>
          </Section>

          {/* 14. Governing Law and Dispute Resolution */}
          <Section title="14. Governing Law and Dispute Resolution">
            <SubSection title="14.1 Governing Law">
              <Body>
                This Agreement shall be governed by and construed in accordance with the laws of the State of Florida,
                without regard to conflicts of law principles.
              </Body>
            </SubSection>

            <SubSection title="14.2 Informal Resolution">
              <Body>
                Before initiating any formal legal proceeding, you agree to contact us at the address in Section 15
                and give us at least 30 days to attempt to resolve the dispute informally.
              </Body>
            </SubSection>

            <SubSection title="14.3 Binding Arbitration">
              <Body>
                If informal resolution fails, any dispute or controversy arising out of or relating to this Agreement
                or the Services shall be resolved by binding arbitration administered by the American Arbitration
                Association (&ldquo;AAA&rdquo;) in accordance with its Commercial Arbitration Rules. The arbitrator&rsquo;s
                decision shall be final and binding.
              </Body>
            </SubSection>

            <SubSection title="14.4 Class Action Waiver">
              <div className="bg-brand-blue/[.04] border border-brand-blue/10 rounded-xl p-4">
                <AllCaps>
                  TO THE EXTENT ALLOWED BY APPLICABLE LAW, EACH PARTY WAIVES ANY CLAIMS AGAINST THE OTHER ONLY ON
                  AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE
                  ACTION. THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON&rsquo;S CLAIMS OR OTHERWISE PRESIDE
                  OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING.
                </AllCaps>
              </div>
            </SubSection>
          </Section>

          {/* 15. General Provisions */}
          <Section title="15. General Provisions">
            <SubSection title="15.1 Entire Agreement">
              <Body>
                These Terms, together with our Privacy Policy and any other service agreements executed separately,
                constitute the entire agreement between you and SmartScale AI concerning the Services and supersede
                all prior agreements, representations, and understandings.
              </Body>
            </SubSection>

            <SubSection title="15.2 Severability">
              <Body>
                If any provision of this Agreement is found to be invalid or unenforceable, that provision shall be
                modified to the minimum extent necessary to make it enforceable, and all remaining provisions shall
                remain in full force and effect.
              </Body>
            </SubSection>

            <SubSection title="15.3 Waiver">
              <Body>
                Our failure to enforce any right or provision of this Agreement will not be deemed a waiver of such
                right or provision.
              </Body>
            </SubSection>

            <SubSection title="15.4 Assignment">
              <Body>
                You may not assign or transfer any rights or obligations under this Agreement without our prior written
                consent. We may assign this Agreement in connection with a merger, acquisition, or sale of all or
                substantially all of our assets.
              </Body>
            </SubSection>

            <SubSection title="15.5 Force Majeure">
              <Body>
                SmartScale AI shall not be liable for any failure or delay in performance obligations due to causes
                beyond our reasonable control, including acts of God, natural disasters, government actions, war,
                civil unrest, pandemic, labor disputes, or failures of third-party services or infrastructure.
              </Body>
            </SubSection>

            <SubSection title="15.6 Contact Information">
              <Body>For questions about these Terms, contact us at:</Body>
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
            </SubSection>
          </Section>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-brand-blue/10">
            <p className="text-[12px] text-brand-text/25 leading-relaxed">
              This document is a template and does not constitute legal advice. SmartScale AI recommends a licensed attorney review these Terms to ensure compliance with all applicable laws.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
