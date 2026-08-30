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

// Global Organization Schema (Used across the website for brand entity grounding)
export const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ['Alpha AI', 'AlphaAiServices', 'Alpha AI Software Engineering'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/brandlogo.png`,
    caption: 'Alpha AI Services Logo',
  },
  image: `${SITE_URL}/brandlogo.png`,
  description:
    'Alpha AI Services is a software engineering and AI product studio specializing in custom LLMs, enterprise RAG pipelines, modern web applications, mobile apps, and scalable cloud systems.',
  email: 'info@alphaaiservices.in',
  foundingDate: '2024',
  knowsAbout: [
    'Artificial Intelligence',
    'Generative AI & LLMs',
    'Retrieval-Augmented Generation (RAG)',
    'Full-Stack Web Development',
    'Mobile Application Development',
    'Cloud Architecture & DevOps',
    'Custom Software Engineering',
    'UI/UX Design Systems',
    'Workflow Automation',
    'Cybersecurity',
  ],
  sameAs: [
    'https://www.linkedin.com/in/tiwarijii',
    'https://www.instagram.com/alphaaiservices.in/?hl=en',
    'https://github.com/tiwariji7',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: 'Prayagraj',
    addressRegion: 'Uttar Pradesh',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'info@alphaaiservices.in',
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
};

// Global LocalBusiness / ProfessionalService Schema
export const LOCAL_BUSINESS_SCHEMA = {
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brandlogo.png`,
  image: `${SITE_URL}/brandlogo.png`,
  email: 'info@alphaaiservices.in',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Prayagraj',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'AdministrativeArea', name: 'Worldwide' },
  ],
};

// Website Schema with search action capability
export const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: 'Enterprise AI applications, custom software, and digital experiences that scale.',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
};

