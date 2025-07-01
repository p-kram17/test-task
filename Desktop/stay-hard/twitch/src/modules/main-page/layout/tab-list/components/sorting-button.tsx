import { IBaseProps  } from "@/src/types/global"
import { FC } from "react"
import { ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { nunito400 } from "@/src/font/fonts";
import { cn } from "@/lib/utils";

export interface ISortingButton extends IBaseProps{
  mode:"rating" | "price" | ""; 
}

export const SortingButton:FC<ISortingButton> = ({mode}) =>  {
  return  ( 
    <Button className={cn("flex items-center gap-[10px] w-full max-w-[240px] h-[55px] rounded-[15px] bg-tw-whitee-100 text-black",nunito400.className)}> 
      <ArrowUpDown />
      Sorting: <span className="text-tw-orange-900">
        {mode}
      </span>
    </Button>
  )
}