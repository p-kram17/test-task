import { FC } from "react"
import { IBaseProps } from "@/src/types/global"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';

export const HeaderInput:FC<IBaseProps> = () => { 
  return ( 
    <div className="flex items-center justify-between w-full max-w-[1000px] h-[50px] px-[20px] rounded-[15px] bg-[rgba(249,249,249,1)]">
      <Search
        size={22}
        className="text-[rgba(30, 30, 30, 1)]"
      />

      <Input
        className=""
        placeholder="Пошук Піци"
      />
    </div>
  )
}