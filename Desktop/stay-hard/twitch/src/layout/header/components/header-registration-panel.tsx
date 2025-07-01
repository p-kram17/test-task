import { IBaseProps } from "@/src/types/global";
import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';

export const HeaderRegistrationPanel:FC<IBaseProps> = ( ) => {
  return  ( 
    <div className="flex items-center gap-[15px]"> 
      <Popover>
        <PopoverTrigger className="flex items-center gap-[7px] w-full max-w-[110px] h-[50px] px-[22px] py-[14px] border-2 rounded-[15px] border-tw-orange-900 text-tw-orange-900">
          <User className="w-[32px] h-[32px] text-tw-orange-900" />
          <span>Open</span>
        </PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
        <div className="flex items-center justify-center h-[50px] w-[50px] rounded-[15px] border-2 border-tw-orange-900 text-white"> 
          <ShoppingCart className="text-tw-orange-900" />
        </div>
    </div>
  )
}