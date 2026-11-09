"use client";

type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white",
  primary: "bg-brand-purple/20 text-brand-purple-light border border-brand-purple/30",
  secondary: "bg-brand-blue/20 text-brand-light-blue border border-brand-blue/30",
  success: "bg-green-500/20 text-green-400 border border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  error: "bg-red-500/20 text-red-400 border border-red-500/30",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        font-medium
        rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Technology Badge - specifically for displaying tech stack
export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-white/[0.05] text-text-secondary border border-white/10 hover:bg-white/10 hover:text-white transition-colors">
      {children}
    </span>
  );
}

// Level Badge - for course difficulty levels
export function LevelBadge({ level }: { level: string }) {
  const getVariant = (): BadgeVariant => {
    if (level.includes("Beginner")) return "success";
    if (level.includes("Intermediate")) return "warning";
    if (level.includes("Advanced")) return "error";
    return "default";
  };

  return <Badge variant={getVariant()}>{level}</Badge>;
}
