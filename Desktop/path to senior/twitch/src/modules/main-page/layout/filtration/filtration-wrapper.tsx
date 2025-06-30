import { FC } from "react"
import { nunito700 } from "@/src/font/fonts"
import { CheckboxFilter } from "./components/checkbox-filter"
import { checkboxDescription, checkboxIngredients } from './constants/checkboxes';
import { RadioGroupFilter } from "./components/radio-group-filter";
import { radioGroupDescription } from "./constants/radio-group";


export const FiltrationWrapper: FC = () => { 
  return ( 
    <div className={`flex flex-col gap-[20px] w-fit text-[16px] mx-[67px] my-[44px] s${nunito700.className}`}> 
      <span className="text-black text-[22px]">Фільтрація</span>
      <CheckboxFilter checkboxDescription={checkboxDescription}/>
      <span className="text-black text-[22px]">Ингредиенты</span>
      <CheckboxFilter checkboxDescription={checkboxIngredients} />
      <span className="text-[rgba(254,95,0,1)]">+Показити все</span>
      <span className="text-black text-[22px]">Тип Тіста</span>
      <RadioGroupFilter radioGroupFilter={radioGroupDescription} />
    </div>
  )
}

