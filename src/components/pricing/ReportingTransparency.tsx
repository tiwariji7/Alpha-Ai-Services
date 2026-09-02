import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, FileText, ListTodo, AlertTriangle, Lightbulb, CalendarClock, Activity } from 'lucide-react';

export const ReportingTransparency: React.FC = () => {
  const reportingItems = [
    { title: 'Task Tracking', desc: 'Real-time visibility into active sprint backlog and developer progress.', icon: <ListTodo className="w-4 h-4 text-[#3B4FD9]" /> },
    { title: 'Monthly Summary', desc: 'Comprehensive recap of engineering output delivered during the billing cycle.', icon: <FileText className="w-4 h-4 text-[#2A3FA8]" /> },
    { title: 'Completed Work', desc: 'Detailed log of resolved tickets, new features, and live production releases.', icon: <CheckCircle2 className="w-4 h-4 text-[#4D6BFF]" /> },
    { title: 'Pending Backlog', desc: 'Transparent queue of upcoming tasks prioritized for next sprint execution.', icon: <CalendarClock className="w-4 h-4 text-[#7B5CE8]" /> },
    { title: 'Technical Issues Log', desc: 'Documented audit of resolved server errors, bugs, and security patches.', icon: <AlertTriangle className="w-4 h-4 text-[#5B4FE0]" /> },
    { title: 'Proactive Recommendations', desc: 'Engineer suggestions on speed, security, UI improvements, and tools.', icon: <Lightbulb className="w-4 h-4 text-[#3B4FD9]" /> },
    { title: 'Next Strategic Priorities', desc: 'Collaborative alignment on key technical milestones for the coming month.', icon: <Activity className="w-4 h-4 text-[#2A3FA8]" /> },
  ];

  return (
    <section className="px-4 sm:px-6 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDEAFB] border border-[#7B5CE8]/30 text-[#5B4FE0] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TRANSPARENT ACCOUNTABILITY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151235] tracking-tight">
          Know What Your Team Is Working On.
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#5B5876]">
          Total visibility into tasks, resolutions, releases, and upcoming sprint priorities every single month.
        </p>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EDEAFB] shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {reportingItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-4 bg-[#F6F5FC] rounded-2xl border border-[#EDEAFB] space-y-2 text-left flex flex-col justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#EDEAFB] border border-[#7B5CE8]/20 flex items-center justify-center shrink-0 shadow-2xs">
                  {item.icon}
                </div>
                <div className="text-xs font-extrabold text-[#151235]">{item.title}</div>
              </div>
              <p className="text-[11px] text-[#5B5876] leading-snug">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
