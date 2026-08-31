import { SERVICES_DATA, PORTFOLIO_DATA, FAQS_DATA } from '../data/siteData';
import { PRICING_FAQS } from '../data/pricingData';

export const SITE_URL = 'https://alphaaiservices.in';
export const SITE_NAME = 'Alpha AI Services';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brandlogo.png`;

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItemSEO {
  question: string;
  answer: string;
}

export interface PageSEO {
  title: string; // 50-60 chars target
  description: string; // 140-160 chars target
  canonicalUrl: string;
  keywords: string[];
  ogType?: 'website' | 'article';
  ogImage?: string;
  breadcrumbs: BreadcrumbItem[];
  faqs?: FAQItemSEO[];
  serviceData?: {
    name: string;
    description: string;
    serviceType: string;
    startingPrice?: string;
  };
  creativeWorkData?: {
    name: string;
    headline: string;
    description: string;
    techUsed: string[];
  };
}

// Global Organization Schema (Brand Entity Grounding)
export const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ['Alpha AI', 'AlphaAiServices', 'Alpha AI Software Engineering Studio'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/brandlogo.png`,
    caption: 'Alpha AI Services Logo',
  },
  image: `${SITE_URL}/brandlogo.png`,
  description:
    'Alpha AI Services is a premier website and app development company in India with teams in Pune and Prayagraj, engineering custom web applications, mobile apps, SaaS platforms, and enterprise AI solutions.',
  email: 'info@alphaaiservices.in',
  telephone: '+918381835420',
  foundingDate: '2024',
  knowsAbout: [
    'Website Development',
    'Mobile Application Development',
    'Full-Stack Web Engineering',
    'Custom Software Development',
    'Artificial Intelligence & Machine Learning',
    'Retrieval-Augmented Generation (RAG)',
    'UI/UX Design Systems',
    'Cloud Architecture & DevOps',
    'Workflow Automation',
    'Cybersecurity',
  ],
  sameAs: [
    'https://www.linkedin.com/in/tiwarijii',
    'https://www.instagram.com/alphaaiservices.in/?hl=en',
    'https://github.com/tiwariji7',
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Civil Lines',
      addressLocality: 'Prayagraj',
      addressRegion: 'Uttar Pradesh',
      postalCode: '211001',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Baner / Hinjawadi Tech Hub',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411045',
      addressCountry: 'IN',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+918381835420',
      email: 'info@alphaaiservices.in',
      contactType: 'sales and customer support',
      areaServed: ['IN', 'US', 'GB', 'Worldwide'],
      availableLanguage: ['English', 'Hindi'],
    },
  ],
};

// LocalBusiness Schema for Prayagraj Office
export const LOCAL_BUSINESS_PRAYAGRAJ_SCHEMA = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business-prayagraj`,
  name: 'Alpha AI Services — Prayagraj Office',
  alternateName: 'Alpha AI Prayagraj',
  url: SITE_URL,
  logo: `${SITE_URL}/brandlogo.png`,
  image: `${SITE_URL}/brandlogo.png`,
  email: 'info@alphaaiservices.in',
  telephone: '+918381835420',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Civil Lines',
    addressLocality: 'Prayagraj',
    addressRegion: 'Uttar Pradesh',
    postalCode: '211001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '25.4358',
    longitude: '81.8463',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Prayagraj' },
    { '@type': 'AdministrativeArea', name: 'Uttar Pradesh' },
    { '@type': 'Country', name: 'India' },
  ],
};

// LocalBusiness Schema for Pune Office
export const LOCAL_BUSINESS_PUNE_SCHEMA = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business-pune`,
  name: 'Alpha AI Services — Pune Office',
  alternateName: 'Alpha AI Pune',
  url: SITE_URL,
  logo: `${SITE_URL}/brandlogo.png`,
  image: `${SITE_URL}/brandlogo.png`,
  email: 'info@alphaaiservices.in',
  telephone: '+918381835420',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Baner / Hinjawadi Tech Hub',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411045',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '18.5204',
    longitude: '73.8567',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Pune' },
    { '@type': 'AdministrativeArea', name: 'Maharashtra' },
    { '@type': 'Country', name: 'India' },
  ],
};

