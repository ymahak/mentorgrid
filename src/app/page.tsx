import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { HomeHero } from "@/components/home/HomeHero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { FindYourPath } from "@/components/home/FindYourPath";
import { WhyMentor } from "@/components/home/WhyMentor";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HomeFooter } from "@/components/home/HomeFooter";
import { CodeComparison } from "@/components/home/CodeComparison";
import { FreeResourcesPopup } from "@/components/home/FreeResourcesPopup";
import { WebsiteSchema, EducationalOrganizationSchema } from "@/components/seo/SchemaMarkup";

// Use dynamic rendering to avoid build-time database queries
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Mahak Yadav | Tech Mentor & Trainer",
  description:
    "1:1 and small-batch training in AI/ML, Data Science and Full-Stack Development. Learn by building real projects, at your pace, with a mentor who knows your goal.",
  keywords: [
    "tech mentor",
    "AI ML training",
    "data science course",
    "full stack development",
    "personalized training",
    "career mentorship",
    "python course",
    "react training",
  ],
  openGraph: {
    title: "Mahak Yadav | Tech Mentor & Trainer",
    description:
      "1:1 and small-batch training in AI/ML, Data Science and Full-Stack Development. Learn by building real projects.",
    type: "website",
  },
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

async function getTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
    take: 3,
  });
  return testimonials;
}

export default async function HomePage() {
  const [courses, testimonials] = await Promise.all([
    getCourses(),
    getTestimonials(),
  ]);

  return (
    <div
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      className="bg-[#FFF6EC] text-[#140D08] min-h-screen overflow-x-hidden"
    >
      {/* SEO Schema Markup */}
      <WebsiteSchema
        name="Mahak Yadav - Tech Mentor & Trainer"
        description="1:1 and small-batch training in AI/ML, Data Science and Full-Stack Development. Learn by building real projects."
        url="https://mahakyadav.vercel.app"
      />
      <EducationalOrganizationSchema />
      
      <AnnouncementBanner />
      <HomeHero />
      <TechMarquee />
      <FindYourPath />
      <CodeComparison />
      <WhyMentor />
      <ProgramsSection courses={courses} />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCTA />
      <HomeFooter />
      
      {/* Floating Elements */}
      <FreeResourcesPopup />
    </div>
  );
}
