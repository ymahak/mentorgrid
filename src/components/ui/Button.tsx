"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gradient";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    relative overflow-hidden
    bg-gradient-to-r from-sky-500 to-cyan-500 
    text-white font-semibold
    shadow-[0_4px_15px_rgba(14,165,233,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
    hover:shadow-[0_8px_25px_rgba(14,165,233,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
    hover:-translate-y-0.5
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
    before:translate-x-[-200%] hover:before:translate-x-[200%]
    before:transition-transform before:duration-700
  `,
  secondary: `
    bg-dark-700/80 text-text-primary 
    border border-white/10
    hover:bg-dark-600 hover:border-sky-500/30
    hover:shadow-[0_4px_20px_rgba(14,165,233,0.15)]
  `,
  outline: `
    bg-transparent text-sky-400 
    border-2 border-sky-500/50
    hover:bg-sky-500/10 hover:border-sky-400
  `,
  ghost: `
    bg-transparent text-text-secondary
    hover:bg-white/5 hover:text-text-primary
  `,
  gradient: `
    relative overflow-hidden
    bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400
    text-white font-semibold
    shadow-[0_4px_20px_rgba(14,165,233,0.3)]
    hover:shadow-[0_8px_30px_rgba(56,189,248,0.4)]
    hover:-translate-y-0.5
    animate-gradient-x
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      disabled,
      type = "button",
      onClick,
      title,
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        title={title}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium
          transition-all duration-300 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        disabled={disabled || isLoading}
        style={variant === "gradient" ? { backgroundSize: "200% 200%" } : undefined}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && (
              <motion.span 
                className="flex-shrink-0"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                {rightIcon}
              </motion.span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

// Icon Button variant
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, "leftIcon" | "rightIcon"> & { icon: React.ReactNode }>(
  ({ icon, variant = "ghost", size = "md", className = "", ...props }, ref) => {
    const iconSizeStyles: Record<ButtonSize, string> = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          inline-flex items-center justify-center
          rounded-xl
          transition-all duration-300
          ${variantStyles[variant]}
          ${iconSizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {icon}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";

export default Button;
