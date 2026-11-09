"use client";

const steps = [
  {
    n: "1",
    title: "First call",
    body: "Tell me where you are and where you want to go.",
    color: "#FF6B1A",
  },
  {
    n: "2",
    title: "Your plan",
    body: "Get a roadmap matched to your level, goal and schedule.",
    color: "#FFC83D",
  },
  {
    n: "3",
    title: "Build projects",
    body: "Learn each concept by shipping something real, with code reviews.",
    color: "#FFFFFF",
  },
  {
    n: "4",
    title: "Get industry ready",
    body: "Portfolio, interview prep and the confidence to apply.",
    color: "#FF6B1A",
  },
];

export function HowItWorks() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-20 pb-16">
      <h2
        className="m-0 mb-10 font-extrabold leading-[0.98] tracking-tight text-center"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(32px, 4vw, 56px)",
          letterSpacing: "-1.5px",
        }}
      >
        From first call to first job
      </h2>

      <ol className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <li
            key={step.n}
            className="relative bg-white border-[2px] border-[#140D08] rounded-[20px] p-5 flex flex-col gap-2 min-h-[180px]"
          >
            <span
              className="self-start w-10 h-10 rounded-full border-[2px] border-[#140D08] inline-flex items-center justify-center font-extrabold text-base"
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                background: step.color,
              }}
            >
              {step.n}
            </span>
            <h3
              className="m-0 mt-1 font-extrabold text-lg"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {step.title}
            </h3>
            <p className="m-0 text-sm leading-relaxed text-[#4A3626]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
