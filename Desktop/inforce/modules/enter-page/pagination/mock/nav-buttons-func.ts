import {
  PaginationNext,
  PaginationPrevious,
} from "@/shared/shad-cn/pagination";
import type { PaginationButton } from "../types/pagintation-button";

export const getNavButtons = (
  page: number,
  totalPages: number,
  canPrev: boolean,
  canNext: boolean,
): PaginationButton[] => [
  {
    label: "« Перша",
    onClick: () => 1,
    disabled: !canPrev,
    Component: PaginationPrevious,
  },
  {
    label: "‹ Назад",
    onClick: () => page - 1,
    disabled: !canPrev,
    Component: PaginationPrevious,
  },
  {
    label: "Вперед ›",
    onClick: () => page + 1,
    disabled: !canNext,
    Component: PaginationNext,
  },
  {
    label: "Остання »",
    onClick: () => totalPages,
    disabled: !canNext,
    Component: PaginationNext,
  },
];
