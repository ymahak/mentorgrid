"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LearningPathQuiz } from "./LearningPathQuiz";
import { Sparkles } from "lucide-react";

export function HomeHero() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  return (
    <section className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden">
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
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-[18px] py-6">
          <Link
            href="/"
            className="flex items-center gap-3 no-underline text-[#FFF6EC]"
          >
            <span
              className="w-12 h-12 rounded-[14px] bg-[#FF6B1A] text-[#140D08] inline-flex items-center justify-center font-extrabold text-[19px] -rotate-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              MY
            </span>
            <span className="flex flex-col leading-tight">
              <span
                className="font-extrabold text-[21px]"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Mahak Yadav
              </span>
              <span className="text-xs text-[#C9B9A8] tracking-wide">
                Tech Mentor & Trainer
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden lg:flex flex-wrap items-center gap-[6px] bg-[#22160E] border border-[#3A2A1D] rounded-full p-[6px]"
          >
            <Link
              href="/"
              aria-current="page"
              className="bg-[#FFF6EC] text-[#140D08] no-underline font-bold text-sm px-[18px] py-[10px] rounded-full"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[#E8DCCD] no-underline text-sm px-[14px] py-[10px] hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/courses"
              className="text-[#E8DCCD] no-underline text-sm px-[14px] py-[10px] hover:text-white transition-colors"
            >
              Courses & Programs
            </Link>
            <Link
              href="/projects"
              className="text-[#E8DCCD] no-underline text-sm px-[14px] py-[10px] hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="text-[#E8DCCD] no-underline text-sm px-[14px] py-[10px] hover:text-white transition-colors"
            >
              Blog
            </Link>
          </nav>

          <Link
            href="/contact"
            className="bg-[#FF6B1A] text-[#140D08] no-underline font-extrabold text-[15px] px-[22px] py-[14px] rounded-full inline-flex items-center gap-2 border-2 border-[#FFF6EC] hover:scale-105 transition-transform"
          >
            Book a session
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>
        </header>

        {/* Hero Content */}
        <div className="flex flex-wrap gap-10 items-center py-14 pb-28">
          {/* Copy */}
          <div className="flex-[1_1_560px] min-w-0 flex flex-col gap-7">
            <span className="self-start inline-flex items-center gap-[10px] border border-[#3A2A1D] bg-[#22160E] rounded-full px-4 py-2 pl-2 text-[13px] font-bold tracking-wider text-[#E8DCCD]">
              <span className="w-[26px] h-[26px] rounded-full bg-[#FF6B1A] inline-flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#140D08"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
                </svg>
              </span>
              PERSONALISED TECH TRAINING & MENTORSHIP
            </span>

            <h1
              className="m-0 font-extrabold leading-[0.92] tracking-tight"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(42px, 6vw, 84px)",
                letterSpacing: "-2px",
              }}
            >
              Make space
              <br />
              for a{" "}
              <span className="inline-block bg-[#FF6B1A] text-[#140D08] px-5 pb-[6px] rounded-full -rotate-3 my-2">
                brighter
              </span>
              <br />
              career.
            </h1>

            <p className="m-0 text-base leading-relaxed text-[#C9B9A8] max-w-[540px]" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
              1:1 and small-batch training in{" "}
              <strong className="text-[#FFF6EC]">AI/ML</strong>,{" "}
              <strong className="text-[#FFF6EC]">Data Science</strong> and{" "}
              <strong className="text-[#FFF6EC]">Full-Stack Development</strong>
              . You learn by building real projects, at your pace, with a mentor
              who knows your goal.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-[#FF6B1A] text-[#140D08] no-underline font-extrabold text-[15px] px-[26px] py-[16px] rounded-full inline-flex items-center gap-[10px] shadow-[0_0_0_6px_rgba(255,107,26,0.18)] hover:scale-105 transition-transform"
              >
                Book your first session
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="text-[#FFF6EC] no-underline font-bold text-[15px] px-6 py-[14px] rounded-full border-2 border-[#4A3626] hover:border-[#FFC83D] hover:bg-[#FFC83D]/10 transition-all inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FFC83D]" />
                Find my learning path
              </button>
            </div>
            
            {/* Learning Path Quiz Modal */}
            <LearningPathQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

            <div className="flex flex-wrap gap-9 pt-3 border-t border-[#2E2016]">
              <div>
                <div
                  className="font-extrabold text-3xl"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  400+
                </div>
                <div className="text-[12px] text-[#A89785]">
                  students mentored
                </div>
              </div>
              <div>
                <div
                  className="font-extrabold text-3xl"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  50+
                </div>
                <div className="text-[12px] text-[#A89785]">projects built</div>
              </div>
              <div>
                <div
                  className="font-extrabold text-3xl"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  2+
                </div>
                <div className="text-[12px] text-[#A89785]">
                  years in industry
                </div>
              </div>
            </div>
          </div>

          {/* Visual: sun + photo + floaters */}
          <div className="flex-[1_1_480px] min-w-0 relative h-[640px] hidden lg:block">
            {/* Sun rays */}
            <div
              className="absolute top-5 left-1/2 -ml-[300px] w-[600px] h-[600px] animate-spin-slow"
              aria-hidden="true"
            >
              <svg width="600" height="600" viewBox="0 0 600 600">
                <g
                  stroke="#FF6B1A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.55"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <line
                      key={i}
                      x1="300"
                      y1="20"
                      x2="300"
                      y2="62"
                      transform={`rotate(${i * 15} 300 300)`}
                    />
                  ))}
                </g>
              </svg>
            </div>

            {/* Sun disc */}
            <div
              aria-hidden="true"
              className="absolute top-[100px] left-1/2 -ml-[220px] w-[440px] h-[440px] rounded-full bg-[#FF6B1A]"
            />

            {/* Photo arch */}
            <div className="absolute top-[70px] left-1/2 -ml-[165px] w-[330px] h-[470px] rounded-t-[170px] rounded-b-[30px] bg-[#2A1C12] border-4 border-[#FFF6EC] overflow-hidden flex items-end justify-center">
              <Image
                src="/images/mahak-yadav.jpg"
                alt="Mahak Yadav"
                width={300}
                height={400}
                className="object-cover object-top w-full h-full"
                priority
              />
            </div>

            {/* Code window */}
            <div
              className="absolute top-[10px] left-0 w-[290px] bg-[#1E140D] border border-[#4A3626] rounded-[18px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-float"
              style={{ "--r": "-4deg" } as React.CSSProperties}
            >
              <div className="flex gap-[6px] px-[14px] py-3 border-b border-[#3A2A1D]">
                <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                <span
                  className="ml-auto text-[11px] text-[#A89785]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  career.py
                </span>
              </div>
              <pre
                className="m-0 px-4 py-[14px] text-[12.5px] leading-[1.7] text-[#E8DCCD] whitespace-pre"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-[#FF9A5C]">you</span> = Learner(goal=
                <span className="text-[#FFC83D]">"ML engineer"</span>)
                {"\n"}plan = mentor.<span className="text-[#FFC83D]">personalise</span>(you)
                {"\n"}plan.<span className="text-[#FFC83D]">build</span>(projects=
                <span className="text-[#FFC83D]">3</span>)
                {"\n"}
                <span className="text-[#8A7966]"># → industry ready</span>
                <span className="inline-block w-2 h-[15px] bg-[#FF6B1A] align-middle ml-[2px] animate-blink" />
              </pre>
            </div>

            {/* Skills pill stack */}
            <div
              className="absolute bottom-[30px] left-[4%] bg-[#FFC83D] text-[#140D08] rounded-[20px] px-[18px] py-4 flex flex-col gap-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-float"
              style={
                { "--r": "-2deg", animationDelay: "-3.5s" } as React.CSSProperties
              }
            >
              <span className="text-xs font-extrabold tracking-wider">
                YOU'LL LEARN
              </span>
              <span className="flex flex-wrap gap-[6px] max-w-[220px]">
                {["Python", "AI/ML", "React.js", "Node.js"].map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#140D08] text-[#FFF6EC] text-xs font-bold px-[10px] py-[5px] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </span>
            </div>

            {/* Spinning CTA badge */}
            <Link
              href="/contact"
              aria-label="Book your first session"
              className="absolute bottom-0 right-[6%] w-[130px] h-[130px] block animate-spin-fast"
            >
              <svg
                width="130"
                height="130"
                viewBox="0 0 130 130"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="myCirc"
                    d="M65 65 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0"
                  />
                </defs>
                <circle cx="65" cy="65" r="64" fill="#FFF6EC" />
                <text
                  fontFamily="Manrope, sans-serif"
                  fontSize="12"
                  fontWeight="800"
                  letterSpacing="2.6"
                  fill="#140D08"
                >
                  <textPath href="#myCirc">
                    BOOK YOUR FIRST SESSION · NOW ·
                  </textPath>
                </text>
                <circle cx="65" cy="65" r="22" fill="#FF6B1A" />
                <path
                  d="M57 73 L73 57 M60 57 H73 V70"
                  stroke="#140D08"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
