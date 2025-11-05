"use client";
import { Input } from "@/shared/shad-cn/ui/input";
import { ReactNode, ChangeEvent } from "react";
import { Label } from "@/shared/shad-cn/ui/label";

export interface LabelInputProps {
  id?: string;
  label?: string;
  value?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  children?: ReactNode;
  isClickedOnEye?: boolean;
  isLabelEsists?: boolean;
  InputClassName?: string;
  onBlur?: () => void;
  setIsClickedOnEye?: (value: boolean) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isDebounceActiveted?: boolean;
}

export function LabelInput({
  id,
  label = "",
  placeholder = "Search...",
  children,
  value,
  onChange,
  onBlur,
  error,
  type,
  isLabelEsists = true,
  InputClassName,
}: LabelInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {isLabelEsists && (
        <Label
          htmlFor={id}
          className="text-gray-700 dark:text-gray-200 text-sm font-medium relative left-1"
        >
          {label}
        </Label>
      )}

      <div className="relative w-full flex items-center">
        <Input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          type={type}
          className={`
            w-full h-11 rounded-xl
            border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-300
            ${children ? "pl-10" : "pl-3"} pr-3 ${InputClassName ?? ""}
          `}
        />
        {children && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
            {children}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
