import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Award, 
  BookOpen,
  Users,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/ui/SectionHeading";

// Use dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Meet Your Mentor",
  description: "Learn from Mahak Yadav - Program Head, Technical Trainer, and Full-Stack Developer with experience training 400+ students.",
};

async function getMentorProfile() {
  const mentor = await prisma.mentorProfile.findFirst();
  if (!mentor) return null;

  return {
    ...mentor,
    skills: JSON.parse(mentor.skills) as string[],
    experience: JSON.parse(mentor.experience) as Array<{
      title: string;
      company: string;
      location?: string;
      period: string;
      type?: string;
      description: string[];
      isCurrent?: boolean;
    }>,
    education: JSON.parse(mentor.education) as Array<{
      degree: string;
      institution: string;
      period: string;
      grade?: string;
    }>,
    certifications: JSON.parse(mentor.certifications) as string[],
    trainingPrograms: JSON.parse(mentor.trainingPrograms) as string[],
  };
}

// LinkedIn Icon SVG
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// GitHub Icon SVG
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Stats data
const stats = [
  { value: "400+", label: "Students Trained", icon: Users },
  { value: "5+", label: "Organizations", icon: Building2 },
  { value: "10+", label: "Courses Created", icon: BookOpen },
  { value: "100%", label: "Placement Focus", icon: CheckCircle2 },
];

// Skill categories
const skillCategories = {
  "Programming Languages": ["Python", "JavaScript", "TypeScript", "C/C++", "SQL"],
  "Web Technologies": ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "HTML5/CSS3", "Tailwind CSS"],
  "AI/ML & Generative AI": ["ChatGPT", "Claude", "Gemini", "GitHub Copilot", "Cursor"],
  "Developer Tools": ["VS Code", "Git/GitHub", "Docker", "Firebase", "Power BI", "Figma"],
};

export default async function MentorPage() {
  const mentor = await getMentorProfile();

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <p className="text-gray-500">Mentor profile not found.</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Meet Your Mentor"
        description="A passionate educator and developer who believes in learning by doing."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Meet Your Mentor" },
        ]}
      />

      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
                <Image
                  src="/images/mahak-yadav.jpg"
                  alt="Mahak Yadav - Technical Trainer"
                  width={600}
                  height={700}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-100 text-sm font-medium backdrop-blur-sm">
                      Available for Training & Mentorship
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-200 shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">400+</div>
                    <div className="text-sm text-gray-500">Students Trained</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 p-3 rounded-xl bg-white/90 backdrop-blur-xl border border-amber-200 shadow-lg hidden md:block">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-amber-500" />
                  <span className="text-sm font-medium text-gray-800">2+ Years Training</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium mb-6">
                <Sparkles size={16} className="text-amber-500" />
                Program Head & Technical Trainer
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  {mentor.name}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {mentor.designation}
              </p>

              <div className="prose max-w-none mb-8">
                {mentor.bio.split("\n\n").slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-white border border-amber-100 shadow-sm">
                    <stat.icon size={24} className="text-amber-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Social Links & CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact">
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all flex items-center gap-2">
                    Let&apos;s Connect
                    <ArrowRight size={18} />
                  </button>
                </Link>
                {mentor.linkedinUrl && (
                  <a
                    href={mentor.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:border-amber-300 transition-all"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                )}
                {mentor.githubUrl && (
                  <a
                    href={mentor.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white border border-amber-200 flex items-center justify-center text-gray-500 hover:text-amber-600 hover:border-amber-300 transition-all"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium mb-4">
                <Award size={16} className="text-amber-500" />
                Technical Skills
              </span>
              <h2 className="text-3xl font-bold text-gray-800">A Comprehensive Toolkit</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <div key={category} className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-xl hover:shadow-amber-100/50 transition-all">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{category}</h3>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-amber-500" />
                        <span className="text-gray-600 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium mb-4">
                <Briefcase size={16} className="text-amber-500" />
                My Journey
              </span>
              <h2 className="text-3xl font-bold text-gray-800">Training Experience</h2>
              <p className="text-gray-600 mt-2">Building careers through technical training and software development</p>
            </div>

            <div className="space-y-6">
              {mentor.experience.map((exp, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">Current</span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                        <span className="text-amber-600 font-medium">{exp.company}</span>
                        {exp.type && (
                          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">{exp.type}</span>
                        )}
                        {exp.location && (
                          <span className="flex items-center gap-1 text-gray-500">
                            <MapPin size={14} />
                            {exp.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-gray-500">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Created Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium mb-4">
                <BookOpen size={16} className="text-amber-500" />
                Courses Created
              </span>
              <h2 className="text-3xl font-bold text-gray-800">Training Programs Designed</h2>
              <p className="text-gray-600 mt-2">Comprehensive programs to create industry-ready professionals</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {mentor.trainingPrograms.map((program) => (
                <div
                  key={program}
                  className="px-5 py-3 rounded-xl bg-white border border-amber-200 text-gray-800 font-medium hover:bg-amber-50 hover:border-amber-300 transition-all cursor-default"
                >
                  {program}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <GraduationCap size={24} className="text-amber-500" />
              Education
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {mentor.education.map((edu, index) => (
                <div key={index} className="p-4 rounded-xl bg-white border border-amber-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500 mt-1">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-500 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h3>
              <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
                Join me on a journey to build practical, industry-relevant skills through hands-on projects and personalized mentorship. Let&apos;s build something amazing together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/courses">
                  <button className="px-8 py-4 rounded-full bg-white text-amber-600 font-semibold shadow-lg hover:shadow-xl hover:bg-amber-50 transition-all flex items-center gap-2">
                    Explore Courses
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold hover:bg-white/30 transition-all">
                    Get in Touch
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
