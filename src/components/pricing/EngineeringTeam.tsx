import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Database, Bot, Users, Check } from 'lucide-react';

export const EngineeringTeam: React.FC = () => {
  const roles = [
    {
      role: 'ENGINEER 01',
      title: 'Web / Frontend Engineering',
      desc: 'Focused on UI/UX responsiveness, interactive landing pages, web application frontends, and conversion improvements.',
      icon: <Code2 className="w-5 h-5 text-[#3B4FD9]" />,
      skills: ['Modern React / Next.js', 'Responsive UI & Mobile Web', 'Design Systems & Tailwind', 'Speed & Web Vitals Tuning'],
    },
    {
      role: 'ENGINEER 02',
      title: 'Backend / APIs / Integrations',
      desc: 'Handles database architecture, secure user authentication, CRM hooks, payment gateways, and custom API connections.',
      icon: <Database className="w-5 h-5 text-[#2A3FA8]" />,
      skills: ['REST & GraphQL APIs', 'Database (Postgres, MongoDB)', 'Stripe / Razorpay Workflows', 'Cloud Deployments & CI/CD'],
    },
    {
      role: 'ENGINEER 03',
      title: 'AI / Automation / Support',
      desc: 'Integrates custom LLMs, document analysis (RAG), automated workflow triggers, and priority technical troubleshooting.',
      icon: <Bot className="w-5 h-5 text-[#5B4FE0]" />,
      skills: ['OpenAI / Claude Integrations', 'AI Support Chatbots', 'Workflow Automation (Zapier/n8n)', 'Proactive Uptime & Bug Fixing'],
    },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#EDEAFB] shadow-soft text-left space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>TECHNOLOGY PARTNER COVERAGE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight">
            When One Engineer Isn't Enough.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#5B5876] leading-relaxed">
            The Technology Partner plan gives your business access to a broader engineering capability for businesses managing multiple digital systems or higher technical demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {roles.map((r, idx) => (
            <motion.div
              key={r.role}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#F6F5FC] p-6 rounded-2xl border border-[#EDEAFB] hover:border-[#3B4FD9]/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {r.icon}
                  </div>
                  <span className="text-[10px] font-extrabold text-[#3B4FD9] uppercase tracking-wider">
                    {r.role}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#151235] group-hover:text-[#3B4FD9] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-[#5B5876] leading-relaxed pt-1">
                    {r.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EDEAFB] space-y-2">
                <div className="text-[11px] font-bold text-[#5B5876] uppercase tracking-wider">
                  Core Coverage Areas:
                </div>
                <ul className="space-y-1 text-xs text-[#151235]">
                  {r.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#3B4FD9] shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-[11px] text-[#5B5876] italic text-center">
          * Engineering coverage spans multidisciplinary areas based on your agreed sprint priorities and business needs.
        </p>
      </div>
    </section>
  );
};
