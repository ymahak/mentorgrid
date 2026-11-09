"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, BarChart, ArrowRight } from "lucide-react";

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  duration: string;
}

interface CourseCardProps {
  course: Course;
}

// Course images from Unsplash
const courseImages: Record<string, string> = {
  "full-stack-web-development": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
  "data-science-analytics": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  "artificial-intelligence-machine-learning": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
  "python-programming": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
  "data-analytics-business-intelligence": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  "generative-ai-prompt-engineering": "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&h=400&fit=crop",
  "aptitude-logical-reasoning": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
};

const defaultImage = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop";

// Level badge colors
const levelColors: Record<string, string> = {
  "Beginner": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Intermediate": "bg-amber-100 text-amber-700 border-amber-200",
  "Advanced": "bg-rose-100 text-rose-700 border-rose-200",
  "Beginner to Intermediate": "bg-sky-100 text-sky-700 border-sky-200",
  "Intermediate to Advanced": "bg-purple-100 text-purple-700 border-purple-200",
  "Beginner to Advanced": "bg-indigo-100 text-indigo-700 border-indigo-200",
};

export default function CourseCard({ course }: CourseCardProps) {
  const isAptitude = course.slug === "aptitude-logical-reasoning";
  
  return (
    <div className="group h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300 overflow-hidden">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={courseImages[course.slug] || defaultImage}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${levelColors[course.level] || levelColors["Beginner"]}`}>
            {course.level.split(" ")[0]}
          </span>
        </div>
        {/* Free Notes Badge for Aptitude */}
        {isAptitude && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg animate-pulse">
              📚 Free Notes
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
          {course.title}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
          {course.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech}
              className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100"
            >
              {tech}
            </span>
          ))}
          {course.technologies.length > 3 && (
            <span className="text-xs text-gray-400 self-center">
              +{course.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Course Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-amber-500" />
            <span>{course.duration.split(" ")[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart size={16} className="text-amber-500" />
            <span>{course.level.split(" ")[0]}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href={`/courses/${course.slug}`} className="flex-1">
            <button className={`w-full px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              isAptitude 
                ? "bg-green-500 text-white hover:bg-green-600" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}>
              {isAptitude ? "📖 Access Free" : "View Details"}
            </button>
          </Link>
          <Link href="/contact" className="flex-1">
            <button className="w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all">
              Enquire
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
