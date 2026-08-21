export interface PricingPlan {
  id: string;
  name: string;
  label: string;
  price: string;
  period: string;
  popular?: boolean;
  badge?: string;
  target: string;
  description: string;
  includedHeader?: string;
  included: string[];
  smallImprovements?: string[];
  examples?: string[];
  notIncluded: string[];
  scopeConcept?: string;
  ctaText: string;
  note: string;
}

export interface ComparisonRow {
  feature: string;
  starter: string;
  growth: string;
  partner: string;
  highlight?: boolean;
}

export interface ManagedSystemCategory {
  num: string;
  title: string;
  tagline: string;
  items: string[];
  iconName: string;
}

export interface OneTimeProject {
  title: string;
  price: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'DIGITAL STARTER',
    label: 'Essential Digital Care',
    price: '₹9,999',
    period: '/ month',
    target: 'For small businesses that already have a website or digital presence and need reliable ongoing maintenance.',
    description: 'Keep your existing website and digital presence healthy, updated and professionally maintained without hiring a full-time technical team.',
    includedHeader: 'WHAT IS INCLUDED:',
    included: [
      'Existing website management',
      'Content and image updates',
      'Small layout and UI changes',
      'Basic bug fixing',
      'Mobile responsiveness fixes',
      'Domain & DNS assistance',
      'Hosting support',
      'SSL monitoring',
      'Website health checks',
      'Backup assistance',
      'Basic security checks',
      'Basic SEO maintenance',
      'WhatsApp / contact integrations',
      'Analytics monitoring',
      'Basic social media support',
      'Monthly maintenance summary',
      'Email support',
      'Response within 1 business day',
    ],
    smallImprovements: [
      'Add a website section',
      'Update homepage content',
      'Change banners / images',
      'Add contact forms',
      'Fix broken links',
      'Fix responsive issues',
      'Add social media links',
      'Add basic third-party integrations',
    ],
    notIncluded: [
      'Dedicated engineer',
      'Direct developer communication',
      'Full social media management',
      'Mobile app development',
      'New software development',
      'Major website redesign',
      'Large feature development',
      'Advanced AI development',
      'Major cloud architecture work',
      '24/7 emergency support',
    ],
    scopeConcept: 'Designed specifically for maintenance and smaller improvements to an existing digital system.',
    ctaText: 'Start Digital Care →',
    note: 'Best for local businesses and professionals maintaining an active web presence.',
  },
  {
    id: 'growth',
    name: 'BUSINESS GROWTH',
    label: 'Dedicated Engineering Support',
    price: '₹24,999',
    period: '/ month',
    popular: true,
    badge: '★ MOST POPULAR',
    target: 'For growing businesses that already have digital products and need a technical professional to continuously maintain and improve them.',
    description: 'Get a dedicated engineering point of contact for ongoing maintenance, improvements, integrations and technical problem-solving.',
    includedHeader: 'INCLUDES EVERYTHING IN DIGITAL STARTER, PLUS:',
    included: [
      '1 Dedicated Engineer',
      'Direct engineer communication',
      'Priority technical support',
      'Existing website improvements',
      'Feature additions to existing website',
      'Web application maintenance',
      'Existing app maintenance',
      'Bug fixing and troubleshooting',
      'Hosting / server troubleshooting',
      'Deployment support',
      'Performance optimization',
      'API integrations',
      'Third-party integrations',
      'Payment gateway integrations',
      'WhatsApp / API integrations',
      'Analytics & tracking improvements',
      'SEO improvements',
      'Social media management',
      'Monthly technology consultation',
      'Monthly performance report',
      'Priority issue handling',
      'Technical recommendations',
    ],
    examples: [
      'Add new website features & landing pages',
      'Add booking systems & enquiry workflows',
      'Add dashboards & connect CRM',
      'Connect payment gateway & WhatsApp APIs',
      'Improve existing app functionality & fix errors',
      'Fix hosting / deployment issues & speed tuning',
      'Add AI functionality to an existing system',
      'Improve existing automation workflows',
    ],
    notIncluded: [
      'Completely new website from scratch',
      'Completely new mobile application',
      'Completely new SaaS product',
      'Large-scale ERP development',
      'Major software rewrite',
      'Unlimited development work',
      '24/7 unlimited support',
      'Third-party service costs',
      'Advertising budget',
    ],
    scopeConcept: 'Your engineer works within an agreed monthly capacity and prioritized task list. Large projects or work outside the monthly scope are quoted separately.',
    ctaText: 'Choose Business Growth →',
    note: 'Best for businesses that need a reliable technical person without hiring a full-time developer.',
  },
  {
    id: 'partner',
    name: 'TECHNOLOGY PARTNER',
    label: 'Multi-Engineer Technology Support',
    price: '₹49,999',
    period: '/ month',
    badge: 'PREMIUM PARTNERSHIP',
    target: 'For businesses with multiple existing digital systems that need ongoing technical management, development and optimization.',
    description: 'A premium technology partnership for businesses that need a broader engineering capability across websites, applications, cloud, automation and AI.',
    includedHeader: 'INCLUDES EVERYTHING IN BUSINESS GROWTH, PLUS:',
    included: [
      '3-Person Engineering Team',
      'Multi-disciplinary technical support',
      'Direct team communication',
      'Priority technical handling',
      'Existing website management',
      'Advanced website improvements',
      'Existing web application maintenance',
      'Existing mobile app maintenance',
      'Feature development',
      'API architecture & integrations',
      'Advanced third-party integrations',
      'AI integrations',
      'AI chatbot improvements',
      'Automation improvements',
      'Database support',
      'Cloud & deployment support',
      'Hosting / server troubleshooting',
      'Performance optimization',
      'Security hardening assistance',
      'Backup & recovery assistance',
      'Uptime monitoring',
      'Advanced SEO support',
      'Advanced social media management',
      'Analytics & conversion improvements',
      'Monthly technology review',
      'Monthly technology roadmap',
      'Technical documentation',
      'Architecture recommendations',
      'Continuous improvement planning',
    ],
    examples: [
      'Multi-page portal, dashboard & auth improvements',
      'Existing iOS / Android app updates & bug fixes',
      'AI agents, document analysis & prompt optimization',
      'Cloud deployment, DNS, SSL, database & server monitoring',
      'Multi-channel social media management & analytics',
      'Comprehensive monthly technology review & roadmap',
    ],
    notIncluded: [
      'Completely new large-scale product development',
      'Unlimited engineering hours or infinite revisions',
      'Major application rewrites from scratch',
      'Enterprise infrastructure costs & cloud bills',
      'Paid API usage & third-party subscriptions',
      'Paid advertising budget',
      'Large one-time projects outside agreed capacity',
    ],
    scopeConcept: 'Includes a multi-engineer monthly capacity dedicated to your agreed priorities. Large projects outside the monthly capacity are separately scoped and quoted.',
    ctaText: 'Talk to Our Technology Team →',
    note: 'Best for businesses that already rely on multiple digital systems and want one technology partner to manage and improve them.',
  },
];

