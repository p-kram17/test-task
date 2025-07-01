import Image from "next/image";
import { IPizzaCardImagePart } from "../types/i-pizza-card-image-part";


export const PizzaCardImagePart = ({ imageSrc, alt = "pizza" }: IPizzaCardImagePart) => {
  return (
    <div className="flex items-center justify-center w-full max-w-[285px] h-[260px] rounded-[15px] relative bg-[rgba(255,247,238,1)] ">
        <Image
          src="/lucide_settings-2.svg"
          width={24}
          height={24}
          alt="icon"
          className="absolute top-2 right-2"
        />
      <Image
        src={imageSrc}
        width={212}
        height={212}
        alt={alt}
      />
    </div>
  );
};
