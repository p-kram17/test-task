"use client";
import * as React from "react";
import { cn } from "../lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("list-none", className)} {...props} />;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

function baseBtn(className?: string, isActive?: boolean) {
  return cn(
    "inline-flex h-9 min-w-9 items-center justify-center whitespace-nowrap rounded-md border px-3 py-1 text-sm transition-colors",
    "hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none",
    isActive ? "bg-blue-600 text-white border-blue-600" : "bg-background",
    className,
  );
}

function PaginationLink({ className, isActive, ...props }: ButtonProps) {
  return <button className={baseBtn(className, isActive)} {...props} />;
}

function PaginationPrevious({
  className,
  children,
  ...props
}: ButtonProps & { children?: React.ReactNode }) {
  return (
    <button
      className={baseBtn(className)}
      aria-label="Go to previous page"
      {...props}
    >
      {children ?? "‹ Prev"}
    </button>
  );
}

function PaginationNext({
  className,
  children,
  ...props
}: ButtonProps & { children?: React.ReactNode }) {
  return (
    <button
      className={baseBtn(className)}
      aria-label="Go to next page"
      {...props}
    >
      {children ?? "Next ›"}
    </button>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("px-2 text-muted-foreground", className)}
      aria-hidden
      {...props}
    >
      …
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
