import Image from "next/image";
import { TabListWrapper } from "@/src/modules/main-page/layout/tab-list/tab-list-wrapper";
import { CheckboxFilter } from "@/src/modules/main-page/layout/filtration/components/checkbox-filter";
import { FiltrationWrapper } from '../src/modules/main-page/layout/filtration/filtration-wrapper';

export default function Home() {
  return ( 
    <> 
      <TabListWrapper />
      <FiltrationWrapper />
    </>
  )
}
