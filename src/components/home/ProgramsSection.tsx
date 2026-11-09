"use client";

import Link from "next/link";
import Image from "next/image";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  duration: string;
}

interface ProgramsSectionProps {
  courses: Course[];
}

const programCards = [
  {
    n: "01",
    tag: "POPULAR",
    title: "AI/ML & Data Science",
    desc: "Python, data analysis and machine learning, taught through projects on real datasets.",
    chips: ["Python", "AI/ML", "Data Science"],
    bg: "#FF6B1A",
    fg: "#140D08",
    tagBg: "#140D08",
    tagFg: "#FFF6EC",
    chipBorder: "rgba(20,13,8,0.35)",
    btnBg: "#140D08",
    btnFg: "#FFF6EC",
  },
  {
    n: "02",
    tag: "NEW BATCH",
    title: "Full-Stack Development",
    desc: "React.js front ends, Node.js back ends and deployment, so you can ship complete apps.",
    chips: ["React.js", "Node.js", "Full Stack"],
    bg: "#FFF6EC",
    fg: "#140D08",
    tagBg: "#FF6B1A",
    tagFg: "#140D08",
    chipBorder: "rgba(20,13,8,0.25)",
    btnBg: "#140D08",
    btnFg: "#FFF6EC",
  },
  {
    n: "03",
    tag: "1:1",
    title: "Personal Mentorship",
    desc: "A plan built just for you: career switch, interview prep or a specific skill gap.",
    chips: ["Your pace", "Code reviews", "Career prep"],
    bg: "#2A1C12",
    fg: "#FFF6EC",
    tagBg: "#FFC83D",
    tagFg: "#140D08",
    chipBorder: "rgba(255,246,236,0.3)",
    btnBg: "#FF6B1A",
    btnFg: "#140D08",
  },
];

export function ProgramsSection({ courses }: ProgramsSectionProps) {
  return (
    <section id="programs" className="bg-[#140D08] text-[#FFF6EC]">
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div className="flex-1 min-w-[280px]">
            <h2
              className="m-0 font-extrabold leading-[0.92] tracking-tight"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(32px, 5vw, 64px)",
                letterSpacing: "-2px",
              }}
            >
              Programs that
              <br />
              <span className="text-[#FF6B1A]">get you hired.</span>
            </h2>
          </div>
          
          {/* Right side with image and text */}
          <div className="flex items-center gap-6 max-w-[500px]">
            <div className="relative w-[120px] h-[120px] rounded-2xl overflow-hidden flex-shrink-0 hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop"
                alt="Students learning together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B1A]/30 to-transparent" />
            </div>
            <p className="m-0 text-[#C9B9A8] text-sm leading-relaxed max-w-[340px]">
              Pick a track or go fully 1:1. Every program includes projects, code
              reviews and doubt sessions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programCards.map((program) => (
            <article
              key={program.n}
              className="rounded-[24px] p-6 flex flex-col gap-4 min-h-[380px] relative overflow-hidden"
              style={{ background: program.bg, color: program.fg }}
            >
              <div className="flex justify-between items-start gap-3">
                <span
                  className="font-extrabold text-[48px] leading-[0.9] tracking-tight"
                  style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1.5px" }}
                >
                  {program.n}
                </span>
                <span
                  className="text-[10px] font-extrabold tracking-wider px-2 py-1 rounded-full"
                  style={{ background: program.tagBg, color: program.tagFg }}
                >
                  {program.tag}
                </span>
              </div>

              <h3
                className="m-0 font-extrabold text-[24px] leading-[1.02] tracking-tight"
                style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.5px" }}
              >
                {program.title}
              </h3>

              <p className="m-0 text-sm leading-relaxed opacity-85">
                {program.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {program.chips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[11px] font-bold px-2 py-1 rounded-full"
                    style={{ border: `1.5px solid ${program.chipBorder}` }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div
                className="mt-auto flex justify-between items-center gap-3 pt-4"
                style={{ borderTop: `1.5px solid ${program.chipBorder}` }}
              >
                <span className="text-xs font-bold">8-12 weeks</span>
                <Link
                  href="/contact"
                  aria-label="Enquire about this program"
                  className="w-[44px] h-[44px] rounded-full inline-flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background: program.btnBg }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={program.btnFg}
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
