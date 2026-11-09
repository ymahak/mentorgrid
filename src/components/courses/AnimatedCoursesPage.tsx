"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  duration: string;
}

interface Program {
  id: string;
  title: string;
  description: string;
}

const courseColors = ["#FF6B1A", "#FFC83D", "#FFF6EC"];
const programColors = ["#FF6B1A", "#FFC83D", "#FFF6EC"];

export function AnimatedCourseCard({
  course,
  index,
}: {
  course: Course;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const bgColor = courseColors[index % courseColors.length];

  return (
    <Link href={`/courses/${course.slug}`}>
      <article
        ref={ref}
        className="h-full rounded-[28px] p-6 border-[3px] border-[#140D08] flex flex-col gap-4 cursor-pointer"
        style={{
          backgroundColor: bgColor,
          boxShadow: isHovered ? "10px 10px 0 #140D08" : "6px 6px 0 #140D08",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? isHovered
              ? "translate(-6px, -6px) scale(1.02)"
              : "translate(0, 0) scale(1)"
            : "translateY(40px) scale(0.95)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Level Badge */}
        <span
          className="self-start bg-[#140D08] text-[#FFF6EC] text-xs font-bold px-3 py-1 rounded-full"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          {course.level}
        </span>

        {/* Title */}
        <h3
          className="text-2xl font-extrabold text-[#140D08] leading-tight"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-[#4A3626] text-sm leading-relaxed flex-grow line-clamp-3">
          {course.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {course.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={tech}
              className="bg-[#140D08]/10 text-[#140D08] text-xs font-medium px-2 py-1 rounded-full"
              style={{
                transform: isHovered ? `translateY(-${(i % 2) * 2}px)` : "translateY(0)",
                transition: `transform 0.3s ease ${i * 50}ms`,
              }}
            >
              {tech}
            </span>
          ))}
          {course.technologies.length > 4 && (
            <span className="text-[#140D08] text-xs font-medium px-2 py-1">
              +{course.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="pt-4 border-t border-[#140D08]/20 flex items-center justify-between">
          <span className="text-sm font-bold text-[#140D08]">
            {course.duration}
          </span>
          <span
            className="w-10 h-10 rounded-full bg-[#140D08] flex items-center justify-center"
            style={{
              transform: isHovered ? "scale(1.2) rotate(45deg)" : "scale(1) rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF6EC"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}

export function AnimatedProgramCard({
  program,
  index,
}: {
  program: Program;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const bgColor = programColors[index % programColors.length];

  return (
    <article
      ref={ref}
      className="rounded-[24px] p-6 flex flex-col gap-4 min-h-[280px] border-[2px] border-[#140D08]"
      style={{
        backgroundColor: bgColor,
        boxShadow: isHovered
          ? "8px 8px 0 rgba(255,255,255,0.2)"
          : "4px 4px 0 rgba(255,255,255,0.1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? "translate(-4px, -4px)"
            : "translate(0, 0)"
          : "translateY(30px)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        className="text-xl font-extrabold leading-tight text-[#140D08]"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {program.title}
      </h3>
      <p className="text-sm leading-relaxed flex-grow text-[#140D08]/80">
        {program.description}
      </p>
      <Link
        href="/contact"
        className="self-start px-5 py-2 rounded-full text-sm font-bold bg-[#140D08] text-[#FFF6EC] hover:scale-105 transition-transform group flex items-center gap-2"
      >
        Enquire Now
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="group-hover:translate-x-1 transition-transform"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </article>
  );
}

export function AnimatedSectionTitle({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
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
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
