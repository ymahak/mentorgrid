"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, FolderGit, Award, Building2, Star, TrendingUp } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatItem[] = [
  {
    value: 400,
    suffix: "+",
    label: "Students Trained",
    icon: <Users className="w-6 h-6" />,
    color: "#FF6B1A",
  },
  {
    value: 50,
    suffix: "+",
    label: "Projects Built",
    icon: <FolderGit className="w-6 h-6" />,
    color: "#FFC83D",
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Student Rating",
    icon: <Star className="w-6 h-6" />,
    color: "#FF6B1A",
  },
  {
    value: 5,
    suffix: "+",
    label: "Organizations",
    icon: <Building2 className="w-6 h-6" />,
    color: "#FFC83D",
  },
  {
    value: 95,
    suffix: "%",
    label: "Success Rate",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "#FF6B1A",
  },
  {
    value: 10,
    suffix: "+",
    label: "Courses Created",
    icon: <Award className="w-6 h-6" />,
    color: "#FFC83D",
  },
];

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = value % 1 !== 0;
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = isDecimal 
        ? Math.round(value * easeOutQuart * 10) / 10
        : Math.floor(value * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ProgressBar({ value, maxValue, color }: { value: number; maxValue: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const percentage = (value / maxValue) * 100;

  return (
    <div ref={ref} className="h-2 bg-[#140D08]/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

export function AnimatedStatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-[#FFF6EC] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF6B1A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FFC83D]/5 rounded-full blur-3xl" />
      </div>

      <div ref={containerRef} className="relative max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block bg-[#FF6B1A] text-white font-extrabold text-xs tracking-wider px-4 py-2 rounded-full mb-4"
          >
            ACHIEVEMENTS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#140D08]"
            style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "-2px" }}
          >
            Numbers That Speak
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white rounded-2xl p-6 border-2 border-[#140D08]/10 hover:border-[#FF6B1A]/30 transition-all group hover:shadow-lg"
            >
              {/* Icon */}
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}20` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </motion.div>

              {/* Value */}
              <div
                className="text-4xl md:text-5xl font-extrabold mb-2"
                style={{ color: stat.color, fontFamily: "var(--font-inter), sans-serif" }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-[#6B5B4F] mb-3">{stat.label}</div>

              {/* Progress Bar */}
              <ProgressBar 
                value={stat.value} 
                maxValue={stat.label === "Student Rating" ? 5 : stat.label === "Success Rate" ? 100 : 500} 
                color={stat.color} 
              />

              {/* Hover effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ 
                  background: `linear-gradient(135deg, ${stat.color}05 0%, transparent 50%)` 
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
