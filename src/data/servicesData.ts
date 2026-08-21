export interface ServiceCapability {
  title: string;
  desc: string;
}

export interface ServiceBuildExample {
  title: string;
  desc: string;
}

export interface ServiceItem {
  number: string;
  id: string;
  slug: string;
  title: string;
  category: 'ai-software' | 'web-mobile' | 'automation' | 'cloud-security' | 'design-marketing';
  iconName: string;
  shortDescription: string;
  tags: string[];
  heroHeading: string;
  heroSupporting: string;
  whatWeDo: string;
  capabilities: ServiceCapability[];
  buildExamples: ServiceBuildExample[];
  technologies: string[];
  idealFor: string[];
  relatedServices: string[];
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    number: '01',
    id: 'ai-intelligent-systems',
    slug: 'ai-intelligent-systems',
    title: 'AI & Intelligent Systems',
    category: 'ai-software',
    iconName: 'Bot',
    shortDescription: 'Practical AI systems that automate work, assist teams and turn business data into useful intelligence.',
    tags: ['AI Agents', 'RAG Systems', 'AI Automation'],
    heroHeading: 'Practical AI Built for Real Business Workflows',
    heroSupporting: 'We build intelligent systems that help businesses automate repetitive work, find information faster and give teams intelligent assistance.',
    whatWeDo: 'We build AI systems that solve real operational bottlenecks. From context-aware internal knowledge assistants and automated document processing to multi-step agent workflows, we focus on AI solutions that deliver measurable value from day one.',
    capabilities: [
      {
        title: 'AI Agents & Assistants',
        desc: 'Autonomous and guided AI agents designed to handle customer inquiries, perform research, and execute routine internal workflows.',
      },
      {
        title: 'RAG & Knowledge Systems',
        desc: 'Retrieval-Augmented Generation that connects LLMs to your company documents, databases, and wikis with strict factual accuracy.',
      },
      {
        title: 'Document & Data Intelligence',
        desc: 'Automated extraction, classification, and summarization of unstructured contracts, PDFs, invoices, and reports.',
      },
      {
        title: 'Custom AI Integrations',
        desc: 'Seamless integration of proprietary AI models and leading APIs (OpenAI, Gemini, Claude) directly into your existing software stack.',
      },
    ],
    buildExamples: [
      {
        title: 'Internal Knowledge Assistant',
        desc: 'Instant, secure answers from company documentation, standard operating procedures, and product manuals.',
      },
      {
        title: 'AI Customer Support System',
        desc: 'Intelligent triage and ticket resolution bot with human escalation paths.',
      },
      {
        title: 'Document Analysis Pipeline',
        desc: 'Instant extraction of key terms, tables, and financial figures from uploaded PDF files.',
      },
      {
        title: 'AI Workflow Copilot',
        desc: 'Context-aware assistant that drafts emails, summarizes meetings, and prepares client reports.',
      },
    ],
    technologies: ['Python', 'FastAPI', 'OpenAI', 'Gemini', 'LangChain', 'PostgreSQL', 'pgvector'],
    idealFor: ['Startups building AI-first products', 'SMEs wanting to automate manual processes', 'Growing teams dealing with large document volumes'],
    relatedServices: ['custom-software', 'business-automation', 'cloud-devops'],
  },
  {
    number: '02',
    id: 'custom-software',
    slug: 'custom-software',
    title: 'Custom Software Development',
    category: 'ai-software',
    iconName: 'Code2',
    shortDescription: 'Purpose-built software designed around your workflows, users and business requirements.',
    tags: ['Business Software', 'SaaS Platforms', 'Backend Systems'],
    heroHeading: 'Software Engineered Around How Your Business Operates',
    heroSupporting: 'Off-the-shelf software often forces you to change your processes. We build custom applications that fit your exact workflow and scale with your growth.',
    whatWeDo: 'We engineer custom business software, SaaS applications, and robust backend architectures. By focusing on clean code, modular architecture, and intuitive interfaces, we deliver software that your team and customers will actually enjoy using.',
    capabilities: [
      {
        title: 'Custom Web & Desktop Software',
        desc: 'Tailored business management software, operational portals, and customer-facing web platforms.',
      },
      {
        title: 'SaaS Product Engineering',
        desc: 'End-to-end multi-tenant SaaS architecture with user authentication, billing, roles, and automated onboarding.',
      },
      {
        title: 'API & Backend Architecture',
        desc: 'Clean REST and GraphQL APIs, relational database schemas, and background job queues built for reliability.',
      },
      {
        title: 'Internal Tools & Portals',
        desc: 'Specialized internal admin dashboards and operational tools that replace chaotic spreadsheets.',
      },
    ],
    buildExamples: [
      {
        title: 'Custom ERP / Operations Dashboard',
        desc: 'Centralized operational hub tracking inventory, orders, customer history, and team tasks in real time.',
      },
      {
        title: 'Multi-Tenant SaaS Application',
        desc: 'Subscription-based B2B software with automated billing, team permissions, and usage analytics.',
      },
      {
        title: 'Client Portal & Document Hub',
        desc: 'Secure portal where clients can view project progress, sign documents, and pay invoices.',
      },
      {
        title: 'Custom Booking & Management Engine',
        desc: 'Automated scheduling, resource allocation, and notifications for service-based businesses.',
      },
    ],
    technologies: ['TypeScript', 'Node.js', 'Python', 'React', 'Next.js', 'PostgreSQL', 'Redis'],
    idealFor: ['Businesses outgrowing spreadsheets', 'Founders launching new software products', 'Companies needing custom operational tools'],
    relatedServices: ['web-development', 'ui-ux-design', 'cloud-devops'],
  },
  {
    number: '03',
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    category: 'web-mobile',
    iconName: 'Globe',
    shortDescription: 'Modern, responsive websites and web applications designed for performance, usability and growth.',
    tags: ['Business Websites', 'Web Apps', 'SaaS'],
    heroHeading: 'Modern Web Experiences That Engage & Convert',
    heroSupporting: 'We build responsive, fast-loading websites and web applications with clean design, intuitive navigation, and high technical quality.',
    whatWeDo: 'Your website is the digital front door of your company. We build modern, accessible web products using modern frameworks like React and Next.js, ensuring your site looks great on every screen, loads fast, and clearly communicates your value.',
    capabilities: [
      {
        title: 'High-Converting Business Websites',
        desc: 'Clean, professional company websites that establish credibility and turn visitors into qualified leads.',
      },
      {
        title: 'Interactive Web Applications',
        desc: 'Feature-rich web portals, customer dashboards, and interactive digital tools built with modern React frameworks.',
      },
      {
        title: 'CMS & Content Platforms',
        desc: 'Custom headless CMS setups that allow your marketing team to edit and publish content effortlessly without touching code.',
      },
      {
        title: 'Performance & SEO Optimization',
        desc: 'Fast page load speeds, clean semantic HTML, mobile responsiveness, and best-practice search engine optimization.',
      },
    ],
    buildExamples: [
      {
        title: 'Corporate Brand & Service Website',
        desc: 'Modern, beautifully animated studio website with clear value propositions and lead generation forms.',
      },
      {
        title: 'Interactive Customer Dashboard',
        desc: 'Responsive web portal for account management, usage tracking, and data visualization.',
      },
      {
        title: 'Product Landing Pages',
        desc: 'Focused conversion pages built for marketing campaigns and product launches.',
      },
      {
        title: 'Headless Blog & Resource Center',
        desc: 'Blazing-fast content hub with categories, search, and seamless content management.',
      },
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'Node.js'],
    idealFor: ['Companies needing a modern website redesign', 'Startups launching new digital products', 'Businesses wanting faster page speed and higher conversion'],
    relatedServices: ['ui-ux-design', 'website-maintenance', 'custom-software'],
  },
  {
    number: '04',
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'web-mobile',
    iconName: 'Smartphone',
    shortDescription: 'User-focused Android, iOS and cross-platform applications built for real-world use.',
    tags: ['Android', 'iOS', 'Cross-Platform'],
    heroHeading: 'Intuitive Mobile Apps Built for Performance & Growth',
    heroSupporting: 'We design and develop native and cross-platform mobile apps that provide smooth user experiences, reliable offline capability, and seamless backend sync.',
    whatWeDo: 'From concept and UX wireframing to App Store release, we build mobile applications that users find easy and dependable to use. Whether you need a native Android/iOS application or a unified React Native codebase, we build for long-term maintainability.',
    capabilities: [
      {
        title: 'Cross-Platform Mobile Apps',
        desc: 'Single, clean codebase powering both iOS and Android with native performance using React Native or Flutter.',
      },
      {
        title: 'Native Android & iOS Engineering',
        desc: 'Purpose-built native applications in Kotlin/Swift for hardware-intensive features and optimal OS integration.',
      },
      {
        title: 'Offline-First Architecture',
        desc: 'Local database caching and background synchronization so users can work even with poor connectivity.',
      },
      {
        title: 'App Store Submission & Lifecycle',
        desc: 'Complete handling of Apple App Store and Google Play Store submission, compliance guidelines, and ongoing updates.',
      },
    ],
    buildExamples: [
      {
        title: 'On-Demand Service & Delivery App',
        desc: 'Real-time GPS tracking, automated push notifications, in-app messaging, and payment integration.',
      },
      {
        title: 'Healthcare & Health-Tracking App',
        desc: 'Secure user health records, appointment scheduling, and AI-assisted guidance.',
      },
      {
        title: 'Field Operations & Workforce App',
        desc: 'Mobile companion app for field technicians with camera inspection and offline checklists.',
      },
      {
        title: 'Customer Loyalty & Ordering App',
        desc: 'Digital loyalty cards, menu ordering, and personalized promotional notifications.',
      },
    ],
    technologies: ['React Native', 'Kotlin', 'Jetpack Compose', 'TypeScript', 'Firebase', 'REST APIs'],
    idealFor: ['Businesses wanting to reach mobile customers', 'Services requiring on-the-go employee access', 'Founders launching mobile-first digital products'],
    relatedServices: ['web-development', 'ui-ux-design', 'custom-software'],
  },
  {
    number: '05',
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    category: 'design-marketing',
    iconName: 'Palette',
    shortDescription: 'Clear and intuitive product experiences that make complex technology simple to use.',
    tags: ['UX Research', 'UI Design', 'Prototyping'],
    heroHeading: 'User-Centered Design That Simplifies Complex Workflows',
    heroSupporting: 'Great design is not just how something looks — it is how easily your users can achieve their goals without friction or confusion.',
    whatWeDo: 'We design intuitive web, mobile, and software interfaces. Through user research, wireframing, clickable prototyping, and comprehensive design systems, we bridge the gap between business objectives and user satisfaction.',
    capabilities: [
      {
        title: 'Product UX Architecture & Wireframing',
        desc: 'User journey mapping, information architecture, and low-fidelity wireframes that clarify functionality early.',
      },
      {
        title: 'High-Fidelity UI Design',
        desc: 'Pixel-perfect, modern visual design for web and mobile applications with consistent spacing and typography.',
      },
      {
        title: 'Interactive Clickable Prototypes',
        desc: 'Realistic prototypes in Figma that allow stakeholders and prospective users to test the experience before coding.',
      },
      {
        title: 'Scalable Design Systems',
        desc: 'Reusable component libraries, color palettes, and typographic tokens that speed up engineering.',
      },
    ],
    buildExamples: [
      {
        title: 'SaaS Web Application UI Redesign',
        desc: 'Transforming complex data tables and multi-step forms into clean, modern, intuitive screens.',
      },
      {
        title: 'Mobile App Wireframes & Prototypes',
        desc: 'Complete touch-friendly mobile flow from onboarding to checkout and account settings.',
      },
      {
        title: 'Component Design System in Figma',
        desc: 'Comprehensive design library with buttons, inputs, modals, and responsive layout guidelines.',
      },
      {
        title: 'User Onboarding Flow Optimization',
        desc: 'Streamlined sign-up and onboarding steps designed to reduce user drop-off.',
      },
    ],
    technologies: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Design Tokens'],
    idealFor: ['Products needing a visual and usability overhaul', 'Startups turning an idea into tangible screens', 'Complex internal tools that need simplification'],
    relatedServices: ['web-development', 'mobile-app-development', 'brand-design'],
  },
  {
    number: '06',
    id: 'business-automation',
    slug: 'business-automation',
    title: 'Business Automation',
    category: 'automation',
    iconName: 'Workflow',
    shortDescription: 'Connect tools, reduce repetitive work and automate everyday business processes.',
    tags: ['Workflow Automation', 'API Integration', 'AI Automation'],
    heroHeading: 'Automate Everyday Tasks & Connect Your Business Tools',
    heroSupporting: 'Save hundreds of hours of manual copy-pasting by connecting your software tools into seamless, automated pipelines.',
    whatWeDo: 'We design custom workflow automation systems that connect your CRM, accounting software, communication channels, and databases. We eliminate human data entry errors and help your team focus on high-value work.',
    capabilities: [
      {
        title: 'Tool & App Integration Hubs',
        desc: 'Seamless bidirectional data synchronization between CRMs, email, payment systems, and internal spreadsheets.',
      },
      {
        title: 'Automated Document & Invoice Processing',
        desc: 'Automated extraction of details from incoming receipts, invoices, and contracts directly into your databases.',
      },
      {
        title: 'Customer Onboarding & Lead Routing',
        desc: 'Instant lead alerts in Slack/Teams, automated welcome email sequences, and CRM record creation upon sign-up.',
      },
      {
        title: 'Scheduled Data Sync & Reporting',
        desc: 'Nightly backups, metric aggregation, and automated weekly performance summaries sent to management.',
      },
    ],
    buildExamples: [
      {
        title: 'Lead Capture & CRM Automation',
        desc: 'Instant lead qualification, Slack notification, CRM update, and calendar link dispatch.',
      },
      {
        title: 'Invoice Extraction & Accounting Sync',
        desc: 'Auto-processing incoming email PDF invoices and recording expenses directly in QuickBooks/Xero.',
      },
      {
        title: 'Client Onboarding Pipeline',
        desc: 'Automatic folder creation in Google Drive, contract generation, and welcome email delivery.',
      },
      {
        title: 'Cross-Platform Inventory Sync',
        desc: 'Real-time inventory level synchronization across e-commerce channels and warehouse databases.',
      },
    ],
    technologies: ['Python', 'Node.js', 'REST APIs', 'Webhooks', 'n8n', 'Zapier', 'Make'],
    idealFor: ['Teams spending hours on manual data entry', 'Businesses using multiple disconnected SaaS tools', 'Companies wanting to scale operations without hiring extra admin staff'],
    relatedServices: ['ai-intelligent-systems', 'custom-software', 'cloud-devops'],
  },
  {
    number: '07',
    id: 'cloud-devops',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    category: 'cloud-security',
    iconName: 'Cloud',
    shortDescription: 'Reliable cloud infrastructure, deployment pipelines and environments built to support growth.',
    tags: ['Cloud', 'CI/CD', 'Infrastructure'],
    heroHeading: 'Reliable Cloud Infrastructure & Seamless Automated Deployments',
    heroSupporting: 'We set up secure cloud hosting environments, automated CI/CD pipelines, and proactive monitoring to ensure your applications stay fast and dependable.',
    whatWeDo: 'We configure and manage cloud platforms like AWS, GCP, and Cloudflare. From containerizing applications with Docker to setting up automated deployment pipelines, we make deploying software predictable, repeatable, and safe.',
    capabilities: [
      {
        title: 'Cloud Architecture & Setup',
        desc: 'Clean, cost-optimized hosting environments on AWS, Google Cloud, DigitalOcean, or modern edge platforms.',
      },
      {
        title: 'Automated CI/CD Pipelines',
        desc: 'Automated testing and zero-downtime deployment pipelines using GitHub Actions, ensuring smooth releases.',
      },
      {
        title: 'Containerization & Docker',
        desc: 'Standardized Docker environments that run identically on developer laptops and live production servers.',
      },
      {
        title: 'Uptime Monitoring & Backups',
        desc: 'Proactive server health monitoring, automatic SSL renewals, error tracking, and automated daily database backups.',
      },
    ],
    buildExamples: [
      {
        title: 'Production AWS Cloud Setup',
        desc: 'Secure VPC, managed database with automatic backups, load balancer, and container hosting.',
      },
      {
        title: 'Automated GitHub Actions Pipeline',
        desc: 'Automatic unit test verification and staging deployment whenever developers push code.',
      },
      {
        title: 'Database Replication & Disaster Recovery',
        desc: 'Automated daily encrypted backups with quick-restore testing procedures.',
      },
      {
        title: 'Edge CDN & Asset Acceleration',
        desc: 'Global content distribution via Cloudflare for lightning-fast image and static asset delivery.',
      },
    ],
    technologies: ['AWS', 'Google Cloud', 'Docker', 'GitHub Actions', 'Cloudflare', 'PostgreSQL', 'Linux'],
    idealFor: ['Startups needing a rock-solid production setup', 'Companies with manual, error-prone deployment steps', 'Businesses wanting to reduce cloud hosting waste and improve reliability'],
    relatedServices: ['cybersecurity', 'custom-software', 'website-maintenance'],
  },
  {
    number: '08',
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    category: 'cloud-security',
    iconName: 'ShieldCheck',
    shortDescription: 'Security-focused development and practical protection for applications, systems and business data.',
    tags: ['Security Review', 'Hardening', 'Monitoring'],
    heroHeading: 'Practical Security That Protects Your Systems & Data',
    heroSupporting: 'We identify application vulnerabilities, enforce secure authentication, and implement practical security measures to protect your digital assets.',
    whatWeDo: 'Security is not an afterthought — it should be built into every layer of software. We conduct code security reviews, configure secure access controls, and patch infrastructure vulnerabilities to give you and your clients peace of mind.',
    capabilities: [
      {
        title: 'Application Security Auditing',
        desc: 'Reviewing codebases for OWASP Top 10 vulnerabilities like SQL injection, cross-site scripting, and broken authentication.',
      },
      {
        title: 'Authentication & Access Control',
        desc: 'Implementation of secure JWT authentication, multi-factor authentication (MFA), and role-based access control (RBAC).',
      },
      {
        title: 'Server & Cloud Hardening',
        desc: 'Restricting firewall rules, securing SSH access, enforcing HTTPS encryption, and managing environment secrets safely.',
      },
      {
        title: 'Data Protection & Encryption',
        desc: 'Ensuring sensitive customer data is encrypted in transit and at rest with secure key management.',
      },
    ],
    buildExamples: [
      {
        title: 'Web Application Security Review',
        desc: 'Comprehensive security checklist and vulnerability remediation plan for a live web application.',
      },
      {
        title: 'Secure Multi-Factor Authentication Flow',
        desc: 'Role-based access system with email/SMS verification and session invalidation.',
      },
      {
        title: 'Secrets Management Setup',
        desc: 'Migrating hardcoded credentials to secure vault systems with automated key rotation.',
      },
      {
        title: 'Automated Vulnerability Scanning',
        desc: 'Automated dependency vulnerability checks in CI/CD before any code goes to production.',
      },
    ],
    technologies: ['OWASP Standards', 'SSL/TLS', 'JWT', 'RBAC', 'Cloudflare WAF', 'Linux Security'],
    idealFor: ['Companies handling sensitive customer or financial data', 'Businesses preparing for third-party security audits', 'Teams wanting to verify that their application has no obvious vulnerabilities'],
    relatedServices: ['cloud-devops', 'custom-software', 'website-maintenance'],
  },
  {
    number: '09',
    id: 'social-media-management',
    slug: 'social-media-management',
    title: 'Social Media Management',
    category: 'design-marketing',
    iconName: 'Share2',
    shortDescription: 'Build a consistent digital presence with strategic content, creative direction and ongoing social media management.',
    tags: ['Content Strategy', 'Social Media', 'Creative'],
    heroHeading: 'Build a Credible & Consistent Digital Presence',
    heroSupporting: 'We help tech companies and modern businesses present themselves clearly, professionally, and consistently across digital channels.',
    whatWeDo: 'Consistent branding and clear communication build market trust. We plan content themes, design high-quality social graphics, write clear technical copy, and manage regular posting to keep your brand top of mind with prospective clients and talent.',
    capabilities: [
      {
        title: 'Content Strategy & Calendar Planning',
        desc: 'Strategic monthly content plans aligning with your business goals, product launches, and industry topics.',
      },
      {
        title: 'Visual Creative & Post Design',
        desc: 'Clean, branded graphics, carousels, and visual snippets designed specifically for LinkedIn, Twitter/X, and Instagram.',
      },
      {
        title: 'Copywriting & Thought Leadership',
        desc: 'Clear, engaging copy that explains technical topics simply without sounding generic or overly promotional.',
      },
      {
        title: 'Publishing & Engagement',
        desc: 'Scheduled posting, hashtag strategy, and audience response monitoring to maintain an active profile.',
      },
    ],
    buildExamples: [
      {
        title: 'LinkedIn Company Presence',
        desc: 'Regular thought-leadership posts, case study highlights, and company milestone updates.',
      },
      {
        title: 'Product Launch Social Campaign',
        desc: 'Coordinated sequence of teaser posts, announcement visuals, and feature deep-dives.',
      },
      {
        title: 'Educational Visual Carousels',
        desc: 'Multi-slide design breakdowns and industry insights formatted for high engagement.',
      },
      {
        title: 'Monthly Analytics & Growth Report',
        desc: 'Clear summary of top-performing content, reach metrics, and follower growth trends.',
      },
    ],
    technologies: ['Figma', 'Canva Pro', 'Buffer', 'Social Analytics', 'Content Strategy'],
    idealFor: ['Tech companies wanting a professional social presence', 'Founders looking to build company credibility', 'Businesses needing consistent content without spending internal team hours'],
    relatedServices: ['digital-marketing', 'brand-design', 'web-development'],
  },
  {
    number: '10',
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'design-marketing',
    iconName: 'TrendingUp',
    shortDescription: 'Data-driven digital marketing designed to improve visibility, reach and customer acquisition.',
    tags: ['SEO', 'Paid Campaigns', 'Analytics'],
    heroHeading: 'Targeted Marketing That Generates Real Inquiries',
    heroSupporting: 'We combine search engine optimization, paid ad campaigns, and analytics tracking to connect your services with the right prospective buyers.',
    whatWeDo: 'Marketing only works when it brings the right visitors to a clear value proposition. We focus on pragmatic digital marketing: search engine visibility for high-intent keywords, targeted search and social campaigns, and clear analytics reporting.',
    capabilities: [
      {
        title: 'Search Engine Optimization (SEO)',
        desc: 'On-page technical SEO, keyword research, meta tags, and content structure that help buyers find you on Google.',
      },
      {
        title: 'Targeted Paid Advertising',
        desc: 'Focused Google Search and LinkedIn ad campaigns targeting decision-makers with specific business needs.',
      },
      {
        title: 'Conversion Funnel Tracking',
        desc: 'Setting up Google Analytics 4 and conversion events to understand where your most valuable leads originate.',
      },
      {
        title: 'Landing Page Optimization',
        desc: 'Clear messaging, trust signals, and direct call-to-action placement to increase lead form submissions.',
      },
    ],
    buildExamples: [
      {
        title: 'High-Intent Google Search Campaign',
        desc: 'Targeted search ads capturing users searching for specific software and engineering services.',
      },
      {
        title: 'Technical SEO Audit & Remediation',
        desc: 'Fixing crawl errors, optimizing site speed, and improving meta descriptions across key pages.',
      },
      {
        title: 'GA4 & Lead Event Dashboard',
        desc: 'Simple dashboard tracking contact form fills, phone clicks, and campaign performance.',
      },
      {
        title: 'B2B Retargeting Campaign',
        desc: 'Reminding previous website visitors about your core services across professional networks.',
      },
    ],
    technologies: ['Google Analytics 4', 'Google Search Console', 'Google Ads', 'LinkedIn Ads', 'SEO Tools'],
    idealFor: ['Companies seeking consistent inbound lead flow', 'Businesses with low website search visibility', 'Teams wanting clear return on their marketing spend'],
    relatedServices: ['social-media-management', 'web-development', 'brand-design'],
  },
  {
    number: '11',
    id: 'brand-design',
    slug: 'brand-design',
    title: 'Graphic & Brand Design',
    category: 'design-marketing',
    iconName: 'Sparkles',
    shortDescription: 'Professional visual identities and marketing creatives that make your business look consistent and memorable.',
    tags: ['Brand Identity', 'Social Creatives', 'Marketing Design'],
    heroHeading: 'Cohesive Visual Identities That Command Trust',
    heroSupporting: 'We create clean logos, cohesive brand guidelines, and polished marketing assets that help your company stand out and look established.',
    whatWeDo: 'First impressions matter. We help businesses define their visual identity — from logo marks, typographic systems, and color palettes to presentation slide decks and marketing collateral — so your company communicates quality across every touchpoint.',
    capabilities: [
      {
        title: 'Logo & Visual Identity Systems',
        desc: 'Memorable, modern logo marks, typographic pairings, and color palettes that fit your industry.',
      },
      {
        title: 'Brand Style Guidelines',
        desc: 'Clear, concise brand manuals outlining how to use fonts, colors, and logos consistently across all media.',
      },
      {
        title: 'Pitch Decks & Presentation Design',
        desc: 'Professional investor decks, sales presentations, and client proposals that look crisp and persuasive.',
      },
      {
        title: 'Marketing & Digital Collateral',
        desc: 'Custom social banners, email header templates, PDF one-pagers, and digital brochure assets.',
      },
    ],
    buildExamples: [
      {
        title: 'Complete Startup Brand Identity Pack',
        desc: 'Primary logo, icon variations, color system, typography rules, and business card templates.',
      },
      {
        title: 'Investor & Sales Presentation Deck',
        desc: 'Polished 15-slide master presentation template with custom charts and clean layouts.',
      },
      {
        title: 'Marketing One-Pager & PDF Overview',
        desc: 'Print-ready and digital downloadable PDF summaries of company capabilities.',
      },
      {
        title: 'Social & Web Banner Asset Kit',
        desc: 'Standardized profile banners, cover images, and promotional templates for all platforms.',
      },
    ],
    technologies: ['Figma', 'Adobe Illustrator', 'Brand Systems', 'Typography', 'Vector Graphics'],
    idealFor: ['New companies needing a professional brand launch', 'Established businesses wanting to modernize their image', 'Founders preparing for investor or client pitches'],
    relatedServices: ['ui-ux-design', 'social-media-management', 'web-development'],
  },
  {
    number: '12',
    id: 'website-maintenance',
    slug: 'website-maintenance',
    title: 'Website Maintenance & Support',
    category: 'cloud-security',
    iconName: 'RefreshCw',
    shortDescription: 'Keep your website secure, updated, fast and reliable after launch.',
    tags: ['Maintenance', 'Security', 'Performance'],
    heroHeading: 'Keep Your Website Secure, Fast & Always Updated',
    heroSupporting: 'We provide ongoing technical maintenance, security updates, regular backups, and content updates so you never have to worry about your website going down.',
    whatWeDo: 'Websites need ongoing attention to stay secure, fast, and compatible with modern browsers. We take care of routine updates, performance monitoring, emergency bug fixes, and minor content adjustments so your site remains a reliable asset.',
    capabilities: [
      {
        title: 'Regular Security & Plugin Updates',
        desc: 'Proactive updates to dependencies, CMS core files, and security patches to prevent vulnerabilities.',
      },
      {
        title: 'Automated Daily Backups & Restore',
        desc: 'Secure cloud backups of website files and databases with one-click restore capabilities.',
      },
      {
        title: 'Ongoing Speed & Performance Checks',
        desc: 'Continuous monitoring of Core Web Vitals, caching rules, and asset optimization for fast load times.',
      },
      {
        title: 'Content Adjustments & Bug Fixes',
        desc: 'Fast turnaround on text changes, new team member additions, image updates, and layout fixes.',
      },
    ],
    buildExamples: [
      {
        title: 'Monthly Maintenance & Health Audit',
        desc: 'Scheduled monthly checkup including broken link scanning, form testing, and security review.',
      },
      {
        title: 'Emergency Site Recovery & Fixes',
        desc: 'Rapid assistance if a website encounters downtime, formatting issues, or broken forms.',
      },
      {
        title: 'Regular Copy & Banner Updates',
        desc: 'Ongoing updates to pricing tables, new service announcements, and contact information.',
      },
      {
        title: 'Speed Optimization Tune-Up',
        desc: 'Compressing images, cleaning unused scripts, and configuring caching headers.',
      },
    ],
    technologies: ['Monitoring Tools', 'Automated Backups', 'SSL/TLS', 'Performance Tuning', 'Git Version Control'],
    idealFor: ['Business owners who do not have time to maintain their website', 'Companies needing a dependable technical team on standby', 'Websites where downtime directly hurts revenue or reputation'],
    relatedServices: ['web-development', 'cloud-devops', 'cybersecurity'],
  },
];
