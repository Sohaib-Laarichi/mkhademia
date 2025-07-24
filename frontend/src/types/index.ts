// User & Authentication Types
export interface User {
  id: string;
  email: string;
  role: 'freelancer' | 'admin';
  isVerified: boolean;
  preferences: {
    language: 'ar' | 'fr' | 'en';
    notifications: {
      email: boolean;
      sms: boolean;
    };
  };
  lastLogin?: Date;
  createdAt: Date;
  profile?: FreelancerProfile | null;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
  refreshToken: string;
}

// Freelancer Types
export interface FreelancerProfile {
  id: string;
  user: string;
  slug: string;
  name: string;
  avatar?: string;
  title: string;
  
  // Professional Information
  category: Category;
  subcategories: string[];
  stacks: string[];
  experience: Experience;
  
  // Location & Work Mode
  location: {
    city: string;
    region: string;
    neighborhood?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  mode: WorkMode;
  
  // Pricing
  rate: {
    type: RateType;
    hourlyRate?: number;
    dailyRate?: number;
    projectStartsAt?: number;
    currency: string;
    isPublic: boolean;
  };
  
  // Availability
  availability: Availability;
  availableFrom?: Date;
  workingHours?: {
    timezone: string;
    schedule: {
      [key in WeekDay]: {
        start: string;
        end: string;
        available: boolean;
      };
    };
  };
  
  // Personal Information
  languages: Language[];
  bio?: string;
  services: string[];
  industries: string[];
  
  // Portfolio & Work
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  
  // Contact Information
  contacts: {
    whatsapp?: string;
    phone?: string;
    email?: string;
    website?: string;
    social: {
      linkedin?: string;
      github?: string;
      behance?: string;
      dribbble?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  
  // SEO & Marketing
  seo: {
    keywords: string[];
    ogImage?: string;
    metaDescription?: string;
  };
  
  // Profile Status
  visibility: Visibility;
  isVerified: boolean;
  isPremium: boolean;
  
  // Analytics
  stats: {
    profileViews: number;
    contactClicks: number;
    portfolioViews: number;
    searchAppearances: number;
  };
  
  // Profile Completeness
  completeness: {
    score: number;
    missingFields: string[];
  };
  
  // Computed fields
  averageRating: number;
  totalTestimonials: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioItem {
  id?: string;
  title: string;
  description?: string;
  images: string[];
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  category?: string;
  completedAt?: Date;
  clientName?: string;
  isPublic: boolean;
}

export interface Testimonial {
  id?: string;
  clientName: string;
  clientTitle?: string;
  clientCompany?: string;
  rating: number;
  comment: string;
  projectTitle?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Language {
  code: 'ar' | 'fr' | 'en' | 'es';
  level: 'basic' | 'intermediate' | 'fluent' | 'native';
}

// Lead Types
export interface Lead {
  id: string;
  freelancerId: string;
  channel: LeadChannel;
  
  // Contact Information
  name: string;
  email?: string;
  phone?: string;
  
  // Project Details
  message: string;
  projectType?: string;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  timeline?: string;
  urgency: Urgency;
  
  // Lead Management
  status: LeadStatus;
  priority: Priority;
  source: LeadSource;
  
  // Tracking
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  
  // Communication History
  notes: LeadNote[];
  
  // Response tracking
  responseTime?: Date;
  isResponded: boolean;
  
  // Verification
  isVerified: boolean;
  verificationToken?: string;
  verificationExpires?: Date;
  
  // Computed fields
  ageInHours: number;
  responseTimeInHours?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadNote {
  content: string;
  addedBy: string;
  addedAt: Date;
}

// Search & Filter Types
export interface SearchFilters {
  q?: string;
  category?: Category;
  stacks?: string[];
  mode?: WorkMode;
  city?: string;
  region?: string;
  rate_min?: number;
  rate_max?: number;
  availability?: Availability;
  experience?: Experience;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface SearchResponse {
  freelancers: FreelancerProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: SearchFilters;
}

// Enum Types
export type Category = 
  | 'development' 
  | 'design' 
  | 'video' 
  | 'photography' 
  | '3d' 
  | 'marketing' 
  | 'writing' 
  | 'other';

export type Experience = 'junior' | 'mid' | 'senior' | 'expert';

export type WorkMode = 'remote' | 'hybrid' | 'onsite';

export type RateType = 'hourly' | 'daily' | 'project' | 'negotiable';

export type Availability = 'now' | '1w' | '1m' | 'customDate' | 'unavailable';

export type Visibility = 'public' | 'hidden' | 'pending';

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type LeadChannel = 'whatsapp' | 'phone' | 'email' | 'form';

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'qualified' | 'converted' | 'rejected' | 'closed';

export type Priority = 'low' | 'medium' | 'high';

export type Urgency = 'low' | 'medium' | 'high' | 'urgent';

export type LeadSource = 'direct' | 'search' | 'referral' | 'social' | 'other';

export type SortOption = 'best' | 'newest' | 'rating' | 'price_low' | 'price_high' | 'views';

// API Response Types
export interface ApiResponse<T = any> {
  message?: string;
  error?: string;
  code?: string;
  data?: T;
}

export interface ApiError {
  error: string;
  code: string;
  details?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

// Statistics Types
export interface PlatformStats {
  total: number;
  active: number;
  categories: Array<{
    _id: Category;
    count: number;
  }>;
  locations: Array<{
    _id: string;
    count: number;
  }>;
}

export interface LeadStats {
  stats: {
    total: number;
    responded: number;
    converted: number;
    avgResponseTime: number | null;
  };
  breakdown: {
    status: Array<{
      _id: LeadStatus;
      count: number;
    }>;
    channel: Array<{
      _id: LeadChannel;
      count: number;
    }>;
  };
  recentActivity: Array<{
    name: string;
    channel: LeadChannel;
    status: LeadStatus;
    createdAt: Date;
    urgency: Urgency;
  }>;
  timeframe: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  language?: 'ar' | 'fr' | 'en';
}

export interface FreelancerProfileForm {
  name: string;
  title: string;
  category: Category;
  subcategories?: string[];
  stacks?: string[];
  experience?: Experience;
  location: {
    city: string;
    region: string;
    neighborhood?: string;
  };
  mode?: WorkMode;
  rate?: {
    type: RateType;
    hourlyRate?: number;
    dailyRate?: number;
    projectStartsAt?: number;
    isPublic?: boolean;
  };
  availability?: Availability;
  availableFrom?: Date;
  languages?: Language[];
  bio?: string;
  services?: string[];
  industries?: string[];
  contacts?: {
    whatsapp?: string;
    phone?: string;
    email?: string;
    website?: string;
    social?: {
      linkedin?: string;
      github?: string;
      behance?: string;
      dribbble?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  seo?: {
    keywords?: string[];
    metaDescription?: string;
  };
}

export interface LeadForm {
  freelancerId: string;
  channel: LeadChannel;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  projectType?: string;
  budget?: {
    min?: number;
    max?: number;
  };
  timeline?: string;
  urgency?: Urgency;
  source?: LeadSource;
}

// Constants
export const CATEGORIES: Array<{ value: Category; label: string; labelAr: string }> = [
  { value: 'development', label: 'Développement', labelAr: 'التطوير' },
  { value: 'design', label: 'Design', labelAr: 'التصميم' },
  { value: 'video', label: 'Vidéo', labelAr: 'الفيديو' },
  { value: 'photography', label: 'Photographie', labelAr: 'التصوير' },
  { value: '3d', label: 'Modélisation 3D', labelAr: 'النمذجة ثلاثية الأبعاد' },
  { value: 'marketing', label: 'Marketing', labelAr: 'التسويق' },
  { value: 'writing', label: 'Rédaction', labelAr: 'الكتابة' },
  { value: 'other', label: 'Autre', labelAr: 'أخرى' },
];

export const MOROCCAN_REGIONS = [
  'Tanger-Tétouan-Al Hoceïma',
  'Oriental',
  'Fès-Meknès',
  'Rabat-Salé-Kénitra',
  'Béni Mellal-Khénifra',
  'Casablanca-Settat',
  'Marrakech-Safi',
  'Drâa-Tafilalet',
  'Souss-Massa',
  'Guelmim-Oued Noun',
  'Laâyoune-Sakia El Hamra',
  'Dakhla-Oued Ed-Dahab',
];

export const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Fès',
  'Marrakech',
  'Agadir',
  'Tanger',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Salé',
  'Mohammedia',
  'El Jadida',
  'Béni Mellal',
  'Nador',
];