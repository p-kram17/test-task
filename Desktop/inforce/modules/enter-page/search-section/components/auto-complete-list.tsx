"use client";
import type { Post } from "@/shared/types/post";
import { PropsWithChildren } from "react";
import { AutocompleteListProps } from "../types/auto-complete-list-props";

export function AutocompleteList<T extends Post>({
  items,
  onSelect,
  renderItem,
}: PropsWithChildren<AutocompleteListProps<T>>) {
  return (
    <div className="mt-2 w-full max-w-xl border rounded-md shadow-sm bg-white">
      <ul className="divide-y">
        {items.map((item) => (
          <li
            key={(item as Post).id}
            className="p-3 cursor-pointer hover:bg-gray-50"
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(item);
            }}
          >
            <span className={`${renderItem && "hidden"} text-sm text-gray-700`}>
              {(item as Post).title}
            </span>
            <span
              className={`${renderItem && "block"} ${!renderItem && "hidden"}`}
            >
              {renderItem?.(item)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
