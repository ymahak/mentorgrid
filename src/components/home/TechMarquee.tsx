"use client";

const techStack = [
  "Python",
  "AI/ML",
  "Data Science",
  "React.js",
  "Node.js",
  "Full Stack",
];

// Duplicate for seamless loop
const allTech = [...techStack, ...techStack];

export function TechMarquee() {
  return (
    <section
      aria-label="Technologies taught"
      className="bg-[#FFC83D] border-t-[3px] border-b-[3px] border-[#140D08] overflow-hidden -rotate-[1.5deg] -mx-8 relative z-10 -mt-5"
    >
      <div
        className="flex w-max py-[22px]"
        style={{
          animation: "marquee 20s linear infinite",
        }}
      >
        {allTech.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[30px] pr-[30px] whitespace-nowrap text-[#140D08]"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 800,
              fontSize: "38px",
            }}
          >
            {tech}
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#140D08"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
            </svg>
          </span>
        ))}
      </div>
    </section>
  );
}
