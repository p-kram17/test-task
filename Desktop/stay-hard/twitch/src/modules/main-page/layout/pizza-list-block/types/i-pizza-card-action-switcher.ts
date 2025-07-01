export interface IPizzaCardActionSwitcher {
  mode: "зібрати" | "додати" | "checkbox-mode";
  count: number;
  setCount: (value: number) => void;
}