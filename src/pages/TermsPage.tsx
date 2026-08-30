import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  FileCheck2,
  Shield,
  Layers,
  Clock,
  CreditCard,
  RefreshCw,
  Award,
  Sliders,
  AlertTriangle,
  XCircle,
  Cpu,
  Scale,
  Bell,
  Mail,
  ArrowRight,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { pageTransition, fadeUp } from '../utils/motion';

interface TermsPageProps {
  onNavigate?: (path: string) => void;
  onOpenScheduleModal?: (topic?: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onNavigate,
  onOpenScheduleModal,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sections = [
    { id: 'acceptance', title: '1. Introduction & Acceptance', icon: FileCheck2 },
    { id: 'services-description', title: '2. Description of Services', icon: Layers },
    { id: 'engagement-process', title: '3. Engagement Process', icon: Clock },
    { id: 'client-responsibilities', title: '4. Client Responsibilities', icon: Shield },
    { id: 'payment-terms', title: '5. Payment Terms & Invoicing', icon: CreditCard },
    { id: 'retainer-services', title: '6. Ongoing Retainers & Support', icon: RefreshCw },
    { id: 'intellectual-property', title: '7. Intellectual Property & Code Ownership', icon: Award },
    { id: 'revisions-scope', title: '8. Revisions & Scope Management', icon: Sliders },
    { id: 'limitation-liability', title: '9. Limitation of Liability', icon: AlertTriangle },
    { id: 'termination', title: '10. Termination & Cancellation', icon: XCircle },
    { id: 'third-party-tools', title: '11. Third-Party Platforms & Cloud Services', icon: Cpu },
    { id: 'governing-law', title: '12. Governing Law & Jurisdiction', icon: Scale },
    { id: 'changes-to-terms', title: '13. Changes to These Terms', icon: Bell },
    { id: 'contact-info', title: '14. Contact Information', icon: Mail },
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
            <Scale className="w-3.5 h-3.5" />
            <span>COMMERCIAL AGREEMENT</span>
          </motion.div>

          <motion.h1
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight"
          >
            Terms &amp; <span className="text-[#FF5A1F]">Conditions</span>
          </motion.h1>

          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-[#6B6660] max-w-2xl mx-auto leading-relaxed"
          >
            Clear, transparent terms governing your use of our digital platforms and professional software engineering engagements with Alpha AI Services.
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

      {/* 2. MAIN CONTENT + STICKY SIDEBAR */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-[#EDE9E4] shadow-soft space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111]">
                Table of Contents
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
                <span className="text-xs font-extrabold uppercase tracking-wider">Commercial Queries</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Need a customized Statement of Work (SOW) or custom enterprise MSA?
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

          {/* Main Legal Content */}
          <div className="lg:col-span-8 space-y-8 text-[#262626]">
            {/* 1. Acceptance */}
            <article
              id="acceptance"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4" />
                <span>Section 01</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                1. Introduction &amp; Acceptance of Terms
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Welcome to <strong>Alpha AI Services</strong> (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of our website (<strong>https://alphaaiservices.in</strong>), along with any proposals, consultation workflows, software development sprints, and ongoing digital management retainers delivered by our team.
              </p>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                By accessing this website, submitting inquiry forms, scheduling a technical consultation, or engaging our engineering team, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and our companion Privacy Policy.
              </p>
            </article>

            {/* 2. Description of Services */}
            <article
              id="services-description"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-4 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Section 02</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                2. Description of Services
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Alpha AI Services is a professional technology engineering studio delivering the following core service practices:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">Custom Web Development</span>
                  <span className="text-[#6B6660]">High-performance React/TypeScript web apps, SaaS platforms, portals, and responsive websites.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">Mobile App Engineering</span>
                  <span className="text-[#6B6660]">Native and cross-platform mobile apps for iOS and Android with offline sync and cloud APIs.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">AI &amp; Automation Systems</span>
                  <span className="text-[#6B6660]">Enterprise RAG pipelines, fine-tuned LLMs, predictive models, and autonomous workflow bots.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">Social Media &amp; Growth Retainers</span>
                  <span className="text-[#6B6660]">Creative asset production, brand presence, website management, and ongoing monthly retainer support.</span>
                </div>
              </div>
            </article>

            {/* 3. Engagement Process */}
            <article
              id="engagement-process"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Section 03</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                3. Engagement Process &amp; Project Lifecycle
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Unless modified in an explicit master services agreement, our standard client collaboration proceeds as follows:
              </p>
              <ol className="space-y-2 text-xs sm:text-sm text-[#4A453E] list-decimal list-inside leading-relaxed">
                <li><strong>Discovery &amp; Consultation:</strong> Initial technical review of project goals, technical feasibility, timeline expectations, and budget parameters.</li>
                <li><strong>Proposal &amp; Quote:</strong> Delivery of an itemized Statement of Work (SOW) or monthly retainer agreement detailing scope, sprint milestones, and pricing.</li>
                <li><strong>Agreement &amp; Kickoff:</strong> Execution of terms/SOW and upfront milestone deposit (typically within 3–7 business days).</li>
                <li><strong>Sprint Execution &amp; Demos:</strong> Agile bi-weekly milestone demonstrations, code commits, and continuous progress reporting.</li>
                <li><strong>Delivery &amp; Handover:</strong> Production deployment, knowledge transfer, code repository handover, and post-launch hypercare warranty.</li>
              </ol>
            </article>

            {/* 4. Client Responsibilities */}
            <article
              id="client-responsibilities"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Section 04</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                4. Client Responsibilities
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                High-quality software delivery requires collaborative transparency. The Client agrees to:
              </p>
              <ul className="space-y-1.5 text-xs text-[#524D46] list-disc list-inside">
                <li>Provide accurate, complete business specifications, branding assets, and copy in a timely manner.</li>
                <li>Furnish necessary developer access to third-party services, APIs, domain DNS, and cloud host environments.</li>
                <li>Participate in milestone review calls and provide prompt written feedback on sprint deliverables (usually within 3–5 business days).</li>
                <li>Ensure that all content, logos, and materials provided do not infringe on third-party intellectual property rights.</li>
              </ul>
            </article>

            {/* 5. Payment Terms */}
            <article
              id="payment-terms"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Section 05</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                5. Payment Terms &amp; Invoicing
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                We do not process direct public retail checkouts on our website. All commercial pricing, milestones, and invoice schedules are formalized in mutual contracts:
              </p>
              <div className="space-y-2 text-xs text-[#524D46]">
                <p>• <strong>Fixed-Scope Projects:</strong> Billed across structured sprint milestones (e.g., initial deposit upon signing, intermediate milestone upon core feature review, and final balance prior to final source code handover and production deployment).</p>
                <p>• <strong>Invoicing Currency &amp; Taxes:</strong> Invoices are issued in Indian Rupees (INR) or US Dollars (USD) as agreed, exclusive of applicable statutory GST or international withholding taxes.</p>
                <p>• <strong>Payment Timelines:</strong> Invoices are payable within the net terms specified on the commercial invoice (typically Net-7 to Net-15 days).</p>
              </div>
            </article>

            {/* 6. Ongoing / Retainer Services */}
            <article
              id="retainer-services"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <RefreshCw className="w-4 h-4" />
                <span>Section 06</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                6. Ongoing Retainer &amp; Digital Growth Services
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                We offer continuing monthly technology retainers (website management, security patching, feature improvements, and social media creative execution):
              </p>
              <ul className="space-y-2 text-xs text-[#524D46] list-disc list-inside">
                <li><strong>Monthly Retainer Scope:</strong> Monthly allocations cover agreed engineering and design capacity. Hours and tasks reset on the first day of each billing cycle and do not roll over unless explicitly stipulated in writing.</li>
                <li><strong>Cancellation &amp; Notice Period:</strong> Retainer partnerships can be discontinued by either party by providing at least 15 to 30 days prior written notice before the subsequent monthly billing cycle commences.</li>
              </ul>
            </article>

            {/* 7. Intellectual Property */}
            <article
              id="intellectual-property"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Section 07</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                7. Intellectual Property &amp; Source Code Ownership
              </h2>
              <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-2 text-xs text-[#4A453E]">
                <p><strong>100% Client Code Ownership:</strong> Upon receipt of full and final payment for the project or milestone, all bespoke source code, application assets, designs, databases schemas, and documentation created specifically for the Client transfer fully and unconditionally to the Client.</p>
                <p><strong>Pre-Existing Frameworks &amp; Open Source:</strong> Open-source libraries (e.g. React, Tailwind CSS, Linux) and generic developer utility scaffolds remain subject to their respective open-source licenses (MIT, Apache 2.0).</p>
                <p><strong>Portfolio Showcase Rights:</strong> We reserve the customary right to showcase completed project designs, non-confidential screenshots, and case summaries in our professional portfolio and website, unless the Client has executed a strict NDA requesting complete anonymity.</p>
              </div>
            </article>

            {/* 8. Revisions & Scope */}
            <article
              id="revisions-scope"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Section 08</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                8. Revisions &amp; Scope Management
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Every project includes reasonable iterative review rounds during development sprints to ensure deliverables match approved technical specifications. Requests for substantial functional changes or new features outside the initial SOW will be documented as a change request and quoted transparently before work begins.
              </p>
            </article>

            {/* 9. Limitation of Liability */}
            <article
              id="limitation-liability"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Section 09</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                9. Limitation of Liability
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                To the maximum extent permitted under applicable Indian law:
              </p>
              <ul className="space-y-1.5 text-xs text-[#524D46] list-disc list-inside">
                <li>Alpha AI Services shall not be liable for any indirect, consequential, incidental, punitive, or special damages, including lost profits or business disruption.</li>
                <li>We are not liable for outages, API deprecations, rate limits, or billing changes caused by third-party hosting, infrastructure, or SaaS providers (e.g. AWS, Cloudflare, OpenAI, Google).</li>
                <li>In all circumstances, our cumulative total financial liability arising from any engagement shall not exceed the total fees paid by the Client to Alpha AI Services under the specific invoice or SOW in dispute.</li>
              </ul>
            </article>

            {/* 10. Termination */}
            <article
              id="termination"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>Section 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                10. Termination
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Either party may terminate an ongoing engagement upon written notice under the following circumstances:
              </p>
              <ul className="space-y-1.5 text-xs text-[#524D46] list-disc list-inside">
                <li><strong>Material Breach:</strong> If the other party fails to remedy a material breach within 14 days of receiving written notice.</li>
                <li><strong>Convenience:</strong> Under standard retainer terms by honoring the agreed 15–30 day notice window.</li>
                <li><strong>Post-Termination Payment:</strong> Upon termination, the Client remains responsible for payment covering all documented work completed and milestones delivered up to the effective termination date.</li>
              </ul>
            </article>

            {/* 11. Third-Party Platforms */}
            <article
              id="third-party-tools"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Section 11</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                11. Third-Party Tools &amp; Cloud Platforms
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                As part of modern software engineering, we integrate third-party APIs, vector databases, domain registrars, and cloud providers. The Client acknowledges that these independent vendors govern their own services, uptime guarantees, and privacy policies. Third-party vendor subscription or API consumption fees are paid directly by the Client unless bundled in a custom retainer.
              </p>
            </article>

            {/* 12. Governing Law */}
            <article
              id="governing-law"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>Section 12</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                12. Governing Law &amp; Dispute Resolution
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                These Terms, along with any project SOWs and agreements, shall be governed by, construed, and enforced in accordance with the <strong>laws of the Republic of India</strong>, without regard to its conflict of law principles.
              </p>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Any legal disputes, controversies, or claims arising out of or in connection with our services shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Prayagraj, Uttar Pradesh, India</strong> (or Pune, Maharashtra as designated in an individualized commercial agreement).
              </p>
            </article>

            {/* 13. Changes to Terms */}
            <article
              id="changes-to-terms"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-3 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Bell className="w-4 h-4" />
                <span>Section 13</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                13. Changes to These Terms
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                We reserve the right to revise or update these Terms at our discretion. Any revisions will be published on this page with an updated &ldquo;Last Updated&rdquo; timestamp. Continued engagement with our digital services constitutes acceptance of the modified Terms.
              </p>
            </article>

            {/* 14. Contact Information */}
            <article
              id="contact-info"
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDE9E4] shadow-soft space-y-4 text-left"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF5A1F] uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Section 14</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111]">
                14. Contact Information &amp; Legal Notices
              </h2>
              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                If you have questions regarding these Terms or wish to discuss custom enterprise contractual clauses, please reach out to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">Legal &amp; Business Inquiries</span>
                  <a href="mailto:info@alphaaiservices.in" className="text-[#FF5A1F] font-bold hover:underline">
                    info@alphaaiservices.in
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F6] border border-[#EDE9E4] space-y-1">
                  <span className="font-extrabold text-[#111111] block">WhatsApp Channel</span>
                  <a href="https://wa.me/918381835420" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold hover:underline">
                    Chat on WhatsApp
                  </a>
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
                <strong>Notice:</strong> These Terms &amp; Conditions represent an informational operational draft prepared for Alpha AI Services. While tailored to reflect professional software agency best practices and Indian legal principles, this document should be reviewed and customized by a qualified lawyer prior to being treated as formal, binding commercial terms for high-value enterprise contracts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
