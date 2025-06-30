import { FC } from "react"
import { TabList } from "./components/tab-list";
import { SortingButton } from './components/sorting-button';

export const TabListWrapper: FC = () => { 

    return ( 
      <div className="flex justify-between text-[16px] mx-[67px] my-[44px] gap-[40px] items-center"> 
        <TabList />
        <SortingButton mode="price"/>
      </div>
    )
}

