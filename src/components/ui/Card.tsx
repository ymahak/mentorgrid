"use client";

import { forwardRef, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type CardVariant = "glass" | "solid" | "outline" | "gradient" | "premium";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<"div">> {
  children?: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  animated?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  glass:
    "bg-dark-800/50 backdrop-blur-2xl border border-white/[0.06]",
  solid:
    "bg-dark-800 border border-white/[0.05]",
  outline:
    "bg-transparent border border-white/20",
  gradient:
    "bg-gradient-to-br from-dark-700/80 to-dark-800/80 border border-white/[0.08]",
  premium:
    "bg-gradient-to-br from-dark-800/90 to-dark-900/90 border border-white/[0.06] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
};

const hoverStyles: Record<CardVariant, string> = {
  glass:
    "hover:bg-dark-700/60 hover:border-accent-primary/20 hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)]",
  solid:
    "hover:bg-dark-700 hover:border-accent-primary/20",
  outline:
    "hover:border-accent-primary/40 hover:bg-accent-primary/5",
  gradient:
    "hover:border-accent-primary/30 hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)]",
  premium:
    "hover:border-accent-primary/30 hover:shadow-[0_30px_60px_-15px_rgba(99,102,241,0.2)]",
};

const paddingStyles: Record<string, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "glass",
      hover = true,
      glow = false,
      padding = "md",
      animated = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      rounded-2xl
      transition-all duration-500
      ${variantStyles[variant]}
      ${paddingStyles[padding]}
      ${hover ? hoverStyles[variant] : ""}
      ${hover ? "hover:-translate-y-1" : ""}
      ${glow ? "shadow-[0_0_40px_rgba(99,102,241,0.2)] animate-glow" : ""}
      ${className}
    `;

    if (!animated) {
      return (
        <div ref={ref} className={baseClasses} {...props}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={baseClasses}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Card Header Component
export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

// Card Title Component
export const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3 className={`text-xl font-bold text-text-primary ${className}`}>{children}</h3>
);

// Card Description Component
export const CardDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={`text-text-secondary text-sm mt-1 ${className}`}>{children}</p>
);

// Card Content Component
export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>{children}</div>
);

// Card Footer Component
export const CardFooter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mt-4 pt-4 border-t border-white/10 ${className}`}>
    {children}
  </div>
);

// Feature Card with Icon
export const FeatureCard = ({
  icon,
  title,
  description,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => (
  <Card variant="glass" className={className}>
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center mb-4 text-accent-primary">
      {icon}
    </div>
    <CardTitle>{title}</CardTitle>
    <CardDescription className="mt-2">{description}</CardDescription>
  </Card>
);

// Stat Card
export const StatCard = ({
  value,
  label,
  icon,
  trend,
  className = "",
}: {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: number; positive: boolean };
  className?: string;
}) => (
  <Card variant="glass" padding="lg" className={className}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-text-muted mb-1">{label}</p>
        <p className="text-3xl font-bold text-text-primary">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 ${trend.positive ? "text-accent-emerald" : "text-accent-rose"}`}>
            {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </p>
        )}
      </div>
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
          {icon}
        </div>
      )}
    </div>
  </Card>
);

export default Card;
