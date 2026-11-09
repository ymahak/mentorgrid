import { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { programTypes } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our specialized training programs for college students, fresh graduates, working professionals, and corporate teams.",
};

const programColors = ["#FF6B1A", "#FFC83D", "#FF6B1A", "#FFC83D", "#FF6B1A", "#FFC83D"];

const iconPaths: Record<string, string> = {
  GraduationCap: "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5",
  Briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  TrendingUp: "M23 6l-9.5 9.5-5-5L1 18",
  Users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  Building2: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2 M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2 M10 6h4 M10 10h4 M10 14h4 M10 18h4",
  Calendar: "M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",
};

export default function ProgramsPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#22160E 1px, transparent 1px), linear-gradient(90deg, #22160E 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 py-20">
          <nav className="text-sm text-[#A89785] mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Programs</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-[#FF6B1A] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-6">
              SPECIALIZED TRAINING
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-3px" }}
            >
              Training{" "}
              <span className="text-[#FF6B1A]">Programs</span>
            </h1>
            <p className="text-xl text-[#C9B9A8] max-w-[600px]">
              Specialized programs designed for different learning needs and
              career stages.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-[#FFF6EC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programTypes.map((program, index) => (
              <article
                key={program.id}
                className="p-6 rounded-[28px] border-[3px] border-[#140D08] flex flex-col hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform"
                style={{
                  backgroundColor: programColors[index % programColors.length],
                  boxShadow: "6px 6px 0 #140D08",
                }}
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-[#140D08] flex items-center justify-center mb-6">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFF6EC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={iconPaths[program.icon] || iconPaths.Users} />
                  </svg>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-extrabold text-[#140D08] mb-3"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-[#4A3626] text-sm leading-relaxed mb-6 flex-grow">
                  {program.description}
                </p>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="w-full px-4 py-3 rounded-full bg-[#140D08] text-[#FFF6EC] font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  Enquire Now
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
              </article>
            ))}
          </div>

          {/* Custom Programs CTA */}
          <div className="mt-16">
            <div
              className="max-w-3xl mx-auto p-8 md:p-12 rounded-[32px] bg-[#140D08] text-[#FFF6EC] text-center border-[3px] border-[#140D08] relative overflow-hidden"
              style={{ boxShadow: "8px 8px 0 #FF6B1A" }}
            >
              {/* Decorative elements */}
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#FF6B1A] opacity-20"
              />
              <div
                aria-hidden="true"
                className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-[#FFC83D] opacity-20"
              />

              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF6B1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3
                  className="text-3xl md:text-4xl font-extrabold mb-4"
                  style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1px" }}
                >
                  Need a Custom Program?
                </h3>
                <p className="text-[#C9B9A8] mb-8 max-w-xl mx-auto">
                  We can design a tailored training program based on your
                  specific requirements, timeline, and learning objectives.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FF6B1A] text-[#140D08] font-extrabold hover:scale-105 transition-transform"
                >
                  Discuss Your Requirements
                  <svg
                    width="20"
                    height="20"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
