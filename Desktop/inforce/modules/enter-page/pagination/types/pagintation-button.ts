import type { ComponentType, MouseEventHandler, ReactNode } from "react";

export type PaginationButton = {
  label: string;
  onClick: () => number;
  disabled: boolean;
  Component: ComponentType<{
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    children?: ReactNode;
  }>;
};
