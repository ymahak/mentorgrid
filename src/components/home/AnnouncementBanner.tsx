"use client";

import Link from "next/link";

const tickerItems = [
  "New batch starting soon",
  "Enroll now",
  "Book your first session",
  "AI/ML · Data Science · Full-Stack",
];

// Duplicate for seamless loop
const allItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

export function AnnouncementBanner() {
  return (
    <Link
      href="#programs"
      className="block bg-[#FF6B1A] text-[#140D08] no-underline overflow-hidden border-b-2 border-[#140D08]"
    >
      <div
        className="flex w-max py-[11px] animate-marquee"
        style={{
          animation: "marquee 26s linear infinite",
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[22px] pr-[22px] whitespace-nowrap font-extrabold text-sm tracking-wide"
          >
            {item}
            <svg
              width="14"
              height="14"
              viewBox="0 0 70 70"
              aria-hidden="true"
            >
              <path
                d="M35 4 L39 31 L66 35 L39 39 L35 66 L31 39 L4 35 L31 31 Z"
                fill="#140D08"
              />
            </svg>
          </span>
        ))}
      </div>
    </Link>
  );
}
