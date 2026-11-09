"use client";

import { motion } from "framer-motion";

interface GradientBackgroundProps {
  children: React.ReactNode;
  variant?: "default" | "hero" | "section" | "subtle";
  className?: string;
}

export default function GradientBackground({
  children,
  variant = "default",
  className = "",
}: GradientBackgroundProps) {
  const variants = {
    default: (
      <>
        <div className="absolute inset-0 bg-dark-900" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-secondary/10 rounded-full blur-[120px]" />
      </>
    ),
    hero: (
      <>
        <div className="absolute inset-0 bg-dark-900" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-accent-primary/15 rounded-full blur-[150px]" />
        <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-accent-secondary/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-accent-cyan/10 rounded-full blur-[100px]" />
      </>
    ),
    section: (
      <>
        <div className="absolute inset-0 bg-dark-800/50" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </>
    ),
    subtle: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent" />
      </>
    ),
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {variants[variant]}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Animated floating elements for hero sections
export function FloatingElements() {
  const elements = [
    { size: 60, x: "10%", y: "20%", delay: 0 },
    { size: 40, x: "80%", y: "15%", delay: 0.5 },
    { size: 80, x: "70%", y: "60%", delay: 1 },
    { size: 50, x: "20%", y: "70%", delay: 1.5 },
    { size: 30, x: "90%", y: "80%", delay: 2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 backdrop-blur-sm border border-white/5"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Code snippet decoration for tech feel
export function CodeDecoration({ className = "" }: { className?: string }) {
  const codeLines = [
    "const learn = async () => {",
    "  const skills = await acquire();",
    "  const projects = build(skills);",
    "  return success(projects);",
    "};",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`font-mono text-sm text-accent-primary/60 ${className}`}
    >
      {codeLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="whitespace-pre"
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Glowing orb decoration
export function GlowingOrb({
  size = 200,
  color = "purple",
  className = "",
}: {
  size?: number;
  color?: "purple" | "blue" | "mixed";
  className?: string;
}) {
  const colorStyles = {
    purple: "from-accent-primary/30 to-accent-primary/5",
    blue: "from-accent-blue/30 to-accent-blue/5",
    mixed: "from-accent-primary/20 via-accent-secondary/20 to-accent-cyan/10",
  };

  return (
    <div
      className={`absolute rounded-full bg-gradient-radial ${colorStyles[color]} blur-[80px] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

// Animated gradient border
export function AnimatedBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-[1px] rounded-2xl overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary animate-gradient-x" 
           style={{ backgroundSize: "200% 200%" }} />
      <div className="relative bg-dark-800 rounded-2xl">
        {children}
      </div>
    </div>
  );
}

// Particle field background - using deterministic values to avoid hydration mismatch
export function ParticleField({ count = 50 }: { count?: number }) {
  // Pre-defined positions to avoid hydration mismatch
  const getPosition = (index: number) => {
    const xPositions = [5, 12, 23, 31, 42, 55, 63, 74, 82, 91, 8, 18, 28, 38, 48, 58, 68, 78, 88, 95];
    const yPositions = [10, 25, 40, 55, 70, 85, 15, 30, 45, 60, 75, 90, 5, 20, 35, 50, 65, 80, 95, 12];
    const delays = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 0.3, 0.8, 1.3, 1.8, 2.3, 2.8, 3.3, 3.8, 4.3, 4.8];
    const durations = [4, 5, 6, 4.5, 5.5, 6.5, 4, 5, 6, 4.5, 5.5, 6.5, 4, 5, 6, 4.5, 5.5, 6.5, 4, 5];
    const sizes = [1, 1.5, 2, 1.2, 1.8, 2.2, 1, 1.5, 2, 1.2, 1.8, 2.2, 1, 1.5, 2, 1.2, 1.8, 2.2, 1, 1.5];
    
    return {
      x: xPositions[index % xPositions.length],
      y: yPositions[index % yPositions.length],
      delay: delays[index % delays.length],
      duration: durations[index % durations.length],
      size: sizes[index % sizes.length],
    };
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const { x, y, delay, duration, size } = getPosition(i);
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-primary/30"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`,
              width: size,
              height: size,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
