import { FC } from "react";
import { IBaseProps } from "@/src/types/global";
import { PizzaCardPartDescription } from './components/pizza-card-description-part';
import { PizzaCardImagePart } from "./components/pizza-card-image-part";

export const PizzaListWrapper: FC<IBaseProps> = () => { 
  return ( 
    <div 
      className="grid grid-cols-3 h-[700px] gap-x-[100px] gap-y-[20px] overflow-auto" 
      style={{ gridAutoRows: 'min-content' }}
    > 
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-[48px] max-w-[285px]">
          <PizzaCardImagePart imageSrc="/11ee7d60fda22358ac33c6a44eb093a2.avif" />    
          <PizzaCardPartDescription
            heading="Pizza - чо та там"
            price="68"
            mode="додати"
            description="Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок"
          />
        </div>
      ))}
    </div> 
  );
};
