import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CurriculumAccordion } from "@/components/courses";
import { CourseSchema, BreadcrumbSchema } from "@/components/seo/SchemaMarkup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string) {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!course) return null;

  return {
    ...course,
    technologies: JSON.parse(course.technologies) as string[],
    learningOutcomes: JSON.parse(course.learningOutcomes) as string[],
    modules: course.modules.map((m) => ({
      ...m,
      topics: JSON.parse(m.topics) as string[],
    })),
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

// Use dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

const outcomeColors = [
  "#FFF6EC",  // Cream (primary light)
  "#FFC83D",  // Amber accent
];

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <PageWrapper>
      {/* SEO Schema */}
      <CourseSchema
        name={course.title}
        description={course.description}
        provider="Mahak Yadav"
        url={`https://mahaky15.vercel.app/courses/${course.slug}`}
        duration={course.duration}
        level={course.level}
        topics={course.technologies}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://mahaky15.vercel.app" },
          { name: "Courses", url: "https://mahaky15.vercel.app/courses" },
          { name: course.title, url: `https://mahaky15.vercel.app/courses/${course.slug}` },
        ]}
      />
      
      {/* Hero Section */}
      <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden">
        {/* Large background text */}
        <div
          aria-hidden="true"
          className="absolute right-[-40px] top-[40px] font-extrabold text-[#22160E] select-none pointer-events-none hidden lg:block"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(200px, 30vw, 520px)",
            lineHeight: 0.8,
            letterSpacing: "-24px",
          }}
        >
          {course.title.split(" ")[0]?.substring(0, 2).toUpperCase() || "AI"}
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-[#A89785] mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{course.title}</span>
          </nav>

          {/* Pills */}
          <div className="flex flex-wrap gap-3 mb-6">
            {course.slug === "aptitude-logical-reasoning" && (
              <span className="bg-green-500 text-white font-bold text-xs tracking-wider px-4 py-2 rounded-full animate-pulse">
                🎁 FREE COURSE
              </span>
            )}
            <span className="bg-[#FF6B1A] text-[#140D08] font-bold text-xs tracking-wider px-4 py-2 rounded-full">
              {course.level}
            </span>
            <span className="bg-[#22160E] text-[#C9B9A8] font-medium text-xs px-4 py-2 rounded-full border border-[#3A2A1D] flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {course.duration}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight mb-6 max-w-4xl"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-2px" }}
          >
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-[#C9B9A8] max-w-2xl mb-8">
            {course.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {course.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-[#140D08] text-[#FFF6EC] text-sm font-bold px-3 py-1 rounded-full border border-[#3A2A1D]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#FFF6EC] relative overflow-hidden">
        {/* Animated background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large morphing gradient blobs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF6B1A]/8 via-[#FF6B1A]/2 to-transparent rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] bg-gradient-to-tr from-[#FFC83D]/10 via-[#FFC83D]/3 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#FF6B1A]/3 via-transparent to-[#FFC83D]/3 rounded-full blur-3xl animate-gradient-move" />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-32 left-[3%] w-20 h-20 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-40 left-[5%] w-16 h-16 border-2 border-[#FFC83D]/12 rounded-full animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-[2%] w-12 h-12 border border-[#140D08]/5 rounded-xl -rotate-6 animate-float" style={{ animationDelay: "0.5s" }} />
          
          {/* Code-like decorative lines */}
          <div className="absolute top-60 left-[2%] w-24 h-2 bg-[#FF6B1A]/8 rounded-full" />
          <div className="absolute top-64 left-[2%] w-16 h-2 bg-[#FFC83D]/10 rounded-full" />
          <div className="absolute top-68 left-[2%] w-32 h-2 bg-[#140D08]/5 rounded-full" />
          
          {/* Subtle dots */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#FF6B1A]/20" />
          <div className="absolute top-1/3 left-1/5 w-3 h-3 rounded-full bg-[#FFC83D]/15" />
          <div className="absolute bottom-1/4 left-1/6 w-2 h-2 rounded-full bg-[#FF6B1A]/15" />
        </div>
        
        <div className="relative max-w-[1280px] mx-auto px-6">
          <div className="flex flex-wrap gap-8 items-start">
            {/* Main Content */}
            <main className="flex-[999_1_600px] min-w-0 flex flex-col gap-12">
              {/* Learning Outcomes */}
              <div>
                <h2
                  className="text-3xl font-extrabold text-[#140D08] mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  What you&apos;ll learn
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-[20px] border-[3px] border-[#140D08] hover:translate-y-[-2px] hover:translate-x-[-2px] transition-transform duration-200"
                      style={{
                        backgroundColor:
                          outcomeColors[index % outcomeColors.length],
                        boxShadow: "4px 4px 0 #140D08",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#140D08] flex items-center justify-center flex-shrink-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFF6EC"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        </span>
                        <span className="text-[#140D08] font-semibold text-sm leading-relaxed">
                          {outcome}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <h2
                  className="text-3xl font-extrabold text-[#140D08] mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Curriculum
                </h2>
                <div
                  className="bg-white rounded-[24px] border-[3px] border-[#140D08] overflow-hidden"
                  style={{ boxShadow: "6px 6px 0 #140D08" }}
                >
                  <CurriculumAccordion modules={course.modules} courseSlug={course.slug} />
                </div>
              </div>

              {/* Who Should Enroll */}
              <div>
                <h2
                  className="text-3xl font-extrabold text-[#140D08] mb-6"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Who should enroll?
                </h2>
                <div
                  className="bg-white rounded-[24px] p-6 border-[3px] border-[#140D08]"
                  style={{ boxShadow: "6px 6px 0 #FFC83D" }}
                >
                  <p className="text-[#4A3626] leading-relaxed">
                    {course.whoShouldEnroll}
                  </p>
                </div>
              </div>

              {/* Prerequisites */}
              {course.prerequisites && (
                <div>
                  <h2
                    className="text-3xl font-extrabold text-[#140D08] mb-6"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Prerequisites
                  </h2>
                  <div
                    className="bg-white rounded-[24px] p-6 border-[3px] border-[#140D08]"
                    style={{ boxShadow: "6px 6px 0 #FFC83D" }}
                  >
                    <p className="text-[#4A3626] leading-relaxed">
                      {course.prerequisites}
                    </p>
                  </div>
                </div>
              )}
            </main>

            {/* Sidebar */}
            <aside
              id="enroll"
              className="flex-[1_1_340px] max-w-[400px] min-w-0 mt-[-120px] relative z-10 bg-white rounded-[32px] p-6 border-[3px] border-[#140D08] sticky top-6 self-start"
              style={{ boxShadow: "8px 8px 0 #140D08" }}
            >
              <div className="space-y-6">
                {/* Course Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B1A] flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#140D08"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B5847]">Duration</p>
                      <p className="font-bold text-[#140D08]">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B1A]/20 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6B1A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B5847]">Level</p>
                      <p className="font-bold text-[#140D08]">{course.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B1A]/20 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF6B1A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-[#6B5847]">Modules</p>
                      <p className="font-bold text-[#140D08]">
                        {course.modules.length} modules
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-dashed border-[#E3CDB4]" />

                {/* CTA */}
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-[#FF6B1A] text-[#140D08] font-extrabold px-6 py-4 rounded-full hover:scale-105 transition-transform"
                  >
                    Enroll Now
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
                  <a
                    href="https://wa.me/919817748915?text=Hi%20Mahak!%20I'm%20interested%20in%20the%20course"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-4 rounded-full hover:scale-105 transition-transform"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
                
                {/* Direct Contact */}
                <div className="bg-[#140D08] rounded-xl p-4 text-center">
                  <p className="text-[#A89785] text-xs mb-2">Have questions? Reach out directly</p>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+919817748915" className="text-[#FFF6EC] font-bold text-sm hover:text-[#FF6B1A] transition-colors">
                      📞 +91 98177 48915
                    </a>
                    <a href="mailto:ymahaky@gmail.com" className="text-[#FFF6EC] font-bold text-sm hover:text-[#FF6B1A] transition-colors">
                      ✉️ ymahaky@gmail.com
                    </a>
                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-[#A89785] text-center">
                  Duration is indicative and may vary based on your pace.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