// Website Schema with search action capability
export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: 'Enterprise website development, mobile apps, and custom software engineering across India.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
};

// Static Pages SEO definitions with target keywords
const STATIC_PAGES_SEO: Record<string, PageSEO> = {
  '/': {
    title: 'Website & App Development Company in India | Alpha AI',
    description:
      'Alpha AI Services is a leading website and app development company in India. We engineer custom web apps, mobile apps, AI systems, and SaaS platforms.',
    canonicalUrl: `${SITE_URL}/`,
    keywords: [
      'website development company in India',
      'app development company in India',
      'custom website development services India',
      'best web development company for startups India',
      'affordable website development for small business India',
      'hire web developer India',
      'hire app developer India',
      'digital marketing agency for small business India',
      'social media management services India',
    ],
    breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }],
    faqs: FAQS_DATA,
  },
  '/services': {
    title: 'Website, App & AI Development Services India | Alpha AI',
    description:
      'Explore custom website development, mobile app engineering, AI systems, and cloud DevOps built for high-growth startups and businesses across India.',
    canonicalUrl: `${SITE_URL}/services`,
    keywords: [
      'website development company in India',
      'app development company in India',
      'custom website development services India',
      'software development services India',
      'full stack web development',
      'digital agency India',
      'hire web developer India',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Services', url: `${SITE_URL}/services` },
    ],
    faqs: FAQS_DATA,
  },
  '/portfolio': {
    title: 'Website & App Development Portfolio | Alpha AI Case Studies',
    description:
      'Discover real-world websites, mobile applications, SaaS platforms, and AI systems engineered by Alpha AI Services with verifiable performance and ROI.',
    canonicalUrl: `${SITE_URL}/portfolio`,
    keywords: [
      'web development portfolio India',
      'app development case studies',
      'software engineering portfolio',
      'custom web apps India',
      'healthcare web app',
      '3D web app case study',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
    ],
  },
  '/pricing': {
    title: 'Affordable Website & App Development Pricing in India',
    description:
      'Transparent, milestone-based pricing for website development, mobile apps, and dedicated developer retainers for startups and small businesses in India.',
    canonicalUrl: `${SITE_URL}/pricing`,
    keywords: [
      'affordable website development for small business India',
      'website development cost India',
      'how much does a website cost in India',
      'hire web developer India',
      'hire app developer India',
      'custom software development pricing',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Pricing', url: `${SITE_URL}/pricing` },
    ],
    faqs: PRICING_FAQS.map((f) => ({ question: f.question, answer: f.answer })),
  },
  '/company/about': {
    title: 'About Us — Web & App Development in Pune & Prayagraj',
    description:
      'Alpha AI Services is a software engineering studio with teams in Pune and Prayagraj, delivering custom websites, mobile apps, and AI for clients across India.',
    canonicalUrl: `${SITE_URL}/company/about`,
    keywords: [
      'website development company in Pune',
      'app development company in Pune',
      'website development company in Prayagraj',
      'web design agency Pune',
      'digital agency Prayagraj',
      'best web development company for startups India',
      'about Alpha AI Services',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'About', url: `${SITE_URL}/company/about` },
    ],
  },
  '/company/story': {
    title: 'Our Story & Engineering Philosophy | Alpha AI Services',
    description:
      'Why we built Alpha AI Services: pairing Indian startups with senior software engineers directly, building high-conversion websites, and eliminating agency bloat.',
    canonicalUrl: `${SITE_URL}/company/story`,
    keywords: [
      'best web development company for small business India',
      'digital marketing agency for local business India',
      'software craftsmanship India',
      'direct senior developers',
      'Alpha AI story',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Our Story', url: `${SITE_URL}/company/story` },
    ],
  },
  '/company/process': {
    title: 'Our Development Process & Pricing Models | Alpha AI',
    description:
      'Learn how our 5-stage development process delivers custom websites and apps on time and within budget. Understand timelines, scope, and technical roadmap.',
    canonicalUrl: `${SITE_URL}/company/process`,
    keywords: [
      'website development process explained',
      'how much does a website cost in India',
      'custom website development services India',
      'agile web development methodology',
      'sprint delivery process',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Process', url: `${SITE_URL}/company/process` },
    ],
  },
  '/company/industries': {
    title: 'Industry AI & Software Solutions India | Alpha AI',
    description:
      'Tailored website, mobile app, and AI solutions for Healthcare, FinTech, E-Commerce, Logistics, and SaaS startups with domain-compliant architectures.',
    canonicalUrl: `${SITE_URL}/company/industries`,
    keywords: [
      'healthcare web development India',
      'fintech software development',
      'e-commerce website development India',
      'logistics software automation',
      'SaaS application development India',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Industries', url: `${SITE_URL}/company/industries` },
    ],
  },
  '/contact': {
    title: 'Contact Us — Web & App Development in Pune & Prayagraj',
    description:
      'Connect with Alpha AI Services. Teams in Pune and Prayagraj providing website development, app development, and technical consulting across India.',
    canonicalUrl: `${SITE_URL}/contact`,
    keywords: [
      'website development company in Pune',
      'website development company in Prayagraj',
      'web design agency Pune',
      'digital agency Prayagraj',
      'hire web developer India',
      'hire app developer India',
      'contact Alpha AI Services',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Contact', url: `${SITE_URL}/contact` },
    ],
    faqs: [
      {
        question: 'Do you work with startups and small businesses across India?',
        answer: 'Yes. We work with startups, small businesses, and growing enterprises across all Indian cities as well as international clients.',
      },
      {
        question: 'Where are your offices located?',
        answer: 'We have operational teams and offices located in Prayagraj (Uttar Pradesh) and Pune (Maharashtra), serving clients nationwide.',
      },
      {
        question: 'Can you manage an existing website or mobile application?',
        answer: 'Yes. We provide complete maintenance, bug fixing, performance optimization, cloud hosting management, and ongoing feature development.',
      },
      {
        question: 'Do you offer monthly website and social media management packages?',
        answer: 'Yes. We offer transparent monthly technology and digital management plans for businesses needing continuous maintenance and growth support.',
      },
    ],
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Alpha AI Services — Data Protection',
    description:
      'Learn how Alpha AI Services protects your personal and business data in compliance with the Digital Personal Data Protection Act 2023 and IT Act 2000.',
    canonicalUrl: `${SITE_URL}/privacy-policy`,
    keywords: [
      'Privacy Policy',
      'Data Protection Policy India',
      'DPDP Act 2023 Compliance',
      'Client Confidentiality',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Privacy Policy', url: `${SITE_URL}/privacy-policy` },
    ],
  },
  '/privacy': {
    title: 'Privacy Policy | Alpha AI Services — Data Protection',
    description:
      'Learn how Alpha AI Services protects your personal and business data in compliance with the Digital Personal Data Protection Act 2023 and IT Act 2000.',
    canonicalUrl: `${SITE_URL}/privacy-policy`,
    keywords: [
      'Privacy Policy',
      'Data Protection Policy India',
      'DPDP Act 2023 Compliance',
      'Client Confidentiality',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Privacy Policy', url: `${SITE_URL}/privacy-policy` },
    ],
  },
  '/terms': {
    title: 'Terms & Conditions | Alpha AI Services — Engineering Terms',
    description:
      'Review the commercial terms and conditions governing software development sprints, milestone deliverables, and monthly retainers with Alpha AI Services.',
    canonicalUrl: `${SITE_URL}/terms`,
    keywords: [
      'Terms and Conditions',
      'Software Engineering Agreement India',
      'Client SOW Terms',
      'Code Ownership Terms',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Terms & Conditions', url: `${SITE_URL}/terms` },
    ],
  },
};

