import { FC } from "react"
import { HeaderLogo } from "./components/header-logo"
import { HeaderInput } from './components/header-input';
import { HeaderRegistrationPanel } from "./components/header-registration-panel";
import { nunito900 } from "@/src/font/fonts";
import { nunito400 } from "@/src/font/fonts";

export const HeaderWrapper:FC = () => { 
  
    return  ( 
      <> 
      <div className="flex mx-[67px] my-[44px] gap-[40px] items-center"> 
        <HeaderLogo>
          <span className={`text-black ${nunito900.className} text-[24px] uppercase`}>Next Pizza</span>
          <span className={`${nunito400.className} text-4 text-tw-metal-300`}>смачніше уже нікуди </span>
        </HeaderLogo>
        <HeaderInput /> 
        <HeaderRegistrationPanel/> 
      </div>
      <hr className="h-[2px] bg-tw-light-gray-100  w-full" /> 
      </>
    )
}

