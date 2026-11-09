import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { programTypes } from "@/lib/constants";
import {
  AnimatedCourseCard,
  AnimatedProgramCard,
  AnimatedSectionTitle,
} from "@/components/courses/AnimatedCoursesPage";

// Use dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Courses & Programs",
  description:
    "Explore our comprehensive courses and programs in Full Stack Development, Data Science, AI/ML, Python, and more. Learn industry-relevant skills with hands-on projects.",
};

async function getCourses() {
  const courses = await prisma.course.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      technologies: true,
      level: true,
      duration: true,
    },
  });

  return courses.map((course) => ({
    ...course,
    technologies: JSON.parse(course.technologies) as string[],
  }));
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden min-h-[60vh] flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large gradient orbs - animated */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FF6B1A]/20 via-[#FF6B1A]/10 to-transparent blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FFC83D]/15 via-[#FFC83D]/5 to-transparent blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#FF6B1A]/10 to-[#FFC83D]/10 blur-3xl animate-gradient-move" />
          
          {/* Spinning circles */}
          <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full border-2 border-[#FF6B1A]/20 animate-spin-slow" />
          <div className="absolute top-32 right-32 w-[200px] h-[200px] rounded-full border border-[#FFC83D]/15 animate-spin-slow-reverse" />
          <div className="absolute bottom-20 left-20 w-[250px] h-[250px] rounded-full border-2 border-[#FFC83D]/20 animate-spin-slow-reverse" />
          <div className="absolute top-1/2 left-10 w-[150px] h-[150px] rounded-full border border-[#FF6B1A]/15 animate-spin-slow" style={{ animationDelay: "-3s" }} />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-[15%] w-8 h-8 border-2 border-[#FF6B1A]/30 rounded-lg rotate-45 animate-float" />
          <div className="absolute top-1/3 left-[8%] w-6 h-6 bg-[#FF6B1A]/20 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/4 left-[25%] w-10 h-10 border-2 border-[#FFC83D]/25 rounded-xl -rotate-12 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-[60%] left-[5%] w-4 h-4 bg-[#FFC83D]/30 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
          
          {/* Floating dots with glow */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[#FF6B1A] shadow-[0_0_20px_rgba(255,107,26,0.6)] animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-[#FFC83D] shadow-[0_0_15px_rgba(255,200,61,0.5)] animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/4 right-1/4 w-4 h-4 rounded-full bg-[#FF6B1A]/80 shadow-[0_0_25px_rgba(255,107,26,0.5)] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-[#FFC83D] shadow-[0_0_15px_rgba(255,200,61,0.6)] animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-[20%] left-[40%] w-2 h-2 rounded-full bg-[#FF6B1A] shadow-[0_0_12px_rgba(255,107,26,0.5)] animate-pulse" style={{ animationDelay: "2s" }} />
          
          {/* Moving lines */}
          <div className="absolute top-[30%] left-0 w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[#FF6B1A]/30 to-transparent animate-float" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-[50%] left-[10%] w-[150px] h-[2px] bg-gradient-to-r from-transparent via-[#FFC83D]/25 to-transparent animate-float" style={{ animationDelay: "0.8s" }} />
          <div className="absolute top-[70%] left-[5%] w-[180px] h-[2px] bg-gradient-to-r from-transparent via-[#FF6B1A]/20 to-transparent animate-float" style={{ animationDelay: "1.3s" }} />
        </div>

        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#22160E 1px, transparent 1px), linear-gradient(90deg, #22160E 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 py-20 w-full">
          <nav className="text-sm text-[#A89785] mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Courses & Programs</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block bg-[#FF6B1A] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-6">
                LEARN BY BUILDING
              </span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-3px" }}
              >
                Courses &{" "}
                <span className="text-[#FF6B1A] inline-block hover:rotate-2 transition-transform cursor-default">
                  Programs
                </span>
              </h1>
              <p className="text-xl text-[#C9B9A8] max-w-[600px]">
                Comprehensive courses and training programs designed to take you from beginner to
                industry-ready professional with hands-on projects and expert guidance.
              </p>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block relative">
              <div 
                className="relative w-full h-[400px] rounded-[32px] overflow-hidden border-[3px] border-[#3A2A1D]"
                style={{ boxShadow: "12px 12px 0 #FF6B1A" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=90"
                  alt="Students learning together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140D08]/40 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div 
                className="absolute -bottom-4 -left-4 bg-[#FFC83D] text-[#140D08] px-5 py-3 rounded-2xl border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-inter), sans-serif" }}>6+</div>
                <div className="text-xs font-bold">Courses</div>
              </div>
              
              {/* Floating badge 2 */}
              <div 
                className="absolute -top-4 -right-4 bg-[#FF6B1A] text-[#140D08] px-5 py-3 rounded-2xl border-[3px] border-[#140D08]"
                style={{ boxShadow: "4px 4px 0 #140D08" }}
              >
                <div className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-inter), sans-serif" }}>400+</div>
                <div className="text-xs font-bold">Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-[#FFF6EC] relative overflow-hidden">
        {/* Animated background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large morphing blobs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF6B1A]/8 via-[#FF6B1A]/3 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFC83D]/10 via-[#FFC83D]/3 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#FF6B1A]/3 via-transparent to-[#FFC83D]/3 rounded-full blur-3xl animate-morph" />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-[10%] w-20 h-20 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute top-40 right-[15%] w-16 h-16 border-2 border-[#FFC83D]/15 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-32 left-[20%] w-12 h-12 border border-[#140D08]/5 rounded-xl -rotate-6 animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-20 right-[8%] w-24 h-24 border-2 border-[#FF6B1A]/8 rounded-3xl rotate-45 animate-float" style={{ animationDelay: "0.5s" }} />
          
          {/* Subtle dots pattern */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#FF6B1A]/20" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-[#FFC83D]/15" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-[#FF6B1A]/15" />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-[#FFC83D]/20" />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6">
          <AnimatedSectionTitle>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#140D08] mb-10"
              style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1.5px" }}
            >
              Courses
            </h2>
          </AnimatedSectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <AnimatedCourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-[#140D08] text-[#FFF6EC] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Spotlight effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#FF6B1A]/8 blur-3xl animate-pulse-glow" />
          
          {/* Gradient orbs */}
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[#FF6B1A]/15 to-transparent blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#FFC83D]/10 to-transparent blur-3xl" />
          
          {/* Floating elements */}
          <div className="absolute top-1/4 right-10 w-20 h-20 rounded-2xl border border-[#FF6B1A]/20 rotate-12 animate-float" />
          <div className="absolute bottom-1/4 left-10 w-16 h-16 rounded-full border border-[#FFC83D]/20 animate-float" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6">
          <AnimatedSectionTitle>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-10"
              style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1.5px" }}
            >
              Training Programs
            </h2>
          </AnimatedSectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programTypes.map((program, index) => (
              <AnimatedProgramCard key={program.id} program={program} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FFF6EC] relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Central glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-[#FF6B1A]/5 via-[#FFC83D]/8 to-[#FF6B1A]/5 blur-3xl animate-pulse-slow" />
          
          {/* Floating rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#FF6B1A]/10 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-[#FFC83D]/10 rounded-full animate-spin-slow-reverse" />
          
          {/* Corner decorations */}
          <div className="absolute top-10 left-10 w-16 h-16 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-[#FFC83D]/10 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-6 text-[#140D08]"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-2px" }}
          >
            Not sure which to pick?
          </h2>
          <p className="text-[#6B5847] text-lg mb-8 max-w-xl mx-auto">
            Book a free consultation call and let&apos;s figure out the best
            learning path for your goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6B1A] text-[#140D08] font-extrabold px-8 py-4 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 border-[3px] border-[#140D08] group"
            style={{ boxShadow: "4px 4px 0 #140D08" }}
          >
            Book a Free Call
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
