"use client";

import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      id="contact"
      className="bg-[#140D08] text-[#FFF6EC] relative overflow-hidden"
    >
      {/* Sun disc at bottom */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -bottom-[320px] -ml-[320px] w-[640px] h-[640px] rounded-full bg-[#FF6B1A]"
      />

      {/* Spinning sun rays */}
      <div
        className="absolute left-1/2 -bottom-[400px] -ml-[400px] w-[800px] h-[800px] animate-spin-slow"
        aria-hidden="true"
      >
        <svg width="800" height="800" viewBox="0 0 600 600">
          <g
            stroke="#FF6B1A"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
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

      <div className="relative max-w-[900px] mx-auto px-6 pt-24 pb-[260px] text-center flex flex-col items-center gap-5">
        <span className="text-[11px] font-extrabold tracking-[2px] text-[#FFC83D]">
          YOUR JOURNEY STARTS WHERE YOU ARE
        </span>

        <h2
          className="m-0 font-extrabold leading-[0.9] tracking-tight"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(40px, 6vw, 80px)",
            letterSpacing: "-2px",
          }}
        >
          Ready when
          <br />
          you are.
        </h2>

        <p className="m-0 text-base text-[#C9B9A8] max-w-[480px] leading-relaxed">
          Book a 30-minute first call. We'll map where you are, where you want
          to be, and the fastest honest route there.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="bg-[#FFF6EC] text-[#140D08] no-underline font-extrabold text-sm px-6 py-4 rounded-full inline-flex items-center gap-2 hover:scale-105 transition-transform"
          >
            Book your first session
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
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="https://wa.me/919817748915"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFF6EC] no-underline font-extrabold text-sm px-6 py-4 rounded-full border-2 border-[#FFF6EC] inline-flex items-center gap-2 hover:bg-[#FFF6EC] hover:text-[#140D08] transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.4A9 9 0 1 1 21 12z" />
            </svg>
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
