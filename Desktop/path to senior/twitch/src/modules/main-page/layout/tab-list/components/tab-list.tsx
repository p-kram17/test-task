import { 
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { tabList } from "../mock/mock-tab-list"

export const TabList = () => {
  return ( 
  <div className="flex items-center justify-between"> 
    <Tabs 
      defaultValue="account"
      className="flex items-center max-w-[775px] w-full"
    >
      <TabsList className="flex items-center bg-[rgba(250,250,250,1)] min-h-[55px]">
        {tabList.map(value =>   
          <TabsTrigger 
            key={value}
            className="focus:bg-[rgba(255,255,255,1)] px-[25px] py-[10px] focus:shadow-md  text-tw-orange-900 text-4"
            value={value}
          >
            {value}
          </TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  </div>
  )
}  
