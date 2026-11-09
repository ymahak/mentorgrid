// Course Types
export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  duration: string;
  overview: string;
  prerequisites: string | null;
  whoShouldEnroll: string;
  learningOutcomes: string[];
  imageUrl: string | null;
  isVisible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  modules?: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string | null;
  topics: string[];
  order: number;
}

// Enquiry Types
export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseInterested: string | null;
  education: string | null;
  learningGoals: string | null;
  message: string;
  type: "general" | "corporate";
  companyName: string | null;
  contactPerson: string | null;
  businessEmail: string | null;
  participants: string | null;
  trainingFormat: string | null;
  isRead: boolean;
  createdAt: Date;
}

// Article Types
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string | null;
  isVisible: boolean;
  order: number;
  createdAt: Date;
}

// Mentor Profile Types
export interface MentorProfile {
  id: string;
  name: string;
  designation: string;
  bio: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  trainingPrograms: string[];
  imageUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
}

// Site Settings Types
export interface SiteSettings {
  id: string;
  key: string;
  value: string;
}

export interface SiteSettingsMap {
  contactEmail?: string;
  whatsappNumber?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

// Admin User Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Search Types
export interface SearchResult {
  type: "course" | "article";
  id: string;
  slug: string;
  title: string;
  description: string;
  category?: string;
}

// Form State Types
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  skills: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  outcome: string;
}

// Program Types
export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Pricing Plan Types
export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
}

// Course FAQs
export const courseFAQs: FAQ[] = [
  {
    question: "What is the duration of the course?",
    answer: "Course duration varies based on the program. The duration mentioned is indicative and subject to confirmation based on your learning pace and schedule.",
  },
  {
    question: "Are the sessions live or recorded?",
    answer: "We offer both live interactive sessions and recorded content. Live sessions allow for real-time interaction and doubt clearing, while recorded content can be accessed anytime for revision.",
  },
  {
    question: "What are the prerequisites for this course?",
    answer: "Prerequisites vary by course. Please check the specific course page for detailed prerequisites. For beginner courses, no prior experience is typically required.",
  },
  {
    question: "Will I get a certificate after completion?",
    answer: "Yes, upon successful completion of the course and projects, you will receive a certificate of completion.",
  },
  {
    question: "Is there any placement assistance?",
    answer: "We provide career guidance, resume review, and interview preparation support. While we don't guarantee placements, we help you become job-ready.",
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes, we offer flexible payment options. Please contact us to discuss payment plans that work for you.",
  },
  {
    question: "What if I miss a live session?",
    answer: "All live sessions are recorded and made available for later viewing. You can catch up at your convenience.",
  },
  {
    question: "How do I get my doubts cleared?",
    answer: "You can ask questions during live sessions, through our community forum, or schedule one-on-one doubt clearing sessions with mentors.",
  },
];
