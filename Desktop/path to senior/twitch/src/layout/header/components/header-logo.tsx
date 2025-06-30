import {  FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IHeaderLogo } from "../types/header-logo-types";

export const HeaderLogo:FC<IHeaderLogo> =  ({
  children, 
  className, 
  alt, 
  src
}) => { 
  return ( 
    <div className={cn("flex gap-[15px] items-center",className)} > 
      <Image 
        src={src || "/logo-pitza.png"}
        width={35}
        height={35}
        alt={alt || "header-logo"}
      />
      <div className="flex flex-col gap-[3px]"> 
        {children}
      </div>
    </div>
  )

}