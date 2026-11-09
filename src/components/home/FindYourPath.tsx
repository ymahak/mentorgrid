"use client";

import { useState } from "react";
import Link from "next/link";

const skillDefs = [
  { label: "Python", track: "ai" },
  { label: "React.js", track: "web" },
  { label: "AI/ML", track: "ai" },
  { label: "Data Science", track: "ai" },
  { label: "Node.js", track: "web" },
  { label: "Full Stack", track: "web" },
];

export function FindYourPath() {
  const [picked, setPicked] = useState<string[]>(["React.js", "Data Science", "Full Stack"]);

  const toggleSkill = (label: string) => {
    setPicked((cur) =>
      cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label]
    );
  };

  const ai = skillDefs.filter((d) => d.track === "ai" && picked.includes(d.label)).length;
  const web = skillDefs.filter((d) => d.track === "web" && picked.includes(d.label)).length;

  let rec: {
    title: string;
    desc: string;
    points: string[];
    meta: string;
    cta: string;
  };

  if (ai === 0 && web === 0) {
    rec = {
      title: "Pick a skill to see your path",
      desc: "Choose one or more skills on the left and we will suggest where to start.",
      points: [
        "A first call to understand your goal",
        "A plan built around your background",
        "Projects from week one",
      ],
      meta: "Start where you are",
      cta: "Talk to Mahak",
    };
  } else if (ai > 0 && web > 0) {
    rec = {
      title: "1:1 Custom Mentorship",
      desc: "You picked skills from both tracks. A personal plan blends AI/ML and full-stack so you can build and ship intelligent apps.",
      points: [
        `A roadmap mixing ${picked.join(", ")}`,
        "Weekly 1:1 sessions and code reviews",
        "An end-to-end AI-powered web app",
      ],
      meta: "Flexible schedule",
      cta: "Plan my path",
    };
  } else if (ai > 0) {
    rec = {
      title: "AI/ML & Data Science Program",
      desc: "From Python foundations to training and evaluating real models on real data.",
      points: [
        "Python, data analysis and visualisation",
        "Machine learning models, start to finish",
        "A portfolio of data projects",
      ],
      meta: "8-12 weeks",
      cta: "Join next batch",
    };
  } else {
    rec = {
      title: "Full-Stack Development Program",
      desc: "Build and deploy complete web apps with React.js on the front and Node.js on the back.",
      points: [
        "React.js interfaces that feel fast",
        "Node.js APIs and databases",
        "A deployed full-stack project",
      ],
      meta: "10-14 weeks",
      cta: "Join next batch",
    };
  }

  return (
    <section id="path" className="max-w-[1280px] mx-auto px-6 pt-32 pb-24">
      <div className="flex flex-wrap gap-10 items-stretch">
        {/* Left side */}
        <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-[22px]">
          <span className="text-[13px] font-extrabold tracking-[2px] text-[#8A5A2B]">
            FIND YOUR PATH
          </span>
          <h2
            className="m-0 font-extrabold leading-[0.98] tracking-tight"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              letterSpacing: "-1.5px",
            }}
          >
            What would you like to learn?
          </h2>
          <p className="m-0 text-base text-[#6B5847] leading-relaxed">
            Tap everything that interests you. Your recommended program updates
            as you go.
          </p>

          <div
            role="group"
            aria-label="Skills"
            className="flex flex-wrap gap-2 mt-2"
          >
            {skillDefs.map((skill) => {
              const on = picked.includes(skill.label);
              return (
                <button
                  key={skill.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleSkill(skill.label)}
                  className="cursor-pointer px-[20px] py-3 rounded-full border-[2px] border-[#140D08] inline-flex items-center gap-[8px] min-h-[48px] transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    background: on ? "#FF6B1A" : "#FFFFFF",
                    color: "#140D08",
                    boxShadow: on ? "4px 4px 0 #140D08" : "0 0 0 #140D08",
                    transform: on ? "translate(-2px, -2px)" : "none",
                  }}
                >
                  <span
                    className="font-extrabold text-base"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {on ? "✓" : "+"}
                  </span>
                  {skill.label}
                </button>
              );
            })}
          </div>

          <p className="m-0 mt-2 italic text-[#8A7966] text-base">
            "Your journey starts where you are."
          </p>
        </div>

        {/* Right side - recommendation card */}
        <div className="flex-[1_1_420px] min-w-0 bg-[#140D08] text-[#FFF6EC] rounded-[36px] p-9 flex flex-col gap-[18px] relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#FF6B1A] opacity-90"
          />

          <span className="relative self-start bg-[#FFF6EC] text-[#140D08] text-xs font-extrabold tracking-[1.5px] px-3 py-[6px] rounded-full">
            RECOMMENDED FOR YOU
          </span>

          <h3
            className="relative m-0 font-extrabold text-[28px] leading-[1.02] tracking-tight max-w-[360px]"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-1px" }}
          >
            {rec.title}
          </h3>

          <p className="relative m-0 text-[#C9B9A8] text-sm leading-relaxed">
            {rec.desc}
          </p>

          <ul className="relative m-0 p-0 list-none flex flex-col gap-[8px]">
            {rec.points.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 items-start text-sm"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-[#FF6B1A] inline-flex items-center justify-center mt-[1px]">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#140D08"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-[10px] items-center justify-between pt-[18px] border-t border-[#3A2A1D]">
            <span className="text-sm text-[#C9B9A8]">{rec.meta}</span>
            <Link
              href="/contact"
              className="bg-[#FF6B1A] text-[#140D08] no-underline font-extrabold text-[15px] px-[22px] py-[14px] rounded-full hover:scale-105 transition-transform"
            >
              {rec.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
