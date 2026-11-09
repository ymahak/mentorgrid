"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl mb-12 ${alignStyles[align]} ${className}`}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-amber-700 bg-amber-50 rounded-full border border-amber-200">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
        {title.split(" ").map((word, index) => {
          // Make certain words gradient
          const gradientWords = ["Skills", "Projects", "Career", "Learning", "Mentor", "Industry"];
          if (gradientWords.some((gw) => word.includes(gw))) {
            return (
              <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                {word}{" "}
              </span>
            );
          }
          return word + " ";
        })}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// Page Header - for individual pages
interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-[100px]" />

      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="hover:text-amber-600 transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-gray-800 font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  );
}
