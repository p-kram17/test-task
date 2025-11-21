import { ReactNode } from "react";
import { cn } from "../lib/utils";

export interface ListOfDataProps {
  className?: string;
  children: ReactNode;
}

export function ListOfData({ className, children }: ListOfDataProps) {
  return (
    <div className={cn("flex flex-col gap-[2px] rounded-2xl", className)}>
      {children}
    </div>
  );
}
