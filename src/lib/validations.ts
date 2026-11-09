import { z } from "zod";

// Contact/General Enquiry Form Schema
export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
  courseInterested: z.string().optional(),
  education: z.string().optional(),
  learningGoals: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

// Corporate Enquiry Form Schema
export const corporateEnquirySchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must be less than 200 characters"),
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters")
    .max(100, "Contact person name must be less than 100 characters"),
  businessEmail: z
    .string()
    .email("Please enter a valid business email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number")
    .optional(),
  trainingRequirements: z
    .string()
    .min(20, "Please describe your training requirements in detail")
    .max(2000, "Training requirements must be less than 2000 characters"),
  participants: z
    .string()
    .min(1, "Please specify expected number of participants"),
  trainingFormat: z.enum(["online", "offline", "hybrid"]),
});

export type CorporateEnquiryFormData = z.infer<typeof corporateEnquirySchema>;

// Admin Login Schema
export const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

// Course Schema (for admin)
export const courseSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(500, "Description must be less than 500 characters"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  level: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
    "Beginner to Intermediate",
    "Beginner to Advanced",
  ]),
  duration: z.string().min(1, "Duration is required"),
  overview: z.string().min(100, "Overview must be at least 100 characters"),
  prerequisites: z.string().optional(),
  whoShouldEnroll: z.string().min(50, "Who should enroll must be at least 50 characters"),
  learningOutcomes: z.array(z.string()).min(3, "At least 3 learning outcomes are required"),
  isVisible: z.boolean().default(true),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Module Schema (for admin)
export const moduleSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  description: z.string().optional(),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
  order: z.number().int().positive(),
});

export type ModuleFormData = z.infer<typeof moduleSchema>;

// Article Schema (for admin)
export const articleSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must be less than 200 characters"),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z
    .string()
    .min(50, "Excerpt must be at least 50 characters")
    .max(300, "Excerpt must be less than 300 characters"),
  content: z.string().min(200, "Content must be at least 200 characters"),
  category: z.enum([
    "Artificial Intelligence",
    "Data Science",
    "Full Stack Development",
    "Python Programming",
    "Career Guidance",
    "Interview Preparation",
    "Learning Resources",
  ]),
  isPublished: z.boolean().default(false),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

// Testimonial Schema (for admin)
export const testimonialSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  role: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(100, "Role must be less than 100 characters"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(500, "Content must be less than 500 characters"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  isVisible: z.boolean().default(true),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

// Mentor Profile Schema (for admin)
export const mentorProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  designation: z
    .string()
    .min(5, "Designation must be at least 5 characters")
    .max(200, "Designation must be less than 200 characters"),
  bio: z
    .string()
    .min(100, "Bio must be at least 100 characters")
    .max(2000, "Bio must be less than 2000 characters"),
  skills: z.array(z.string()).min(3, "At least 3 skills are required"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
});

export type MentorProfileFormData = z.infer<typeof mentorProfileSchema>;

// Site Settings Schema (for admin)
export const siteSettingsSchema = z.object({
  contactEmail: z.string().email("Please enter a valid email address"),
  whatsappNumber: z
    .string()
    .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid WhatsApp number with country code"),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid GitHub URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Please enter a valid Twitter URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Please enter a valid Instagram URL").optional().or(z.literal("")),
  youtubeUrl: z.string().url("Please enter a valid YouTube URL").optional().or(z.literal("")),
});

export type SiteSettingsFormData = z.infer<typeof siteSettingsSchema>;

// Search Schema
export const searchSchema = z.object({
  query: z.string().min(2, "Search query must be at least 2 characters"),
  type: z.enum(["all", "courses", "articles"]).default("all"),
});

export type SearchFormData = z.infer<typeof searchSchema>;
