"use client";

import Link from "next/link";
import Image from "next/image";
import { projectShowcase } from "@/lib/constants";

const projectTilts = ["-1.5deg", "1deg", "-0.5deg"];

export function ProjectsShowcase() {
  // Use first 3 projects from the showcase
  const displayProjects = projectShowcase.slice(0, 3);

  return (
    <section id="projects" className="max-w-[1280px] mx-auto px-6 pt-8 pb-28">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <h2
          className="m-0 font-extrabold leading-[0.98] tracking-tight"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(40px, 5vw, 72px)",
            letterSpacing: "-2px",
          }}
        >
          Built by
          <br />
          my students
        </h2>
        <Link
          href="/projects"
          className="font-extrabold text-base inline-flex items-center gap-2 min-h-[44px] text-[#140D08] no-underline hover:text-[#FF6B1A] transition-colors"
        >
          See all projects
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayProjects.map((project, i) => (
          <article key={project.id} className="flex flex-col gap-4">
            <div
              className="border-[3px] border-[#140D08] rounded-[22px] overflow-hidden bg-white"
              style={{
                transform: `rotate(${projectTilts[i] || "0deg"})`,
                boxShadow: "8px 8px 0 #140D08",
              }}
            >
              <div className="flex items-center gap-[6px] px-[14px] py-[10px] bg-[#140D08]">
                <span className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]" />
                <span className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
              </div>
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-[6px]">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="bg-[#140D08] text-[#FFF6EC] text-xs font-bold px-[10px] py-[5px] rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-[#6B5847] text-xs font-medium px-2 py-1">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            <h3
              className="m-0 font-extrabold text-2xl"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {project.title}
            </h3>
            <p className="m-0 -mt-2 text-[15px] text-[#6B5847] line-clamp-2">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
