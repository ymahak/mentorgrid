"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  skills: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  outcome: string;
  image: string;
  liveUrl?: string;
}

const projectTilts = ["-1.5deg", "1deg", "-0.5deg", "1.5deg", "-1deg", "0.5deg"];

export function AnimatedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const tilt = projectTilts[index % projectTilts.length];

  return (
    <article
      className="flex flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Card */}
      <div
        className="border-[3px] border-[#140D08] rounded-[22px] overflow-hidden bg-white"
        style={{
          transform: isHovered ? `rotate(0deg) scale(1.02)` : `rotate(${tilt})`,
          boxShadow: isHovered ? "12px 12px 0 #FF6B1A" : "8px 8px 0 #140D08",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center gap-[6px] px-[14px] py-[10px] bg-[#140D08]">
          <span
            className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]"
            style={{
              animation: isHovered ? "pulse 1s infinite" : "none",
            }}
          />
          <span
            className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]"
            style={{
              animation: isHovered ? "pulse 1s infinite 0.2s" : "none",
            }}
          />
          <span
            className="w-[9px] h-[9px] rounded-full bg-[#28C840]"
            style={{
              animation: isHovered ? "pulse 1s infinite 0.4s" : "none",
            }}
          />
          <span className="ml-auto text-[#A89785] text-xs">
            {project.title.toLowerCase().replace(/\s+/g, "-")}.tsx
          </span>
        </div>
        <div className="relative h-[220px] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: imageLoaded ? 1 : 0,
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[#E3CDB4] animate-pulse" />
          )}
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#140D08] to-transparent flex items-end justify-center pb-4"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {project.liveUrl && (
              <span className="text-white text-sm font-bold flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                </svg>
                View Live Demo
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div
        className="p-6 rounded-[20px] bg-white border-[3px] border-[#140D08]"
        style={{
          boxShadow: isHovered ? "6px 6px 0 #FFC83D" : "4px 4px 0 #140D08",
          transform: isHovered ? "translate(-2px, -2px)" : "translate(0, 0)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3
            className="text-xl font-extrabold text-[#140D08]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {project.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all duration-300 ${
              project.difficulty === "Beginner"
                ? "bg-[#FFF6EC] border-[#140D08] text-[#140D08]"
                : project.difficulty === "Intermediate"
                ? "bg-[#FFC83D] border-[#140D08] text-[#140D08]"
                : "bg-[#FF6B1A] border-[#140D08] text-[#140D08]"
            }`}
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          >
            {project.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-[#6B5847] text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span
              key={tech}
              className="bg-[#140D08] text-[#FFF6EC] text-xs font-bold px-[10px] py-[5px] rounded-full"
              style={{
                transform: isHovered ? `translateY(-2px)` : "translateY(0)",
                transition: `transform 0.3s ease ${i * 50}ms`,
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[#6B5847] text-xs font-medium px-2 py-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E3CDB4] flex items-center justify-between">
          <p className="text-[#6B5847] text-xs line-clamp-1 flex-1">
            {project.outcome}
          </p>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B1A] text-[#140D08] text-xs font-bold hover:scale-110 transition-transform ml-3 group"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:rotate-12 transition-transform"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

// Animated hero text - shows immediately
export function AnimatedHeroText({
  children,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <div>{children}</div>;
}
