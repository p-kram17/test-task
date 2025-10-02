"use client";

import { useRef } from "react";
import { AutocompleteList } from "../../search-section/components/auto-complete-list";
import { Input } from "@/shared/shad-cn/input";
import { Button } from "@/shared/shad-cn/button";
import { useAutocomplete } from "../hooks/use-auto-complete";
import { SearchInputProps } from "../types/search-input-props";

export function SearchInput({
  placeholder = "Search posts...",
  onSearch,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    value,
    suggestions,
    open,
    onChange,
    handleSelect,
    onFocus,
    onBlur,
    reset,
  } = useAutocomplete();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = value.trim();
    if (!term) return;
    onSearch?.(term);
    try {
      localStorage.setItem("lastSearchTerm", term);
    } catch {}
    reset();
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={onSubmit} className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          Пошук
        </Button>
      </form>

      {open && suggestions.length > 0 && (
        <div className="transition-all duration-150 ease-out">
          <AutocompleteList
            items={suggestions}
            onSelect={(item) => {
              handleSelect(item);
              inputRef.current?.focus();
            }}
            renderItem={(p) => (
              <div className="flex flex-col">
                <span className="font-medium">{p.title}</span>
                <span className="text-xs text-gray-500 line-clamp-2">
                  {p.body}
                </span>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
