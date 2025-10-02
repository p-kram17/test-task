"use client";

import { useEffect, useState } from "react";

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notice, setNotice] = useState<string | null>(null);

  // Restore last search term from localStorage on mount
  useEffect(() => {
    try {
      const savedTerm = localStorage.getItem("lastSearchTerm") || "";
      if (savedTerm) setSearchTerm(savedTerm);
    } catch {}
  }, []);

  // Auto clear notice
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(null), 3000);
    return () => clearTimeout(id);
  }, [notice]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setNotice(`Пошук: "${term}"`);
    try {
      localStorage.setItem("lastSearchTerm", term);
    } catch {}
  };

  const clearSearch = () => {
    setSearchTerm("");
    setNotice("Повернення до списку постів");
  };

  return {
    searchTerm,
    setSearchTerm,
    notice,
    setNotice,
    handleSearch,
    clearSearch,
    isSearching: Boolean(searchTerm.trim()),
  };
}
