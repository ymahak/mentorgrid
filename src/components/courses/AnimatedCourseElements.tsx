"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";

// Animated section wrapper
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

// Animated outcome card
export function AnimatedOutcomeCard({
  outcome,
  index,
  color,
}: {
  outcome: string;
  index: number;
  color: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="p-5 rounded-[20px] border-[3px] border-[#140D08] cursor-default"
      style={{
        backgroundColor: color,
        boxShadow: isHovered ? "6px 6px 0 #140D08" : "4px 4px 0 #140D08",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? "translate(-4px, -4px)"
            : "translate(0, 0)"
          : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 50}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <span
          className="w-8 h-8 rounded-lg bg-[#140D08] flex items-center justify-center flex-shrink-0"
          style={{
            transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF6EC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <span className="text-[#140D08] font-semibold text-sm leading-relaxed">
          {outcome}
        </span>
      </div>
    </div>
  );
}

// Animated sidebar
export function AnimatedSidebar({
  duration,
  level,
  modulesCount,
}: {
  duration: string;
  level: string;
  modulesCount: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const infoItems = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: "Duration",
      value: duration,
      bg: "#FF6B1A",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      label: "Level",
      value: level,
      bg: "#FFC83D",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#140D08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      label: "Modules",
      value: `${modulesCount} modules`,
      bg: "#FFF6EC",
    },
  ];

  return (
    <aside
      ref={ref}
      id="enroll"
      className="flex-[1_1_340px] max-w-[400px] min-w-0 mt-[-120px] relative z-10 bg-white rounded-[32px] p-6 border-[3px] border-[#140D08] sticky top-6 self-start"
      style={{
        boxShadow: "8px 8px 0 #140D08",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(30px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="space-y-6">
        {/* Course Info */}
        <div className="space-y-4">
          {infoItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-3 group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(20px)",
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${300 + index * 100}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: item.bg }}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-[#6B5847]">{item.label}</p>
                <p className="font-bold text-[#140D08]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="border-t-2 border-dashed border-[#E3CDB4]"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease 600ms",
          }}
        />

        {/* CTA */}
        <div
          className="space-y-3"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 700ms",
          }}
        >
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 bg-[#FF6B1A] text-[#140D08] font-extrabold px-6 py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 group"
          >
            Enroll Now
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 bg-[#140D08] text-[#FFF6EC] font-bold px-6 py-4 rounded-full hover:scale-105 hover:bg-[#2A1C12] transition-all duration-300"
          >
            Book a Free Call
          </Link>
        </div>

        {/* Note */}
        <p
          className="text-xs text-[#A89785] text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease 800ms",
          }}
        >
          Duration is indicative and may vary based on your pace.
        </p>
      </div>
    </aside>
  );
}

// Animated content card
export function AnimatedContentCard({
  title,
  children,
  shadowColor = "#140D08",
  delay = 0,
}: {
  title: string;
  children: ReactNode;
  shadowColor?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <h2
        className="text-3xl font-extrabold text-[#140D08] mb-6"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {title}
      </h2>
      <div
        className="bg-white rounded-[24px] p-6 border-[3px] border-[#140D08] transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? `8px 8px 0 ${shadowColor}`
            : `6px 6px 0 ${shadowColor}`,
          transform: isHovered ? "translate(-2px, -2px)" : "translate(0, 0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    </div>
  );
}
