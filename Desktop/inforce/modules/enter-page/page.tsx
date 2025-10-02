"use client";

import { useEffect } from "react";
import { SearchInputWrapper } from "./search-section/search-section";
import { PostsListWrapper } from "./posts-list/post-list-wrapper";
import { PaginationWrapper } from "./pagination/pagination-wrapper";
import { Card } from "@/shared/shad-cn/card";
import { useSearch } from "./hooks/use-search";
import { usePosts } from "./hooks/use-posts";

export default function EnterPage() {
  const {
    searchTerm,
    notice,
    handleSearch,
    clearSearch,
    setNotice,
    isSearching,
  } = useSearch();
  const { page, setPage, items, totalPages, loading, error } =
    usePosts(searchTerm);

  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(id);
  }, [notice, setNotice]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-6 p-6">
      <header className="w-full max-w-3xl flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Posts Explorer</h1>

        <SearchInputWrapper
          onSearch={(term) => {
            setPage(1);
            handleSearch(term);
          }}
        />

        <div
          className={`flex items-center gap-2 text-sm text-gray-600 ${
            isSearching ? "flex" : "hidden"
          }`}
        >
          <span className="flex gap-1">
            Режим пошуку за запитом: <strong>"{searchTerm}"</strong>
          </span>
          <button
            className="underline text-blue-700 hover:text-blue-900"
            onClick={clearSearch}
          >
            Очистити
          </button>
        </div>

        <Card
          className={`px-3 py-2 text-sm text-blue-800 border-blue-200 bg-blue-50 ${
            notice ? "block" : "hidden"
          }`}
        >
          {notice}
        </Card>
      </header>

      <main className="w-full max-w-3xl flex flex-col gap-4">
        <div
          className={`text-sm text-gray-500 ${loading ? "block" : "hidden"}`}
        >
          Завантаження…
        </div>

        <Card
          className={`px-3 py-2 border-red-200 bg-red-50 text-red-700 text-sm ${
            error ? "block" : "hidden"
          }`}
        >
          {error}
        </Card>

        <div
          className={`${!loading && !error && items.length > 0 ? "block" : "hidden"}`}
        >
          <PostsListWrapper items={items} />
        </div>

        <div
          className={`text-sm text-gray-500 ${
            !loading && !error && isSearching && items.length === 0
              ? "block"
              : "hidden"
          }`}
        >
          Нічого не знайдено за цим запитом.
        </div>
      </main>

      <footer className="w-full max-w-3xl flex justify-center py-4">
        <div className={`${!isSearching ? "block" : "hidden"}`}>
          <PaginationWrapper
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </footer>
    </div>
  );
}
