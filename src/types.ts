export type RoutePath =
  | '/'
  | '/services'
  | `/services/${string}`
  | '/portfolio'
  | `/portfolio/${string}`
  | '/company/about'
  | '/company/story'
  | '/company/process'
  | '/company/industries'
  | '/pricing'
  | '/contact';

export interface NavItem {
  label: string;
  href: RoutePath;
  badge?: string;
  description?: string;
  iconName?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  accentColor: string;
  badgeText: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  techStack: {
    category: string;
    items: string[];
  }[];
  deliverables: string[];
  deliverableTimeline: string;
  businessImpact: {
    metric: string;
    label: string;
  }[];
  useCases: {
    title: string;
    description: string;
    industry: string;
  }[];
  sampleArchitectureTitle: string;
  sampleArchitectureSteps: string[];
  startingPrice: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  name: string; // Project Name e.g. SeHAT SmartCare, TOMATO, AI Business Assistant
  projectType: string; // e.g. 'Internal Product', 'Prototype', 'Client Project'
  tags: string[];
  year?: string;
  coverImage: string;
  summary: string;
  overview?: string;
  challenge: string;
  approach?: string;
  solution: string;
  keyOutcomes?: {
    metric: string;
    label: string;
  }[];
  techUsed: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  };
  keyFeatures?: string[];
  gallery?: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  deliverables: string[];
  iconName: string;
  highlights: string[];
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  popularUseCases: string[];
  keyBenefit: string;
  clientCount: string;
  featuredStat: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  idealFor: string;
  features: string[];
  notIncluded?: string[];
  buttonText: string;
  turnaroundTime: string;
  dedicatedTeam: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  companyLogoText: string;
  rating: number;
  avatar: string;
  projectType: string;
  highlightMetric?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface CompanyMilestone {
  year: string;
  quarter?: string;
  title: string;
  description: string;
  stat?: string;
}
