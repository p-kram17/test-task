import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

export type TColorThemeStore = "dark" | "light";

export interface IThemeStore {
  theme: TColorThemeStore;
  setTheme: (theme: TColorThemeStore) => void;
}

export const useThemeStore = create<IThemeStore>()(
  devtools(
    persist(
    (set) => ({
      theme: "light",
      setTheme: (themeProps: TColorThemeStore) => set({ theme: themeProps }),
    }),
    { name: "theme-store" }
  )
));
