"use client";
import { memo, useMemo } from "react";
import { PaginationProps } from "./types/pagination-props";
import { Pagination as UIPagination } from "@/shared/shad-cn/pagination";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/shared/shad-cn/pagination";
import { usePagination } from "./hook/use-pagintation";
import { getNavButtons } from "./mock/nav-buttons-func";

function PaginationWrapperBase(props: PaginationProps) {
  if (props.totalPages <= 1) return null;

  const { canPrev, canNext, go, pages } = usePagination(props);

  const navButtons = useMemo(
    () => getNavButtons(props.page, props.totalPages, canPrev, canNext),
    [props.page, props.totalPages, canPrev, canNext],
  );

  return (
    <UIPagination>
      <PaginationContent>
        {navButtons
          .slice(0, 2)
          .map(({ label, onClick, disabled, Component }) => (
            <PaginationItem key={label}>
              <Component onClick={go(onClick())} disabled={disabled}>
                {label}
              </Component>
            </PaginationItem>
          ))}

        {pages[0] > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink onClick={go(p)} isActive={p === props.page}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pages[pages.length - 1] < props.totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {navButtons.slice(2).map(({ label, onClick, disabled, Component }) => (
          <PaginationItem key={label}>
            <Component onClick={go(onClick())} disabled={disabled}>
              {label}
            </Component>
          </PaginationItem>
        ))}
      </PaginationContent>
    </UIPagination>
  );
}

export const PaginationWrapper = memo(PaginationWrapperBase);
