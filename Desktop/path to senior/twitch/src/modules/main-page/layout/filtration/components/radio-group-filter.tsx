import { FC } from "react";
import { Label } from "@/components/ui/label";
import { nunito400 } from "@/src/font/fonts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IFilteringRadioGroup } from "../types/radio-group-filter";


export const RadioGroupFilter: FC<IFilteringRadioGroup> = ({ radioGroupFilter }) => {
  return (
    <RadioGroup defaultValue={radioGroupFilter[0]} className="flex flex-col gap-4">
      {radioGroupFilter.map((value) => (
        <div key={value} className="flex  items-center gap-3">
          <RadioGroupItem className="border-0 bg-[rgba(241,241,241,1)] w-[24px] h-[24px]  "
            value={value} 
            id={value}
          />
          <Label
            htmlFor={value}
            className={`text-sm text-gray-800 cursor-pointer ${nunito400.className}`}
          >
            {value}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