export const COMPARISON_TABLE_ROWS: ComparisonRow[] = [
  { feature: 'Existing Website Management', starter: '✓ Included', growth: '✓ Included', partner: '✓ Included' },
  { feature: 'Content Updates', starter: '✓ Basic Updates', growth: '✓ Full Updates', partner: '✓ Full Updates' },
  { feature: 'UI Improvements', starter: 'Small changes', growth: '✓ Included', partner: '✓ Advanced UI/UX' },
  { feature: 'Bug Fixing', starter: 'Basic fixes', growth: '✓ Priority fixes', partner: '✓ Immediate handling' },
  { feature: 'Hosting Support', starter: '✓ Basic assistance', growth: '✓ Advanced troubleshooting', partner: '✓ Full infrastructure' },
  { feature: 'DNS & SSL', starter: '✓ Assistance', growth: '✓ Full management', partner: '✓ Full management' },
  { feature: 'Backup Assistance', starter: '✓ Periodic check', growth: '✓ Scheduled backups', partner: '✓ Continuous & recovery' },
  { feature: 'Security Checks', starter: '✓ Basic scan', growth: '✓ Hardening checks', partner: '✓ Proactive monitoring' },
  { feature: 'SEO Maintenance', starter: '✓ Basic check', growth: '✓ Included', partner: '✓ Included' },
  { feature: 'SEO Improvements', starter: '—', growth: '✓ Active tuning', partner: '✓ Advanced optimization' },
  { feature: 'Social Media Support', starter: '✓ Basic support', growth: '—', partner: '—' },
  { feature: 'Social Media Management', starter: '—', growth: '✓ Included', partner: '✓ Advanced Multi-Channel' },
  { feature: 'Dedicated Engineer', starter: '—', growth: '1 Dedicated Engineer', partner: '3-Person Team', highlight: true },
  { feature: 'Direct Engineer Communication', starter: '—', growth: '✓ Direct Access', partner: '✓ Team Squad Access' },
  { feature: 'Web Application Support', starter: '—', growth: '✓ Included', partner: '✓ Comprehensive' },
  { feature: 'Mobile App Support', starter: '—', growth: 'Existing app support', partner: '✓ Full mobile maintenance', highlight: true },
  { feature: 'Feature Additions', starter: 'Minor additions', growth: '✓ Regular additions', partner: '✓ Advanced features' },
  { feature: 'API Integrations', starter: 'Basic', growth: '✓ Full integrations', partner: '✓ Custom API architecture' },
  { feature: 'Payment Integrations', starter: '—', growth: '✓ Included', partner: '✓ Advanced workflows' },
  { feature: 'AI Integrations', starter: '—', growth: 'Existing AI feature additions', partner: '✓ Advanced AI & LLMs', highlight: true },
  { feature: 'Automation', starter: '—', growth: '✓ Workflow updates', partner: '✓ Complex automation' },
  { feature: 'Cloud Support', starter: '—', growth: '✓ Hosting & deployment', partner: '✓ Cloud & Database' },
  { feature: 'Performance Optimization', starter: 'Basic health check', growth: '✓ Speed & database tuning', partner: '✓ Deep system optimization' },
  { feature: 'Uptime Monitoring', starter: 'Health checks', growth: '✓ Included', partner: '✓ 24/7 Monitoring Alerting' },
  { feature: 'Monthly Reporting', starter: 'Maintenance summary', growth: '✓ Performance report', partner: '✓ Full Executive Review' },
  { feature: 'Technology Consultation', starter: '—', growth: '✓ Monthly call', partner: '✓ Regular strategic sync' },
  { feature: 'Technology Roadmap', starter: '—', growth: 'Prioritized task list', partner: '✓ Monthly strategic roadmap' },
  { feature: 'Engineering Team', starter: 'Support Queue', growth: '1 Dedicated Engineer', partner: '3-Person Engineering Team', highlight: true },
];

