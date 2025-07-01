"use client"
import { FC, useState } from "react";
import { nunito700 } from "@/src/font/fonts";
import { nunito400 } from "@/src/font/fonts";
import { IPizzaCardPartDescription } from "../types/i-piizza-card-description";
import { PizzaCardActionSwitcher } from "./render-mode";

export const PizzaCardPartDescription: FC<IPizzaCardPartDescription> = ({
  heading,
  price,
  mode,
  description,
}) => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="flex flex-col gap-[10px]">
      <span className={`text-[22px] ${nunito700.className}`}>{heading}</span>

      <span className={`text-[rgba(177,177,177,1)] ${nunito400.className}`}>
        {description}
      </span>

      <div className="flex justify-between items-center">
        <span className={`text-[18px] ${nunito700.className}`}>від {price}</span>
        <PizzaCardActionSwitcher mode={mode} count={count} setCount={setCount} />
      </div>
    </div>
  );
};
