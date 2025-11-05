import { IBaseProps } from "../types/base-props";
import { cn } from "../lib/utils";
import { useThemeStore } from "../store/use-theme-store";

export function Background({ children, className }: IBaseProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <section
      className={cn(
        "min-h-screen flex flex-col items-center justify-center w-full transition-colors duration-500",
        theme === "light"
          ? "bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900"
          : "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white",
        className
      )}
    >
      {children}
    </section>
  );
}