export const MANAGED_SYSTEMS_CATEGORIES: ManagedSystemCategory[] = [
  {
    num: '01',
    title: 'WEBSITES',
    tagline: 'Marketing & conversion foundations',
    items: ['Existing websites', 'Landing pages', 'CMS platforms', 'E-commerce stores', 'Performance tuning', 'SEO architecture'],
    iconName: 'Globe',
  },
  {
    num: '02',
    title: 'WEB APPLICATIONS',
    tagline: 'Customer & internal digital software',
    items: ['Admin dashboards', 'Customer portals', 'REST & GraphQL APIs', 'User authentication', 'Existing SaaS systems', 'Database hooks'],
    iconName: 'LayoutGrid',
  },
  {
    num: '03',
    title: 'MOBILE APPS',
    tagline: 'Existing iOS & Android ecosystems',
    items: ['Android applications', 'iOS applications', 'Cross-platform apps (Flutter/React Native)', 'API integrations', 'Bug fixing & UI tweaks', 'Store deployment support'],
    iconName: 'Smartphone',
  },
  {
    num: '04',
    title: 'AI & AUTOMATION',
    tagline: 'Intelligent workflows & LLM features',
    items: ['AI API integrations', 'Customer support chatbots', 'Document processing (RAG)', 'Workflow automation', 'Existing AI systems tuning', 'Prompt engineering'],
    iconName: 'Cpu',
  },
  {
    num: '05',
    title: 'CLOUD & INFRASTRUCTURE',
    tagline: 'Reliability, hosting & uptime',
    items: ['Hosting configuration', 'Deployment pipelines', 'DNS & domain records', 'SSL certificates', 'Scheduled backups', 'Uptime monitoring'],
    iconName: 'Server',
  },
  {
    num: '06',
    title: 'DIGITAL GROWTH',
    tagline: 'Visibility & organic engagement',
    items: ['SEO enhancements', 'Analytics & telemetry', 'Social media management', 'Conversion rate optimization', 'Content updates', 'A/B landing experiments'],
    iconName: 'TrendingUp',
  },
];

export const REQUEST_EXAMPLES: string[] = [
  'Add a new section to my website',
  'Fix my mobile layout',
  'Add WhatsApp integration',
  'Connect my payment gateway',
  'Fix my hosting problem',
  'Add a booking form',
  'Improve website speed',
  'Add analytics tracking',
  'Connect my CRM',
  'Add an AI chatbot',
  'Fix my existing mobile app',
  'Add a feature to my existing software',
  'Improve my social media presence',
  'Fix a deployment issue',
  'Improve SEO ranking factors',
  'Automate a repetitive workflow',
];

