import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

// ---- Button ----
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "dark" | "lime-outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center gap-2 font-semibold rounded-lg border border-transparent cursor-pointer transition-all duration-150 leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-syn-lime/50";
    const variants: Record<string, string> = {
      primary:
        "bg-syn-lime text-[#111] shadow-lime hover:bg-syn-lime-dark hover:text-white hover:-translate-y-px active:translate-y-px",
      ghost:
        "bg-transparent text-neutral-200 border-white/20 hover:border-syn-lime hover:bg-syn-lime/10 hover:text-syn-lime",
      dark: "bg-[#111] text-white hover:bg-black",
      "lime-outline":
        "bg-transparent text-syn-lime border-syn-lime/45 hover:border-syn-lime hover:bg-syn-lime/10",
    };
    const sizes: Record<string, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3.5 text-[15px]",
      lg: "px-8 py-[18px] text-base tracking-[0.08em] uppercase",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// ---- Pill / Badge ----
export const Pill = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center px-3 py-1.5 rounded-full bg-syn-lime-tint text-syn-black text-xs font-semibold tracking-wide",
      className
    )}
  >
    {children}
  </span>
);

// ---- Status dot ----
export const StatusDot = ({ label = "Operativo" }: { label?: string }) => (
  <span className="inline-flex items-center gap-2 text-xs text-neutral-400">
    <span className="w-2 h-2 rounded-full bg-syn-lime shadow-lime-glow animate-status-pulse" />
    {label}
  </span>
);
