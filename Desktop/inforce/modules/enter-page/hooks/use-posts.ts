"use client";

import { useEffect, useRef, useState } from "react";
import { kyInstance } from "@/shared/lib/ky";
import type { Post } from "@/shared/types/post";

export interface PostsResponse {
  items: Post[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function usePosts(searchTerm: string) {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<PostsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Simple memoization cache for paginated results (when not searching)
  const pagesCacheRef = useRef<Map<number, PostsResponse>>(new Map());

  // restore saved page
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("currentPage") || 1);
      if (saved && !Number.isNaN(saved)) setPage(saved);
    } catch {}
  }, []);

  // persist page
  useEffect(() => {
    try {
      localStorage.setItem("currentPage", String(page));
    } catch {}
  }, [page]);

  // load posts or search results
  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (searchTerm.trim()) {
          const res = await kyInstance
            .get("search", { searchParams: { q: searchTerm } })
            .json<{ items: Post[] }>();
          if (!ignore) {
            setData({
              items: res.items,
              page: 1,
              limit: res.items.length || 10,
              total: res.items.length,
              totalPages: 1,
            });
          }
        } else {
          // Return cached page if available to avoid extra requests
          const cached = pagesCacheRef.current.get(page);
          if (cached) {
            if (!ignore) setData(cached);
            setLoading(false);
            return;
          }

          const res = await kyInstance
            .get("posts", { searchParams: { page, limit: 10 } })
            .json<PostsResponse>();
          // Cache the page response
          pagesCacheRef.current.set(page, res);
          if (!ignore) setData(res);
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Failed to load posts");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [page, searchTerm]);

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.page ?? page;

  return {
    page: currentPage,
    setPage,
    items,
    totalPages,
    loading,
    error,
    data,
    isSearching: Boolean(searchTerm.trim()),
  };
}