// Function to resolve SEO metadata for dynamic service routes
function getServiceSEO(slug: string): PageSEO {
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) {
    return STATIC_PAGES_SEO['/services'];
  }

  // Specialized metadata for target services
  const customServiceMeta: Record<string, { title: string; desc: string; keywords: string[] }> = {
    'web-development': {
      title: 'Custom Website Development Company in India | Alpha AI',
      desc: 'Professional website development company in India offering responsive design, custom web applications, e-commerce, and high-performance frontend solutions.',
      keywords: [
        'custom website development for small business',
        'responsive website design services',
        'e-commerce website development India',
        'website development company in India',
        'hire web developer India',
      ],
    },
    'mobile-apps': {
      title: 'Mobile App Development Company in India | Alpha AI',
      desc: 'End-to-end iOS & Android mobile app development company in India building scalable, high-performance apps for startups and growing enterprises.',
      keywords: [
        'mobile app development company India',
        'Android/iOS app development for startups',
        'app development company in India',
        'hire app developer India',
        'cross-platform mobile app development',
      ],
    },
    'ai-development': {
      title: 'AI & Machine Learning Development India | Alpha AI',
      desc: 'Production-grade enterprise AI, custom LLMs, RAG pipelines, and intelligent workflow automation engineered for modern businesses across India.',
      keywords: [
        'AI development company India',
        'custom LLM development',
        'RAG pipeline engineering',
        'machine learning services India',
      ],
    },
    'software-development': {
      title: 'Custom Software Engineering Services India | Alpha AI',
      desc: 'Scalable enterprise software engineering, robust API architecture, and microservice backend systems designed for high-concurrency business operations.',
      keywords: [
        'custom software development services India',
        'enterprise backend development',
        'microservices architecture India',
        'custom software engineering',
      ],
    },
    'cloud-devops': {
      title: 'Cloud Infrastructure & DevOps Services India | Alpha AI',
      desc: 'Automated CI/CD pipelines, Kubernetes orchestration, cloud security, and 24/7 observability for resilient and scalable digital platforms.',
      keywords: [
        'cloud DevOps services India',
        'Kubernetes consulting India',
        'CI/CD pipeline automation',
        'cloud infrastructure management',
      ],
    },
    'cyber-security': {
      title: 'Cybersecurity & Data Protection Services | Alpha AI',
      desc: 'Enterprise-grade security audits, DPDP Act 2023 compliance, vulnerability testing, and zero-trust data protection for modern applications.',
      keywords: [
        'cybersecurity services India',
        'DPDP Act compliance audit',
        'application security testing',
        'data protection services',
      ],
    },
    'ui-ux-design': {
      title: 'UI/UX Design Systems & Product Design | Alpha AI',
      desc: 'Conversion-focused UI/UX design, interactive prototyping, and design systems for web and mobile applications that engage users and drive growth.',
      keywords: [
        'UI/UX design agency India',
        'product design for startups',
        'design systems development',
        'mobile app UI design',
      ],
    },
    'automation': {
      title: 'Workflow Automation & Integrations India | Alpha AI',
      desc: 'Streamline business operations with custom API integrations, automated data pipelines, and intelligent workflow solutions across India.',
      keywords: [
        'workflow automation services India',
        'business process automation',
        'custom API integrations',
        'automation consulting India',
      ],
    },
  };

  const meta = customServiceMeta[slug] || {
    title: `${service.title} | Alpha AI Services`,
    desc: service.shortDesc.length > 160 ? `${service.shortDesc.slice(0, 157)}...` : service.shortDesc,
    keywords: [service.title, `${service.title} Services India`, 'Custom Software Architecture', 'Enterprise Engineering'],
  };

  return {
    title: meta.title,
    description: meta.desc,
    canonicalUrl: `${SITE_URL}/services/${service.slug}`,
    keywords: [
      ...meta.keywords,
      ...service.features.map((f) => f.title),
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Services', url: `${SITE_URL}/services` },
      { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
    ],
    serviceData: {
      name: service.title,
      description: service.fullDesc || service.shortDesc,
      serviceType: service.title,
      startingPrice: service.startingPrice,
    },
    faqs: [
      {
        question: `What is included in our ${service.title} offering?`,
        answer: `${service.fullDesc} Core capabilities include: ${service.features.map((f) => f.title).join(', ')}.`,
      },
      {
        question: `How do you ensure high performance and quality in ${service.title}?`,
        answer: `We implement strict code reviews, continuous automated testing, sub-second latency targets, and clean architecture with senior developer involvement.`,
      },
      {
        question: `Who owns the source code and IP for ${service.title}?`,
        answer: `You retain 100% full, unencumbered ownership of all source code, design assets, database schemas, and documentation from day one.`,
      },
    ],
  };
}

