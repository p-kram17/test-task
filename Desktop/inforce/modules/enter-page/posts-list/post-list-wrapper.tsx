"use client";

import { memo, useMemo } from "react";
import { PostsListProps } from "./types/post-list-props";

function PostsListWrapperBase({ items }: PostsListProps) {
  const list = useMemo(() => {
    return items.map((p) => (
      <article key={p.id} className="border rounded-lg p-4 bg-white shadow-sm">
        <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{p.body}</p>
      </article>
    ));
  }, [items]);

  const isEmpty = items.length === 0;

  return (
    <div className="w-full max-w-3xl">
      {isEmpty && (
        <div className="text-sm text-gray-500">
          Немає постів для відображення.
        </div>
      )}

      {!isEmpty && <div className="grid grid-cols-1 gap-4">{list}</div>}
    </div>
  );
}

export const PostsListWrapper = memo(PostsListWrapperBase);
