import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  Database,
  Cookie,
  Users,
  AlertCircle,
  HelpCircle,
  Mail,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { pageTransition, fadeUp } from '../utils/motion';

interface PrivacyPolicyPageProps {
  onNavigate?: (path: string) => void;
  onOpenScheduleModal?: (topic?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sections = [
    { id: 'introduction', title: '1. Introduction & Overview', icon: FileText },
    { id: 'info-collected', title: '2. Information We Collect', icon: Database },
    { id: 'collection-methods', title: '3. How We Collect Information', icon: Eye },
    { id: 'use-of-info', title: '4. How We Use Your Information', icon: ShieldCheck },
    { id: 'cookies-tracking', title: '5. Cookies & Tracking Technologies', icon: Cookie },
    { id: 'data-sharing', title: '6. Data Sharing & Third Parties', icon: Users },
    { id: 'storage-security', title: '7. Data Storage & Security Protocols', icon: Lock },
    { id: 'client-project-data', title: '8. Client Project Data & Confidentiality', icon: FileText },
    { id: 'user-rights', title: '9. Your Rights under Indian Law', icon: Sparkles },
    { id: 'children-privacy', title: "10. Children's Privacy", icon: AlertCircle },
    { id: 'policy-changes', title: '11. Changes to This Policy', icon: FileText },
    { id: 'contact-info', title: '12. Contact Information & Grievances', icon: Mail },
  ];

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-10 sm:space-y-14 pb-16 sm:pb-24 overflow-x-hidden bg-[#FAF8F6]"
    >
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 pb-4 sm:pb-8 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gradient-to-tr from-[#FF5A1F]/10 via-[#FF7A45]/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5">
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LEGAL & COMPLIANCE</span>
          </motion.div>

          <motion.h1
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight"
          >
            Privacy <span className="text-[#FF5A1F]">Policy</span>
          </motion.h1>

          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-[#6B6660] max-w-2xl mx-auto leading-relaxed"
          >
            How Alpha AI Services collects, uses, protects, and handles your personal and business data across our website and digital engineering engagements.
          </motion.p>

          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-[#EDE9E4] text-xs font-semibold text-[#111111] shadow-2xs"
          >
            <span>Last Updated:</span>
            <span className="text-[#FF5A1F] font-bold">August 30, 2026</span>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN CONTENT + TABLE OF CONTENTS */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Nav Sticky Sidebar for Desktop */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#EDE9E4] shadow-soft space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
                Sections Overview
              </h3>
              <nav className="space-y-1 text-xs">
                {sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1.5 px-2.5 rounded-lg text-[#6B6660] hover:text-[#FF5A1F] hover:bg-[#FAF8F6] transition-all truncate font-medium"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="bg-[#111111] text-white rounded-2xl p-5 border border-[#2A2A2A] shadow-soft space-y-3">
              <div className="flex items-center gap-2 text-[#FF5A1F]">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Privacy Queries</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Have specific questions regarding our data policies or need an NDA before sharing specs?
              </p>
              <a
                href="mailto:info@alphaaiservices.in"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5A1F] hover:underline"
              >
                <span>info@alphaaiservices.in</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Detailed Policy Text */}
          <div className="lg:col-span-8 space-y-8 text-[#262626]">
            {/* 1. Introduction */}
            <article
              id="introduction"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Section 01</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                1. Introduction & Scope
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Alpha AI Services (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is a technology services studio headquartered in India, specializing in custom software development, artificial intelligence systems, modern web and mobile applications, social media management, and ongoing monthly retainer technology support.
              </p>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                This Privacy Policy describes how we collect, store, process, and safeguard personal and business information when you visit our website (<strong>https://alphaaiservices.in</strong>), interact with our consultation and inquiry workflows, or engage us for professional engineering services.
              </p>
              <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] text-xs text-[#6B6660] leading-relaxed">
                <strong className="text-[#111111]">Statutory Compliance Intent:</strong> We design our data management workflows with the intent to adhere to applicable Indian legislation, notably the <em>Digital Personal Data Protection Act (DPDP Act), 2023</em> and the <em>Information Technology Act, 2000</em> (alongside associated Information Technology Reasonable Security Practices and Procedures Rules).
              </div>
            </article>

            {/* 2. Information We Collect */}
            <article
              id="info-collected"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-4 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Section 02</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                2. Information We Collect
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                We only collect information necessary to evaluate project feasibility, provide tailored architectural proposals, execute ongoing software deliverables, and maintain smooth communication:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <h4 className="text-xs font-extrabold text-[#111111]">A. Contact & Consultation Information</h4>
                  <p className="text-xs text-[#524D46] leading-relaxed">
                    Full name, business email address, phone / WhatsApp number, company or brand name, project timeline requirements, estimated budget brackets, and any specific architectural descriptions provided during form submissions or consultations.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <h4 className="text-xs font-extrabold text-[#111111]">B. Technical & Analytics Information</h4>
                  <p className="text-xs text-[#524D46] leading-relaxed">
                    Internet Protocol (IP) address, browser user-agent string, operating system version, device identifiers, referring URL, time spent on pages, and navigation pathways collected through privacy-focused web telemetry and Google Analytics.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <h4 className="text-xs font-extrabold text-[#111111]">C. Communication Records</h4>
                  <p className="text-xs text-[#524D46] leading-relaxed">
                    Records and transcriptions of conversations conducted via direct email (<em>info@alphaaiservices.in</em>), consultation scheduling forms, or authorized WhatsApp business chat channels.
                  </p>
                </div>
              </div>
            </article>

            {/* 3. How We Collect Information */}
            <article
              id="collection-methods"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Eye className="w-4 h-4" />
                <span>Section 03</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                3. How We Collect Information
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A453E] list-disc list-inside leading-relaxed">
                <li><strong>Direct Website Forms:</strong> When you submit a project inquiry, schedule a consultation session, or request milestone quotes.</li>
                <li><strong>Direct Electronic Communication:</strong> When you email our team, chat via WhatsApp, or call our authorized representatives.</li>
                <li><strong>Automated Cookies & Telemetry:</strong> When you browse our digital pages, anonymous technical metrics are recorded via standard server logs and analytical scripts.</li>
              </ul>
            </article>

            {/* 4. How We Use Your Information */}
            <article
              id="use-of-info"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Section 04</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                4. How We Use Your Information
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                We use collected information exclusively for legitimate, explicit business operations:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A453E] list-disc list-inside leading-relaxed">
                <li>Responding promptly to technical inquiries and project briefs (typically within one business day).</li>
                <li>Preparing comprehensive Statements of Work (SOW), technical PRDs, and milestone delivery estimates.</li>
                <li>Executing active design, software engineering, mobile development, and deployment sprints.</li>
                <li>Administering ongoing monthly retainer agreements, proactive security patches, and SLA support.</li>
                <li>Issuing project invoices, sprint summaries, and operational status notifications.</li>
                <li>Maintaining website performance, diagnosing runtime bugs, and preventing fraudulent requests.</li>
              </ul>
            </article>

            {/* 5. Cookies & Tracking */}
            <article
              id="cookies-tracking"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Cookie className="w-4 h-4" />
                <span>Section 05</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                5. Cookies & Tracking Technologies
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Our website utilizes basic cookies and modern web storage technologies to improve performance, remember interface preferences, and analyze aggregate traffic flows:
              </p>
              <div className="space-y-2 text-xs text-[#524D46]">
                <p><strong>Essential Cookies:</strong> Required for secure routing, form state retention, and responsive styling.</p>
                <p><strong>Analytical Cookies (e.g. Google Analytics):</strong> Measure anonymous aggregated data such as page impressions and dwell time to optimize user experience.</p>
              </div>
              <p className="text-xs text-[#6B6660] italic">
                You can manage or disable cookie preferences at any time through your browser settings (Chrome, Safari, Firefox, Edge). Disabling non-essential cookies will not impair core browsing functionality.
              </p>
            </article>

            {/* 6. Data Sharing & Third Parties */}
            <article
              id="data-sharing"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Section 06</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                6. Data Sharing & Third Parties
              </h2>
              <div className="p-3.5 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-xs font-bold text-[#FF5A1F]">
                We do NOT sell, rent, trade, or monetize your personal or business data under any circumstances.
              </div>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Information is only shared with trusted service providers strictly to the extent required to operate our digital infrastructure:
              </p>
              <ul className="space-y-1.5 text-xs text-[#524D46] list-disc list-inside">
                <li>Cloud hosting & CDN infrastructure providers (e.g., Cloudflare, AWS, Vercel).</li>
                <li>Telemetry and error monitoring services (e.g., Google Analytics).</li>
                <li>Communication tools used for authorized correspondence (e.g., Google Workspace, WhatsApp Business).</li>
                <li>Statutory law enforcement agencies solely when mandated by valid judicial orders under Indian law.</li>
              </ul>
            </article>

            {/* 7. Data Storage & Security */}
            <article
              id="storage-security"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Section 07</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                7. Data Storage & Security Protocols
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                We implement industry-standard administrative, physical, and technical safeguards:
              </p>
              <ul className="space-y-2 text-xs text-[#524D46] list-disc list-inside">
                <li><strong>Encryption:</strong> All web traffic is strictly encrypted in transit using TLS 1.3 encryption.</li>
                <li><strong>Access Control:</strong> Role-based access controls (RBAC) restrict internal access to project details solely to designated engineers.</li>
                <li><strong>Data Retention:</strong> Inquiry data is retained for the duration necessary to satisfy commercial collaboration and statutory audit compliance, after which it is securely expunged.</li>
              </ul>
            </article>

            {/* 8. Client Project Data */}
            <article
              id="client-project-data"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Section 08</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                8. Client Project Data & Confidentiality
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                In the course of delivering custom software, AI integrations, or mobile apps, clients may share proprietary assets, API keys, credentials, or internal documents. We maintain a strict confidentiality commitment:
              </p>
              <div className="space-y-2 text-xs text-[#524D46]">
                <p>• Client credentials and environment variables are stored in encrypted secret vaults (e.g. HashiCorp Vault / AWS Secrets Manager) and never committed to source control.</p>
                <p>• We willingly sign mutual Non-Disclosure Agreements (NDAs) prior to receiving proprietary codebases or business models.</p>
                <p>• Upon project completion or engagement termination, staging secrets and proprietary copies are purged in accordance with our client agreement.</p>
              </div>
            </article>

            {/* 9. User Rights */}
            <article
              id="user-rights"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Section 09</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                9. Your Rights under Indian Law
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Under applicable Indian privacy regulations (including principles reflected in the Digital Personal Data Protection Act, 2023), you have the right to:
              </p>
              <ul className="space-y-1.5 text-xs text-[#524D46] list-disc list-inside">
                <li><strong>Access:</strong> Request a summary of personal information we hold concerning you.</li>
                <li><strong>Correction:</strong> Request rectification of outdated, incomplete, or inaccurate contact details.</li>
                <li><strong>Erasure:</strong> Request the deletion of your personal data where retention is no longer required by law.</li>
                <li><strong>Withdraw Consent:</strong> Revoke consent for non-essential communication at any time.</li>
              </ul>
              <p className="text-xs text-[#4A453E] pt-1">
                To exercise any of these rights, email us at <a href="mailto:info@alphaaiservices.in" className="text-[#FF5A1F] font-bold hover:underline">info@alphaaiservices.in</a>. We respond to verified data requests within statutory time limits.
              </p>
            </article>

            {/* 10. Children's Privacy */}
            <article
              id="children-privacy"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Section 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                10. Children&apos;s Privacy
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Our website, enterprise software services, and monthly retainers are directed solely at commercial enterprises, founders, and individuals aged 18 and above. We do not knowingly solicit or collect personal data from minors. If you believe a minor has submitted personal information to us, please notify us immediately at <em>info@alphaaiservices.in</em> for swift deletion.
              </p>
            </article>

            {/* 11. Changes to Policy */}
            <article
              id="policy-changes"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Section 11</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                11. Changes to This Policy
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                We may periodically update this Privacy Policy to reflect operational, architectural, or regulatory advancements. Any modifications will take effect immediately upon posting with an updated &ldquo;Last Updated&rdquo; date at the top of this document. Continued usage of our website or services signifies acceptance of revised terms.
              </p>
            </article>

            {/* 12. Contact Information */}
            <article
              id="contact-info"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-4 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Section 12</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                12. Contact Information & Grievances
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                For questions, clarifications, or privacy-related requests, reach out to our team:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">Official Email</span>
                  <a href="mailto:info@alphaaiservices.in" className="text-[#FF5A1F] font-bold hover:underline">
                    info@alphaaiservices.in
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">Direct WhatsApp</span>
                  <a href="https://wa.me/918381835420" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">
                    Chat on WhatsApp
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1 sm:col-span-2">
                  <span className="font-extrabold text-[#111111] block">Operational Locations</span>
                  <span className="text-[#6B6660]">Office: Prayagraj, Uttar Pradesh, India • Remote/Hybrid Hub: Pune, Maharashtra, India</span>
                </div>
              </div>
            </article>

            {/* Legal Advisory Note Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F5] border border-[#FF5A1F]/30 text-left space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-[#FF5A1F]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Legal Advisory Disclaimer</span>
              </div>
              <p className="text-[11.5px] text-[#7A5A4A] leading-relaxed">
                <strong>Notice:</strong> This Privacy Policy is an informational draft prepared for Alpha AI Services. While structured to reflect best practices and Indian data protection principles (including the Digital Personal Data Protection Act 2023 and Information Technology Act 2000), it should be reviewed by a qualified legal professional before being treated as formal legal advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