// Function to resolve SEO metadata for dynamic portfolio case study routes
function getPortfolioDetailSEO(slug: string): PageSEO {
  const caseStudy = PORTFOLIO_DATA.find((c) => c.slug === slug);
  if (!caseStudy) {
    return STATIC_PAGES_SEO['/portfolio'];
  }

  return {
    title: `${caseStudy.name}: ${caseStudy.title} Case Study | Alpha AI`,
    description: caseStudy.summary.length > 160 ? `${caseStudy.summary.slice(0, 157)}...` : caseStudy.summary,
    canonicalUrl: `${SITE_URL}/portfolio/${caseStudy.slug}`,
    ogImage: caseStudy.coverImage,
    keywords: [
      caseStudy.name,
      caseStudy.title,
      'Web & App Case Study',
      ...caseStudy.tags,
      ...caseStudy.techUsed,
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
      { name: caseStudy.name, url: `${SITE_URL}/portfolio/${caseStudy.slug}` },
    ],
    creativeWorkData: {
      name: caseStudy.name,
      headline: caseStudy.title,
      description: caseStudy.overview,
      techUsed: caseStudy.techUsed,
    },
    faqs: [
      {
        question: `What business challenge did the ${caseStudy.name} project address?`,
        answer: caseStudy.challenge,
      },
      {
        question: `What technical architecture did Alpha AI Services deliver for ${caseStudy.name}?`,
        answer: caseStudy.solution,
      },
      {
        question: `What technologies were utilized in engineering ${caseStudy.name}?`,
        answer: `The platform was engineered with: ${caseStudy.techUsed.join(', ')}.`,
      },
    ],
  };
}