// Static Pages SEO definitions
const STATIC_PAGES_SEO: Record<string, PageSEO> = {
  '/': {
    title: 'Enterprise AI & Custom Software Engineering | Alpha AI Services',
    description:
      'Alpha AI Services engineers production-grade AI applications, custom software, modern web apps, and cloud systems for high-growth startups and enterprises.',
    canonicalUrl: `${SITE_URL}/`,
    keywords: [
      'Enterprise AI Development',
      'Custom Software Engineering',
      'Web Application Development',
      'Mobile App Development',
      'RAG Pipelines',
      'AI Product Studio',
    ],
    breadcrumbs: [{ name: 'Home', url: `${SITE_URL}/` }],
    faqs: FAQS_DATA,
  },
  '/services': {
    title: 'Enterprise AI & Software Development Services | Alpha AI Services',
    description:
      'Explore full-lifecycle software engineering services: AI and machine learning, custom web apps, mobile applications, cloud DevOps, and automated workflows.',
    canonicalUrl: `${SITE_URL}/services`,
    keywords: [
      'Software Engineering Services',
      'AI Development Company',
      'Full Stack Web Development',
      'Mobile App Development',
      'Cloud DevOps Solutions',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Services', url: `${SITE_URL}/services` },
    ],
    faqs: FAQS_DATA,
  },
  '/portfolio': {
    title: 'Engineered Software & AI Case Studies | Alpha AI Services',
    description:
      'Discover real-world AI applications, SaaS platforms, and digital products engineered by Alpha AI Services with verifiable architecture and technical ROI.',
    canonicalUrl: `${SITE_URL}/portfolio`,
    keywords: [
      'AI Case Studies',
      'Software Engineering Portfolio',
      'Healthcare AI App',
      '3D Web App',
      'Enterprise AI Assistant',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
    ],
  },
  '/pricing': {
    title: 'Transparent Software & AI Development Pricing | Alpha AI',
    description:
      'Clear, milestone-based software engineering and AI development pricing. Fixed-scope MVP sprints, dedicated engineering teams, and support plans.',
    canonicalUrl: `${SITE_URL}/pricing`,
    keywords: [
      'Software Development Pricing',
      'AI Development Cost',
      'Engineering Retainer Plans',
      'Dedicated Developers',
      'MVP Development Pricing',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Pricing', url: `${SITE_URL}/pricing` },
    ],
    faqs: PRICING_FAQS.map((f) => ({ question: f.question, answer: f.answer })),
  },
  '/company/about': {
    title: 'About Alpha AI Services — Software Engineering Studio',
    description:
      'Learn about Alpha AI Services: our engineering standards, senior product builders, technical ethos, and mission to deliver exceptional digital software.',
    canonicalUrl: `${SITE_URL}/company/about`,
    keywords: [
      'About Alpha AI Services',
      'Software Engineering Studio',
      'AI Development Team',
      'Senior Software Architects',
      'Engineering Philosophy',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'About', url: `${SITE_URL}/company/about` },
    ],
  },
  '/company/story': {
    title: 'Our Engineering Philosophy & Mission | Alpha AI Services',
    description:
      'Why we founded Alpha AI Services: eliminating agency bloat, pairing clients directly with senior software architects, and shipping resilient software.',
    canonicalUrl: `${SITE_URL}/company/story`,
    keywords: [
      'Engineering Philosophy',
      'Alpha AI Story',
      'Software Craftsmanship',
      'Senior Developers Direct',
      'Agile Software Studio',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Our Story', url: `${SITE_URL}/company/story` },
    ],
  },
  '/company/process': {
    title: 'Our 5-Stage Agile Engineering Process | Alpha AI Services',
    description:
      'From technical discovery and architectural prototyping to agile sprints, CI/CD deployment, and 24/7 monitoring—see how we ship production software.',
    canonicalUrl: `${SITE_URL}/company/process`,
    keywords: [
      'Software Development Process',
      'Agile Engineering Methodology',
      'Sprint Delivery',
      'CI/CD Pipeline Architecture',
      'Technical Discovery',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Process', url: `${SITE_URL}/company/process` },
    ],
  },
  '/company/industries': {
    title: 'Industry-Specific AI & Software Solutions | Alpha AI Services',
    description:
      'Tailored AI and software solutions for Healthcare, FinTech, E-Commerce, Logistics, SaaS, and EdTech with domain-compliant architecture.',
    canonicalUrl: `${SITE_URL}/company/industries`,
    keywords: [
      'Healthcare AI Solutions',
      'FinTech Software Development',
      'E-Commerce Engineering',
      'Logistics Automation',
      'Enterprise SaaS Development',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Industries', url: `${SITE_URL}/company/industries` },
    ],
  },
  '/contact': {
    title: 'Contact Alpha AI Services — Discuss Your Next Project',
    description:
      'Schedule a technical consultation or submit project requirements. Receive an architectural roadmap and milestone estimate within one business day.',
    canonicalUrl: `${SITE_URL}/contact`,
    keywords: [
      'Contact Alpha AI Services',
      'Hire AI Engineers',
      'Software Consultation',
      'Request Project Proposal',
      'Software Engineering Inquiries',
    ],
    breadcrumbs: [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Contact', url: `${SITE_URL}/contact` },
    ],
    faqs: [
      {
        question: 'Do you work with startups and small businesses?',
        answer: 'Yes. We work with startups, small businesses and growing organizations depending on the project requirements.',
      },
      {
        question: 'Can you manage an existing website or application?',
        answer: 'Yes. We can provide maintenance, troubleshooting, improvements, hosting support and ongoing development.',
      },
      {
        question: 'Do you offer monthly support?',
        answer: 'Yes. Monthly technology support plans are available for businesses that need ongoing development and maintenance.',
      },
      {
        question: 'Can I contact you before submitting a project?',
        answer: 'Yes. You can contact us directly through email or WhatsApp to discuss your requirements.',
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
      'Data Protection Policy',
      'DPDP Act 2023 Compliance',
      'Client Confidentiality',
      'Information Security',
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
      'Data Protection Policy',
      'DPDP Act 2023 Compliance',
      'Client Confidentiality',
      'Information Security',
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
      'Software Engineering Agreement',
      'Client SOW Terms',
      'Code Ownership Terms',
      'Retainer Service Agreement',
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

  return {
    title: `${service.title} | Alpha AI Services`,
    description: service.shortDesc.length > 160 ? `${service.shortDesc.slice(0, 157)}...` : service.shortDesc,
    canonicalUrl: `${SITE_URL}/services/${service.slug}`,
    keywords: [
      service.title,
      `${service.title} Services`,
      'Custom Software Architecture',
      'Enterprise Engineering',
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
        question: `What is included in ${service.title}?`,
        answer: `${service.fullDesc} Features include: ${service.features.map((f) => f.title).join(', ')}.`,
      },
      {
        question: `How do you ensure performance and quality in ${service.title}?`,
        answer: `We use strict code review, continuous integration, automated testing, and SOC2-compliant engineering best practices with direct senior developer involvement.`,
      },
      {
        question: `Who owns the source code and IP for ${service.title}?`,
        answer: `You retain 100% full, unencumbered ownership of all source code, models, architecture diagrams, and design assets upon milestone delivery.`,
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
      'Case Study',
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
        question: `What challenge did the ${caseStudy.name} project solve?`,
        answer: caseStudy.challenge,
      },
      {
        question: `What was Alpha AI Services' technical solution for ${caseStudy.name}?`,
        answer: caseStudy.solution,
      },
      {
        question: `What technologies were utilized in ${caseStudy.name}?`,
        answer: `The platform was built using: ${caseStudy.techUsed.join(', ')}.`,
      },
    ],
  };
}

// Main lookup function to get SEO configuration for any pathname
export function getSeoConfigForPath(pathname: string): PageSEO {
  // Normalize pathname
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

  // Default fallback to Homepage SEO
  return STATIC_PAGES_SEO['/'];
}

// Helper to construct structured JSON-LD graph for a page
export function generateStructuredDataGraph(seo: PageSEO) {
  const graph: any[] = [
    ORGANIZATION_SCHEMA,
    LOCAL_BUSINESS_SCHEMA,
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
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Worldwide',
      },
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
            priceCurrency: 'USD',
            description: seo.serviceData.description,
          },
        ],
      },
    });
  }

  // FAQPage Schema (vital for AI search engine citation and featured snippet answers)
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
