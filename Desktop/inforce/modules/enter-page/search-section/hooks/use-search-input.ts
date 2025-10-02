"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useDebounce } from "@/shared/lib/use-debounce";
import { kyInstance } from "@/shared/lib/ky";
import type { Post } from "@/shared/types/post";

export function useSearchInput(
  initialValue: string = "",
  onSearch?: (term: string) => void,
) {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem("lastSearchTerm") || initialValue;
    } catch {
      return initialValue;
    }
  });
  const [suggestions, setSuggestions] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cacheRef = useRef<Map<string, Post[]>>(new Map());
  const debouncedValue = useDebounce(value, 300);

  const fetchSuggestions = useCallback(async (term: string) => {
    if (!term.trim()) {
      setSuggestions([]);
      return;
    }

    const cached = cacheRef.current.get(term);
    if (cached) {
      setSuggestions(cached);
      return;
    }

    try {
      const res = await kyInstance
        .get("search", { searchParams: { q: term } })
        .json<{ items: Post[] }>();
      cacheRef.current.set(term, res.items);
      setSuggestions(res.items);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Trigger data load on debounce changes (inside effect to avoid render loops)
  useEffect(() => {
    if (debouncedValue.trim()) {
      fetchSuggestions(debouncedValue);
    } else if (suggestions.length) {
      setSuggestions([]);
    }
    // We intentionally depend only on debouncedValue; fetchSuggestions is stable
    // and suggestions length is checked conditionally to avoid extra loops.
  }, [debouncedValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setOpen(true);
  };

  const onFocus = () => {
    if (value.trim()) setOpen(true);
  };

  const onBlur = () => {
    setTimeout(() => setOpen(false), 150);
  };

  const handleSelect = (item: Post) => {
    setValue(item.title);
    setOpen(false);
    inputRef.current?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = value.trim();
    if (!term) return;

    onSearch?.(term);

    try {
      localStorage.setItem("lastSearchTerm", term);
    } catch {}

    setValue("");
    setSuggestions([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  return {
    value,
    setValue,
    suggestions,
    open,
    setOpen,
    inputRef,
    onChange,
    onFocus,
    onBlur,
    handleSelect,
    onSubmit,
  };
}