// Main lookup function to get SEO configuration for any pathname
export function getSeoConfigForPath(pathname: string): PageSEO {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (STATIC_PAGES_SEO[normalized]) {
    return STATIC_PAGES_SEO[normalized];
  }

  if (normalized.startsWith('/services/')) {
    const slug = normalized.replace('/services/', '');
    return getServiceSEO(slug);
  }

  if (normalized.startsWith('/portfolio/')) {
    const slug = normalized.replace('/portfolio/', '');
    return getPortfolioDetailSEO(slug);
  }

  return STATIC_PAGES_SEO['/'];
}

// Helper to construct structured JSON-LD graph for a page
export function generateStructuredDataGraph(seo: PageSEO) {
  const graph: any[] = [
    ORGANIZATION_SCHEMA,
    LOCAL_BUSINESS_PRAYAGRAJ_SCHEMA,
    LOCAL_BUSINESS_PUNE_SCHEMA,
    WEBSITE_SCHEMA,
  ];

  // BreadcrumbList Schema
  if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${seo.canonicalUrl}#breadcrumbs`,
      itemListElement: seo.breadcrumbs.map((b, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: b.name,
        item: b.url,
      })),
    });
  }

  // Service Schema
  if (seo.serviceData) {
    graph.push({
      '@type': 'Service',
      '@id': `${seo.canonicalUrl}#service`,
      name: seo.serviceData.name,
      serviceType: seo.serviceData.serviceType,
      description: seo.serviceData.description,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      areaServed: [
        {
          '@type': 'Country',
          name: 'India',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Worldwide',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${seo.serviceData.name} Offerings`,
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: seo.serviceData.name,
            },
            priceCurrency: 'INR',
            description: seo.serviceData.description,
          },
        ],
      },
    });
  }

  // FAQPage Schema
  if (seo.faqs && seo.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${seo.canonicalUrl}#faq`,
      mainEntity: seo.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // CreativeWork / SoftwareApplication Schema for Portfolio items
  if (seo.creativeWorkData) {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${seo.canonicalUrl}#software`,
      name: seo.creativeWorkData.name,
      headline: seo.creativeWorkData.headline,
      description: seo.creativeWorkData.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cross-platform',
      author: {
        '@id': `${SITE_URL}/#organization`,
      },
      keywords: seo.creativeWorkData.techUsed.join(', '),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
