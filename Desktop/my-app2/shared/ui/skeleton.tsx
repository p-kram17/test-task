import { cn } from "../lib/utils";

export interface ISkeletonProps {
  className?: string;
  isExists?: boolean;
}

export function Skeleton({ className, isExists }: ISkeletonProps) {
  return (
    <div
      className={cn(
        "bg-gray-300 w-full rounded mb-2",
        isExists === false && "hidden",
        className,
      )}
    />
  );
}
