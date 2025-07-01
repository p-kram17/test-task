import { FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { nunito400 } from "@/src/font/fonts";
import { ICheckBoxFilter } from "../types/checkbox-types";


export const CheckboxFilter: FC<ICheckBoxFilter> = ({ checkboxDescription }) => {
  return (
    <div className="flex flex-col gap-4 overflow-auto ">
      {checkboxDescription.map((value) => (
        <div key={value} className="flex items-center gap-3">
          <Checkbox 
            className="w-[24px] h-[24px]"
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
    </div>
  );
};
