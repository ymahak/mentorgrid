"use client";

import { useEffect, useRef, useState } from "react";

interface SkillCategory {
  category: string;
  skills: string[];
  color: string;
}

interface Experience {
  title: string;
  company: string;
  location?: string;
  period: string;
  type?: string;
  description: string[];
  isCurrent?: boolean;
}

// Animated Skill Card Component
function AnimatedSkillCard({ category, skills, color, index }: SkillCategory & { index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="rounded-[28px] p-6 border-[3px] border-[#140D08] cursor-default"
      style={{
        backgroundColor: color,
        boxShadow: isHovered ? "10px 10px 0 #140D08" : isVisible ? "6px 6px 0 #140D08" : "0px 0px 0 #140D08",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? "translate(-6px, -6px) scale(1.02)"
            : "translate(0, 0) scale(1)"
          : "translateY(40px) scale(0.9)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        className="text-xl font-extrabold text-[#140D08] mb-4"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {category}
      </h3>
      <div className="space-y-2">
        {skills.map((skill, skillIndex) => (
          <div
            key={skill}
            className="flex items-center gap-2 text-[#140D08] cursor-default group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? hoveredSkill === skill
                  ? "translateX(8px)"
                  : "translateX(0)"
                : "translateX(-20px)",
              transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${(index * 100) + (skillIndex * 60)}ms`,
            }}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: hoveredSkill === skill ? "scale(1.3) rotate(10deg)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            >
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            <span className="text-sm font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Compact Grid Experience Card with Image Background
function AnimatedExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const cardImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
    "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
  ];

  const cardColors = ["#FF6B1A", "#FFC83D", "#140D08"];
  const cardColor = cardColors[index % cardColors.length];

  return (
    <div
      ref={cardRef}
      className="relative rounded-[20px] overflow-hidden border-[3px] border-[#140D08] cursor-default group h-[220px]"
      style={{
        boxShadow: isHovered ? `8px 8px 0 ${cardColor}` : `5px 5px 0 ${cardColor}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? "translate(-3px, -3px)"
            : "translate(0, 0)"
          : "translateY(30px)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url('${cardImages[index % cardImages.length]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-[#140D08]/80 to-[#140D08]/40" />

      {/* Content */}
      <div className="relative h-full p-5 flex flex-col justify-end">
        {/* Period badge */}
        <span
          className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full"
          style={{
            backgroundColor: cardColor,
            color: cardColor === "#140D08" ? "#FFF6EC" : "#140D08",
          }}
        >
          {exp.period}
        </span>

        {/* Current badge */}
        {exp.isCurrent && (
          <span className="absolute top-4 right-4 bg-[#FF6B1A] text-[#140D08] text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#140D08] animate-pulse" />
            CURRENT
          </span>
        )}

        {/* Title */}
        <h3
          className="text-lg font-bold text-[#FFF6EC] leading-tight mb-1"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {exp.title}
        </h3>

        {/* Company */}
        <p className="text-sm text-[#C9B9A8] mb-2">
          {exp.company}
          {exp.type && <span className="text-[#A89785]"> · {exp.type}</span>}
        </p>

        {/* Key highlight */}
        <p className="text-xs text-[#A89785] line-clamp-2 leading-relaxed">
          {exp.description[0]}
        </p>
      </div>
    </div>
  );
}

// Skills Section Export
export function AnimatedSkillsSection() {
  const skillCategories = [
    {
      name: "Programming",
      skills: ["Python", "JavaScript", "TypeScript", "C/C++", "SQL"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
      color: "#FF6B1A",
    },
    {
      name: "Web Development",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80",
      color: "#FFC83D",
    },
    {
      name: "AI & Tools",
      skills: ["ChatGPT", "Claude", "Gemini", "GitHub Copilot", "Cursor"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",
      color: "#140D08",
    },
    {
      name: "DevOps & Design",
      skills: ["Git/GitHub", "Docker", "Firebase", "Power BI", "Figma"],
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&q=80",
      color: "#FF6B1A",
    },
  ];

  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 bg-[#FFF6EC] relative">
      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#FF6B1A] text-white font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-4">
            EXPERTISE
          </span>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-extrabold text-[#140D08]"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              letterSpacing: "-2px",
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Technical Skills
          </h2>
        </div>

        {/* Skills Grid with Images */}
        <div className="grid md:grid-cols-2 gap-5">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// New Skill Category Card with Image
function SkillCategoryCard({ category, index }: { category: { name: string; skills: string[]; image: string; color: string }; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const isDark = category.color === "#140D08";

  return (
    <div
      ref={cardRef}
      className="relative rounded-[24px] overflow-hidden border-2 border-[#140D08]/10 cursor-default group shadow-lg"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? "translate(-4px, -4px)"
            : "translate(0, 0)"
          : "translateY(40px)",
        boxShadow: isHovered ? `8px 8px 0 ${category.color}` : "0 4px 20px rgba(0,0,0,0.1)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url('${category.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isDark 
            ? "linear-gradient(135deg, rgba(20,13,8,0.95) 0%, rgba(20,13,8,0.85) 100%)"
            : `linear-gradient(135deg, ${category.color}ee 0%, ${category.color}dd 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative p-6 min-h-[200px] flex flex-col">
        {/* Category Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ 
            backgroundColor: isDark ? "#FF6B1A" : "#140D08",
          }}
        >
          {index === 0 && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#140D08" : "#FFF6EC"} strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          )}
          {index === 1 && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#140D08" : "#FFF6EC"} strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          )}
          {index === 2 && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#140D08" : "#FFF6EC"} strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2 4 4 0 0 1 4-4z" />
              <path d="M8 8v8a4 4 0 0 0 8 0V8" />
              <path d="M12 16v6" />
            </svg>
          )}
          {index === 3 && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#140D08" : "#FFF6EC"} strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-extrabold mb-4"
          style={{ 
            fontFamily: "var(--font-inter), sans-serif",
            color: isDark ? "#FFF6EC" : "#140D08",
          }}
        >
          {category.name}
        </h3>

        {/* Skills as tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {category.skills.map((skill, skillIndex) => (
            <span
              key={skill}
              className="text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(20,13,8,0.1)",
                color: isDark ? "#FFF6EC" : "#140D08",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${(index * 100) + (skillIndex * 50)}ms`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Experience Section Export
export function AnimatedExperienceSection({
  experience,
}: {
  experience: Experience[];
}) {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Sort experience by most recent first (current jobs first, then by period)
  const sortedExperience = [...experience].sort((a, b) => {
    // Current jobs come first
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    
    // Extract year from period (e.g., "Sept 2025 - April 2026" -> 2026)
    const getEndYear = (period: string) => {
      const match = period.match(/(\d{4})(?!.*\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    
    return getEndYear(b.period) - getEndYear(a.period);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 bg-[#FFF6EC] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gradient-to-bl from-[#FF6B1A]/10 via-[#FF6B1A]/3 to-transparent rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-gradient-to-tr from-[#FFC83D]/12 via-[#FFC83D]/4 to-transparent rounded-full blur-3xl animate-blob" style={{ animationDelay: "-5s" }} />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-[5%] w-16 h-16 border-2 border-[#FF6B1A]/10 rounded-2xl rotate-12 animate-float" />
        <div className="absolute bottom-20 right-[8%] w-12 h-12 border-2 border-[#FFC83D]/12 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#FF6B1A] text-[#140D08] font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-4">
            JOURNEY
          </span>
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-extrabold text-[#140D08]"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              letterSpacing: "-2px",
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Experience
          </h2>
        </div>
        
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedExperience.map((exp, index) => (
            <AnimatedExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
