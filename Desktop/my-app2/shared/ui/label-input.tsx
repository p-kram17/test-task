"use client";
import { ReactNode, ChangeEvent, KeyboardEvent } from "react";
import { cn } from "../lib/utils";
import { Dispatch, SetStateAction } from "react";

export interface LabelInputProps {
  isDebounceActiveted?: boolean;
  isClickedOnIcon?: boolean;
  isClickedOnInput?: boolean;
  labelClassName?: string;
  id?: string;
  label?: string;
  value?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  children?: ReactNode;
  isLabelEsists?: boolean;
  InputClassName?: string;
  onBlur?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  setIsClickedOnIcon?: (value: boolean) => void;
  setIsClickedOnInput?: Dispatch<SetStateAction<boolean>>;
}

export function LabelInput({
  id,
  labelClassName,
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
  setIsClickedOnInput,
  onKeyDown,
}: LabelInputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      {isLabelEsists && (
        <label
          htmlFor={id}
          className={cn(
            "text-black text-sm font-medium relative left-1",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        type={type}
        onClick={(e) => {
          e.stopPropagation();
          setIsClickedOnInput?.((prev) => !prev);
        }}
        className={cn(
          "w-full h-11 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300",
          InputClassName,
        )}
      />

      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
