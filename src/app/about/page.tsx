import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  AnimatedSkillsSection,
  AnimatedExperienceSection,
} from "@/components/about/AnimatedSections";
import { PersonSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

// Use dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mahak Yadav - Program Head, Technical Trainer, and Full-Stack Developer with experience training 400+ students.",
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
    }>,
    certifications: JSON.parse(mentor.certifications) as string[],
    trainingPrograms: JSON.parse(mentor.trainingPrograms) as string[],
  };
}

const stats = [
  { value: "400+", label: "Students Trained" },
  { value: "5+", label: "Organizations" },
  { value: "10+", label: "Courses Created" },
  { value: "100%", label: "Placement Focus" },
];

export default async function AboutPage() {
  const mentor = await getMentorProfile();

  return (
    <PageWrapper>
      {/* SEO Schema */}
      <PersonSchema
        name={mentor?.name || "Mahak Yadav"}
        jobTitle={mentor?.designation || "Tech Mentor & Trainer"}
        description="Program Head, Technical Trainer, and Full-Stack Developer with experience training 400+ students in AI/ML, Data Science, and Full-Stack Development."
        image="https://mahaky15.vercel.app/images/mahak-yadav.jpg"
        url="https://mahaky15.vercel.app/about"
        sameAs={[
          "https://www.linkedin.com/in/mahak-42675a39b/",
          "https://github.com/ymahak",
        ]}
        knowsAbout={["Python", "AI/ML", "Data Science", "Full-Stack Development", "React", "Node.js", "Power BI"]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://mahaky15.vercel.app" },
          { name: "About", url: "https://mahaky15.vercel.app/about" },
        ]}
      />
      
      {/* Hero Section */}
      <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large gradient orbs */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#FF6B1A]/20 via-[#FF6B1A]/5 to-transparent blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFC83D]/15 via-[#FFC83D]/5 to-transparent blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
          
          {/* Floating shapes */}
          <div className="absolute top-1/4 right-[5%] w-20 h-20 rounded-2xl border-2 border-[#FF6B1A]/20 rotate-12 animate-float" />
          <div className="absolute bottom-1/3 left-[3%] w-16 h-16 rounded-full border-2 border-[#FFC83D]/20 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-[15%] w-12 h-12 rounded-xl border border-[#FF6B1A]/15 -rotate-6 animate-float" style={{ animationDelay: "0.5s" }} />
          
          {/* Glowing dots */}
          <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-[#FF6B1A] shadow-[0_0_20px_rgba(255,107,26,0.5)] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 rounded-full bg-[#FFC83D] shadow-[0_0_25px_rgba(255,200,61,0.5)] animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#22160E 1px, transparent 1px), linear-gradient(90deg, #22160E 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6">
          {/* Breadcrumb */}
          <div className="pt-8">
            <nav className="text-sm text-[#A89785]">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">About</span>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center py-14 md:py-20">
            <div className="flex flex-col gap-6">
              <span className="self-start bg-[#FF6B1A] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full">
                MEET YOUR MENTOR
              </span>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  letterSpacing: "-3px",
                }}
              >
                Hi, I&apos;m{" "}
                <span className="text-[#FF6B1A]">
                  {mentor?.name || "Mahak Yadav"}
                </span>
              </h1>

              <p className="text-xl text-[#C9B9A8] max-w-[540px] leading-relaxed">
                {mentor?.designation ||
                  "Program Head | Technical Trainer | Full-Stack Developer"}
              </p>

              <p className="text-[#A89785] max-w-[540px] leading-relaxed">
                {mentor?.bio?.split("\n\n")[0] ||
                  "A passionate educator and developer who believes in learning by doing. I've trained 400+ students in AI/ML, Data Science, and Full-Stack Development."}
              </p>

              <div className="flex items-center gap-4 mt-2">
                <Link
                  href="/contact"
                  className="bg-[#FF6B1A] text-[#140D08] font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                >
                  Let&apos;s Connect
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                {mentor?.linkedinUrl && (
                  <a
                    href={mentor.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#22160E] border border-[#3A2A1D] flex items-center justify-center text-[#A89785] hover:text-[#FF6B1A] hover:border-[#FF6B1A] transition-all"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {mentor?.githubUrl && (
                  <a
                    href={mentor.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#22160E] border border-[#3A2A1D] flex items-center justify-center text-[#A89785] hover:text-[#FF6B1A] hover:border-[#FF6B1A] transition-all"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative w-[400px] h-[500px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#FFF6EC]">
                <Image
                  src="/images/mahak-yadav.jpg"
                  alt="Mahak Yadav - Technical Trainer"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-[#FFF6EC] text-[#140D08] shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#FF6B1A] flex items-center justify-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#140D08"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <div
                      className="text-3xl font-extrabold"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      400+
                    </div>
                    <div className="text-sm text-[#6B5847]">
                      Students Trained
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Marquee */}
      <section className="bg-[#FFC83D] border-y-[3px] border-[#140D08] py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 20s linear infinite" }}>
          {/* Duplicate stats for seamless loop */}
          {[...stats, ...stats, ...stats, ...stats].map((stat, index) => (
            <div key={index} className="flex items-center mx-6 md:mx-10">
              <span
                className="text-2xl md:text-3xl font-extrabold text-[#140D08]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-[#4A3626] ml-2">{stat.label}</span>
              <span className="mx-6 md:mx-10 text-[#140D08]/20 text-xl">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* Training Gallery */}
      <section className="py-10 bg-[#FFF6EC] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gradient-to-bl from-[#FF6B1A]/8 via-[#FF6B1A]/2 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-gradient-to-tr from-[#FFC83D]/10 via-[#FFC83D]/3 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-[8%] w-16 h-16 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-20 right-[10%] w-12 h-12 border-2 border-[#FFC83D]/12 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[#140D08] mb-8 text-center"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1.5px" }}
          >
            Training in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div
              className="relative h-[300px] rounded-[24px] overflow-hidden border-[3px] border-[#140D08]"
              style={{ boxShadow: "6px 6px 0 #140D08" }}
            >
              <Image
                src="/images/training-banner.jpg"
                alt="Live classroom training session"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D08]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="bg-[#FF6B1A] text-[#140D08] text-xs font-bold px-3 py-1 rounded-full">
                  LIVE SESSIONS
                </span>
                <h3 className="text-white text-xl font-bold mt-2">Interactive Classroom Training</h3>
                <p className="text-[#C9B9A8] text-sm mt-1">Engaging sessions with real-time doubt clearing</p>
              </div>
            </div>
            <div
              className="relative h-[300px] rounded-[24px] overflow-hidden border-[3px] border-[#140D08]"
              style={{ boxShadow: "6px 6px 0 #FF6B1A" }}
            >
              <Image
                src="/images/coding-workspace.jpg"
                alt="Hands-on coding workspace"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D08]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="bg-[#FFC83D] text-[#140D08] text-xs font-bold px-3 py-1 rounded-full">
                  HANDS-ON
                </span>
                <h3 className="text-white text-xl font-bold mt-2">Real-World Coding Practice</h3>
                <p className="text-[#C9B9A8] text-sm mt-1">Learn by building actual projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <AnimatedSkillsSection />

      {/* What I Bring Section - Image Cards */}
      <section className="py-10 bg-[#FFF6EC] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gradient-to-bl from-[#FF6B1A]/10 via-[#FF6B1A]/3 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-gradient-to-tr from-[#FFC83D]/12 via-[#FFC83D]/4 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#FFC83D] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-4">
              WHY ME
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#140D08]"
              style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1.5px" }}
            >
              What I Bring to the Table
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1 - Mentorship */}
            <div
              className="relative h-[280px] rounded-[24px] overflow-hidden border-[3px] border-[#140D08] group"
              style={{ boxShadow: "6px 6px 0 #140D08" }}
            >
              <div 
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-[#140D08]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B1A] flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold">1:1 Mentorship</h3>
                <p className="text-[#A89785] text-sm mt-1">Personalized guidance for your career goals</p>
              </div>
            </div>

            {/* Card 2 - Project Based */}
            <div
              className="relative h-[280px] rounded-[24px] overflow-hidden border-[3px] border-[#140D08] group"
              style={{ boxShadow: "6px 6px 0 #FF6B1A" }}
            >
              <div 
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-[#140D08]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="w-12 h-12 rounded-xl bg-[#FFC83D] flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2">
                    <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold">Project-Based Learning</h3>
                <p className="text-[#A89785] text-sm mt-1">Build real projects, not just tutorials</p>
              </div>
            </div>

            {/* Card 3 - Industry Ready */}
            <div
              className="relative h-[280px] rounded-[24px] overflow-hidden border-[3px] border-[#140D08] group"
              style={{ boxShadow: "6px 6px 0 #FFC83D" }}
            >
              <div 
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-[#140D08]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B1A] flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2">
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold">Industry Preparation</h3>
                <p className="text-[#A89785] text-sm mt-1">Interview prep & placement support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {mentor?.experience && (
        <AnimatedExperienceSection experience={mentor.experience} />
      )}

      {/* Courses Created */}
      {mentor?.trainingPrograms && (
        <section className="py-10 bg-[#FFF6EC] relative">
          <div className="relative max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-[#FF6B1A] text-white font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-5">
                CURRICULUM
              </span>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#140D08]"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  letterSpacing: "-2px",
                }}
              >
                Courses Created
              </h2>
            </div>
            
            {/* Course tags - Row 1 */}
            <div className="flex flex-wrap justify-center gap-3 mb-3">
              {mentor.trainingPrograms.slice(0, 5).map((program, index) => {
                const colors = ["#FF6B1A", "#FFC83D", "#140D08", "#FF6B1A", "#FFC83D"];
                const textColors = ["#FFF6EC", "#140D08", "#FFF6EC", "#FFF6EC", "#140D08"];
                const bgColor = colors[index % colors.length];
                const textColor = textColors[index % textColors.length];
                
                return (
                  <span
                    key={program}
                    className="relative overflow-hidden border-2 border-[#140D08]/20 font-semibold text-sm px-5 py-2.5 rounded-full cursor-default group transition-all duration-300 hover:scale-105 hover:shadow-md"
                    style={{
                      backgroundColor: bgColor,
                      color: textColor,
                    }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="relative">{program}</span>
                  </span>
                );
              })}
            </div>
            
            {/* Course tags - Row 2 */}
            <div className="flex flex-wrap justify-center gap-3 mb-3">
              {mentor.trainingPrograms.slice(5, 10).map((program, index) => {
                const colors = ["#140D08", "#FF6B1A", "#FFC83D", "#140D08", "#FF6B1A"];
                const textColors = ["#FFF6EC", "#FFF6EC", "#140D08", "#FFF6EC", "#FFF6EC"];
                const bgColor = colors[index % colors.length];
                const textColor = textColors[index % textColors.length];
                
                return (
                  <span
                    key={program}
                    className="relative overflow-hidden border-2 border-[#140D08]/20 font-semibold text-sm px-5 py-2.5 rounded-full cursor-default group transition-all duration-300 hover:scale-105 hover:shadow-md"
                    style={{
                      backgroundColor: bgColor,
                      color: textColor,
                    }}
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <span className="relative">{program}</span>
                  </span>
                );
              })}
            </div>
            
            {/* Course tags - Row 3 (if more than 10) */}
            {mentor.trainingPrograms.length > 10 && (
              <div className="flex flex-wrap justify-center gap-3">
                {mentor.trainingPrograms.slice(10).map((program, index) => {
                  const colors = ["#FFC83D", "#140D08", "#FF6B1A"];
                  const textColors = ["#140D08", "#FFF6EC", "#FFF6EC"];
                  const bgColor = colors[index % colors.length];
                  const textColor = textColors[index % textColors.length];
                  
                  return (
                    <span
                      key={program}
                      className="relative overflow-hidden border-2 border-[#140D08]/20 font-semibold text-sm px-5 py-2.5 rounded-full cursor-default group transition-all duration-300 hover:scale-105 hover:shadow-md"
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                      }}
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <span className="relative">{program}</span>
                    </span>
                  );
                })}
              </div>
            )}
            
            {/* Stats below */}
            <div className="flex justify-center items-center gap-12 mt-14">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-[#FF6B1A]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  {mentor.trainingPrograms.length}+
                </div>
                <div className="text-sm text-[#6B5B4F] mt-1">Unique Courses</div>
              </div>
              <div className="w-px h-12 bg-[#140D08]/20" />
              <div className="text-center">
                <div className="text-4xl font-extrabold text-[#FFC83D]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                  400+
                </div>
                <div className="text-sm text-[#6B5B4F] mt-1">Students Enrolled</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {mentor?.education && (
        <section className="py-10 bg-[#FFF6EC] relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#FFC83D]/8 via-transparent to-[#FF6B1A]/8 rounded-full blur-3xl animate-pulse-slow" />
            
            {/* Floating rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-[#FF6B1A]/8 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-[#FFC83D]/8 rounded-full animate-spin-slow-reverse" />
          </div>
          
          <div className="relative max-w-[1280px] mx-auto px-6">
            <div
              className="bg-white rounded-[28px] p-7 border-[3px] border-[#140D08] max-w-2xl mx-auto"
              style={{ boxShadow: "6px 6px 0 #FF6B1A" }}
            >
              <h2
                className="text-2xl font-extrabold text-[#140D08] mb-6 flex items-center gap-3"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF6B1A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                Education
              </h2>
              <div className="space-y-4">
                {mentor.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-[#FF6B1A] pl-4">
                    <h3 className="font-bold text-[#140D08]">{edu.degree}</h3>
                    <p className="text-[#6B5847]">{edu.institution}</p>
                    <p className="text-sm text-[#A89785]">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* My Teaching Philosophy - Image Section */}
      <section className="py-10 bg-[#FFF6EC] relative overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative h-[200px] rounded-[20px] overflow-hidden border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div
                className="relative h-[200px] rounded-[20px] overflow-hidden border-[3px] border-[#140D08] mt-8"
                style={{ boxShadow: "4px 4px 0 #FF6B1A" }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div
                className="relative h-[200px] rounded-[20px] overflow-hidden border-[3px] border-[#140D08] -mt-8"
                style={{ boxShadow: "4px 4px 0 #FFC83D" }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
              <div
                className="relative h-[200px] rounded-[20px] overflow-hidden border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block bg-[#FFC83D] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-4">
                MY APPROACH
              </span>
              <h2
                className="text-3xl md:text-4xl font-extrabold text-[#140D08] mb-6"
                style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1.5px" }}
              >
                Learning by Doing, Growing Together
              </h2>
              <div className="space-y-4 text-[#4A3626]">
                <p>
                  I believe the best way to learn tech is by building real things. Every concept I teach comes with hands-on projects that you can add to your portfolio.
                </p>
                <p>
                  My sessions are interactive, doubt-friendly, and focused on making you job-ready. No passive watching – you code along, ask questions, and grow.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="bg-white border-2 border-[#140D08] text-[#140D08] font-medium text-sm px-4 py-2 rounded-full">
                  Interactive Sessions
                </span>
                <span className="bg-white border-2 border-[#140D08] text-[#140D08] font-medium text-sm px-4 py-2 rounded-full">
                  Portfolio Projects
                </span>
                <span className="bg-white border-2 border-[#140D08] text-[#140D08] font-medium text-sm px-4 py-2 rounded-full">
                  Career Guidance
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-[#FFF6EC] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF6B1A]/10 via-[#FF6B1A]/3 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFC83D]/12 via-[#FFC83D]/4 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-[5%] w-20 h-20 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-20 right-[5%] w-16 h-16 border-2 border-[#FFC83D]/12 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-[10%] w-12 h-12 border border-[#140D08]/5 rounded-xl -rotate-6 animate-float" style={{ animationDelay: "0.5s" }} />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6">
          <div
            className="rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden border-[3px] border-[#140D08]"
            style={{ boxShadow: "8px 8px 0 #140D08" }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Orange overlay */}
            <div className="absolute inset-0 bg-[#FF6B1A]/90" />
            
            <h2
              className="relative text-3xl md:text-4xl font-extrabold text-[#140D08] mb-4"
              style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1px" }}
            >
              Ready to Start Learning?
            </h2>
            <p className="relative text-[#4A3626] mb-8 max-w-xl mx-auto">
              Join me on a journey to build practical, industry-relevant skills
              through hands-on projects and personalized mentorship.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <Link
                href="/courses"
                className="bg-[#140D08] text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
              >
                Explore Courses
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="bg-white text-[#140D08] font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
