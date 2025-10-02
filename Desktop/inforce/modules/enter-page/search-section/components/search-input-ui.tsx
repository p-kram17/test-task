"use client";

import type { Post } from "@/shared/types/post";
import { Input } from "@/shared/shad-cn/input";
import { Button } from "@/shared/shad-cn/button";
import { AutocompleteList } from "./auto-complete-list";
import * as React from "react";
import { SearchInputUIProps } from "../types/search-input-ui-propps";

export function SearchInputUI({
  value,
  inputRef,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  suggestions,
  open,
  handleSelect,
  placeholder = "Search posts...",
}: SearchInputUIProps) {
  const showList = open && suggestions.length > 0;

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={onSubmit} className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={onChange}
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

      {showList && (
        <div className="transition-all duration-150 ease-out">
          <AutocompleteList
            items={suggestions}
            onSelect={handleSelect}
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
