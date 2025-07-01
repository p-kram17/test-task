import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { nunito700 } from "@/src/font/fonts";
import { IPizzaCardActionSwitcher } from "../types/i-pizza-card-action-switcher";
import { ReactNode } from "react";

export const PizzaCardActionSwitcher: FC<IPizzaCardActionSwitcher> = ({
  mode,
  count,
  setCount,
}) => {
  const modeMap: Record<IPizzaCardActionSwitcher["mode"], () => ReactNode> = {
    "зібрати": () => (
      <Button className="w-full max-w-[125px] h-[42px] rounded-[15px] text-tw-orange-900 bg-[rgba(255,250,244,1)]">
        <Image src="/Group-plus.png" alt="зібрати" width={14} height={14} />
        зібрати
      </Button>
    ),

    "додати": () => (
      <Button className="w-full max-w-[125px] h-[42px] rounded-[15px] text-tw-orange-900 bg-[rgba(255,250,244,1)]">
        <Plus className="text-tw-orange-900" />
        додати
      </Button>
    ),

    "checkbox-mode": () => (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="w-[42px] h-[42px] rounded-[15px] border-2 border-tw-orange-900 text-tw-orange-900"
          onClick={() => setCount(Math.max(1, count - 1))}
        >
          <Minus size={16} />
        </Button>

        <span className={`text-[20px] ${nunito700.className}`}>{count}</span>

        <Button
          variant="outline"
          className="w-[42px] h-[42px] rounded-[15px] border-2 border-tw-orange-900 text-tw-orange-900"
          onClick={() => setCount(count + 1)}
        >
          <Plus size={16} />
        </Button>
      </div>
    ),
  };

  return modeMap[mode]();
};