export const ONE_TIME_PROJECTS: OneTimeProject[] = [
  {
    title: 'Business Website',
    price: 'Starting from ₹14,999',
    description: 'Custom, modern, high-converting marketing website engineered for speed, SEO, and credibility.',
    deliverables: ['Custom responsive design', 'SEO optimization & meta setup', 'Fast loading & mobile ready', 'CMS / easy content updates'],
  },
  {
    title: 'E-Commerce Website',
    price: 'Starting from ₹29,999',
    description: 'Full-featured online store with payment gateway, product catalogs, inventory, and order tracking.',
    deliverables: ['Payment gateway integration', 'Catalog & inventory sync', 'Cart & secure checkout', 'Customer notification flows'],
  },
  {
    title: 'Mobile Application',
    price: 'Starting from ₹39,999',
    description: 'Native or cross-platform iOS & Android mobile application built for fluid user experience.',
    deliverables: ['iOS & Android deployment', 'Push notifications system', 'Offline data & caching', 'App store submission setup'],
  },
  {
    title: 'Web Application',
    price: 'Starting from ₹24,999',
    description: 'Interactive web platform with dynamic database, user authentication, and tailored business workflows.',
    deliverables: ['Secure user auth & profiles', 'Custom database architecture', 'Dashboard & admin views', 'Robust API integrations'],
  },
  {
    title: 'AI Solution',
    price: 'Starting from ₹19,999',
    description: 'Custom AI agents, LLM integrations, document retrieval (RAG), and intelligent workflow automation.',
    deliverables: ['Custom LLM / OpenAI hookup', 'Domain-specific knowledge bot', 'Automated workflow triggers', 'Response telemetry & logs'],
  },
  {
    title: 'Custom Software',
    price: 'Custom Quote',
    description: 'Tailored enterprise software, ERP, portal, or bespoke backend systems built for your exact operations.',
    deliverables: ['Bespoke systems architecture', 'Complex multi-role permissions', 'Legacy software migration', 'Dedicated SLA & warranty'],
  },
];

export const PRICING_FAQS: FAQItem[] = [
  {
    question: '1. What exactly do I get with a monthly plan?',
    answer: 'You get ongoing engineering capacity, technical support, proactive maintenance, bug fixing, and continuous improvements for your existing digital systems (websites, web applications, mobile apps, hosting, AI, and social media) under one predictable monthly partnership.',
  },
  {
    question: '2. Can you manage a website built by another developer?',
    answer: 'Yes. We begin with a thorough technical audit of your existing codebase, hosting, and architecture to understand the system and ensure it is maintainable before commencing ongoing sprint tasks.',
  },
  {
    question: '3. Can I request new features?',
    answer: 'Yes! You can request feature additions, layout modifications, API integrations, and workflow enhancements to your existing digital systems within the agreed monthly engineering capacity.',
  },
  {
    question: '4. Can you fix hosting problems?',
    answer: 'Yes. We troubleshoot server errors, deployment failures, DNS records, SSL certificates, and hosting issues wherever provider access and technical scope allow.',
  },
  {
    question: '5. Can you manage social media?',
    answer: 'Yes. Digital Starter includes foundational social support, Business Growth includes organic social media management across agreed platforms, and Technology Partner provides advanced multi-channel management. (Paid ad spend is separate).',
  },
  {
    question: '6. Can you build a completely new website under the monthly plan?',
    answer: 'No. Monthly retainers are dedicated to maintaining and improving existing systems. Completely new, greenfield websites or major redesigns are scoped and delivered as separate fixed-scope projects.',
  },
  {
    question: '7. Can you build a new mobile app under the monthly plan?',
    answer: 'New mobile applications from scratch are scoped and built as standalone projects. However, ongoing maintenance, feature additions, bug fixing, and updates for your existing mobile app are supported under our higher monthly plans.',
  },
  {
    question: '8. Is hosting included?',
    answer: 'Technical hosting management, setup, deployment assistance, and monitoring are included. The underlying cloud/server subscription bills (e.g. AWS, GCP, Vercel, Hostinger) are paid directly to your provider to preserve full account ownership.',
  },
  {
    question: '9. Are API costs included?',
    answer: 'No. Third-party software tools and paid API usage charges (such as OpenAI token credits, Twilio SMS, payment gateway transaction fees) are billed directly to your business account.',
  },
  {
    question: '10. Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade your plan at any point during your partnership as your engineering demands and technical scope grow. Upgrades take effect immediately with pro-rated billing.',
  },
  {
    question: '11. Can I downgrade later?',
    answer: 'Yes. You can adjust or downgrade your plan at the end of any monthly billing cycle with simple advance notice. There are no lock-in penalties.',
  },
  {
    question: '12. What happens when I need a large project?',
    answer: 'When you require major new software, a complete product rewrite, or an enterprise module exceeding your monthly retainer capacity, we create a transparent, separately scoped and quoted project roadmap.',
  },
  {
    question: '13. Is support 24/7?',
    answer: 'Support is provided during standard business hours (Monday through Friday, 9:00 AM – 6:30 PM IST), with Digital Starter turnaround within 1 business day and Business Growth / Tech Partner receiving prioritized response channels. Critical automated server monitoring operates continuously.',
  },
];

