import { FC } from "react"
import { nunito700 } from "@/src/font/fonts"
import { CheckboxFilter } from "./components/check-box-filter"
import { checkboxDescription, checkboxIngredients } from './constants/checkboxes';
import { RadioGroupFilter } from "./components/radio-group-filter";
import { radioGroupDescription } from "./constants/radio-group";
import { Button } from "@/components/ui/button";


export const FiltrationWrapper: FC = () => { 
  return ( 
    <div className={`flex flex-col gap-[20px] w-full max-w-[244px] text-[16px] mx-[67px] my-[44px] ${nunito700.className}`}> 
      <span className={`text-[22px] text-black ${nunito700.className}`}>Фільтрація</span>
      <CheckboxFilter checkboxDescription={checkboxDescription}/>
      <hr className="w-full h-[2px] bg-tw-white-200"/>
      <span className={`text-[22px] text-black ${nunito700.className}`}>Ингредиенты</span>
      <CheckboxFilter className="h-[244px]" checkboxDescription={checkboxIngredients} />
      <span className={`text-[22px] text-black ${nunito700.className}`}>Ціна від А  до Я </span>
      <span className="text-tw-orange-900">+Показити все</span>
      <span className={`text-[22px] text-black ${nunito700.className}`}> Тип Тіста</span>
      <RadioGroupFilter radioGroupFilter={radioGroupDescription} />
      <Button className="rounded-[18px] bg-tw-orange-900 w-full h-[50px] text-[16px]">
        Activate
      </Button>
    </div>
  )
}

