import { TabListWrapper } from "@/src/modules/main-page/layout/tab-list/tab-list-wrapper";
import { FiltrationWrapper } from '../src/modules/main-page/layout/filtration/filtration-wrapper';
import { PizzaListWrapper } from "@/src/modules/main-page/layout/pizza-list-block/pizza-list-block-wrapper";

export default function Home() {
  return ( 
    <> 
      <TabListWrapper />
      <div className="flex  gap-[48px]"> 
        <FiltrationWrapper />
          <PizzaListWrapper /> 
      </div>
    </>
  )
}
