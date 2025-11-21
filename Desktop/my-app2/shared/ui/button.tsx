import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/utils";

const buttonStyles = cva(
  "px-4 py-2 rounded text-white focus:outline-none focus:ring",
  {
    variants: {
      color: {
        primary: "bg-blue-700 hover:bg-blue-900 focus:ring-blue-300",
        secondary: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300",
        openPrice: "text-[12px] rounded-[5px] bg-grey-600 bg-gray-600",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "openPrice";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
}

export function Button({
  color,
  className,
  size,
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ color, size }), className)}
      role="button"
      aria-label={props["aria-label"] ?? "button"}
      aria-disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
