import { FC } from "react"
import { TabList } from "./components/tab-list";
import { SortingButton } from './components/sorting-button';
import { nunito800 } from "@/src/font/fonts";

export const TabListWrapper: FC = () => { 
    return ( 
    <div className="mx-[67px]"> 
      <span className={`${nunito800.className}  text-black text-[36px]`}>Всі піцци</span>
      <div className="flex justify-between text-[16px] my-[44px] gap-[40px] items-center"> 
        <TabList />
        <SortingButton mode="price"/>
      </div>
    </div>
    )
}

