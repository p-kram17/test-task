"use client";

import { useRef, useState, useCallback } from "react";
import { useDebounce } from "@/shared/lib/use-debounce";
import { kyInstance } from "@/shared/lib/ky";
import type { Post } from "@/shared/types/post";

export function useAutocomplete(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
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

  const onChange = useCallback(
    (term: string) => {
      setValue(term);
      setOpen(true);
      fetchSuggestions(term);
    },
    [fetchSuggestions],
  );

  const handleSelect = useCallback((item: Post) => {
    setValue(item.title);
    setOpen(false);
  }, []);

  const onFocus = useCallback(() => {
    if (value.trim()) setOpen(true);
  }, [value]);

  const onBlur = useCallback(() => {
    setTimeout(() => setOpen(false), 150);
  }, []);

  const reset = useCallback(() => {
    setValue("");
    setSuggestions([]);
    setOpen(false);
  }, []);

  return {
    value,
    suggestions,
    open,
    onChange,
    handleSelect,
    onFocus,
    onBlur,
    debouncedValue,
    setValue,
    setOpen,
    reset,
  };
}
