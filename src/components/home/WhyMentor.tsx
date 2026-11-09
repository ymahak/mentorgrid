"use client";

export function WhyMentor() {
  return (
    <section id="about" className="max-w-[1280px] mx-auto px-6 pt-8 pb-20">
      <h2
        className="m-0 mb-8 font-extrabold leading-[0.98] tracking-tight"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(32px, 4vw, 56px)",
          letterSpacing: "-1.5px",
        }}
      >
        Why learn with
        <br />
        <span className="text-[#E8550A]">a mentor</span>, not a playlist
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 - Personalised */}
        <div
          className="relative bg-[#FF6B1A] border-[2px] border-[#140D08] rounded-[24px] p-6 flex flex-col gap-3 min-h-[280px] overflow-hidden"
          style={{ boxShadow: "6px 6px 0 #140D08" }}
        >
          {/* Background image */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B1A] via-[#FF6B1A]/80 to-transparent" />
          
          <svg
            className="relative z-10"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#140D08"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="8" r="3.5" />
            <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 8.5a3 3 0 0 1 0 5.6M19 20c0-2.2-1-4.1-2.6-5.2" />
          </svg>
          <h3
            className="relative z-10 m-0 mt-auto font-extrabold text-[26px] tracking-tight"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.5px" }}
          >
            Personalised
          </h3>
          <p className="relative z-10 m-0 text-sm leading-relaxed">
            Training built around your background, your goal and your schedule.
            No one-size-fits-all syllabus.
          </p>
        </div>

        {/* Card 2 - Hands-on */}
        <div
          className="relative bg-[#140D08] text-[#FFF6EC] border-[2px] border-[#140D08] rounded-[24px] p-6 flex flex-col gap-3 min-h-[280px] overflow-hidden"
          style={{ boxShadow: "6px 6px 0 #FFC83D" }}
        >
          {/* Background image */}
          <div 
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-[#140D08]/85 to-[#140D08]/60" />
          
          <svg
            className="relative z-10"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFC83D"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />
          </svg>
          <h3
            className="relative z-10 m-0 mt-auto font-extrabold text-[26px] tracking-tight"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.5px" }}
          >
            Hands-on
          </h3>
          <p className="relative z-10 m-0 text-sm leading-relaxed text-[#C9B9A8]">
            You learn by building. Every topic ends in code you wrote and a
            project you can show.
          </p>
        </div>

        {/* Card 3 - Industry ready */}
        <div
          className="relative bg-white border-[2px] border-[#140D08] rounded-[24px] p-6 flex flex-col gap-3 min-h-[280px] overflow-hidden"
          style={{ boxShadow: "6px 6px 0 #FF6B1A" }}
        >
          {/* Background image */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/70" />
          
          <svg
            className="relative z-10"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#140D08"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
          </svg>
          <h3
            className="relative z-10 m-0 mt-auto font-extrabold text-[26px] tracking-tight"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-0.5px" }}
          >
            Industry ready
          </h3>
          <p className="relative z-10 m-0 text-sm leading-relaxed text-[#4A3626]">
            Real-world tools, workflows and interview prep, so you can walk into
            a tech role with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
