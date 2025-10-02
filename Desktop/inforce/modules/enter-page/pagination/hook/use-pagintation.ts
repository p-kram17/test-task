"use client";
import { PaginationProps } from "../types/pagination-props";

export function usePagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const go = (p: number) => () => onPageChange(p);

  const start = Math.max(1, page - 1);
  const end = Math.min(totalPages, page + 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return { canPrev, canNext, go, pages };
}
