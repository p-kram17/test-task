"use client";

import {
  MapPin,
  Building2,
  Wifi,
  WavesLadder,
  Utensils,
  Calendar,
  Mountain,
  Car,
  Dumbbell,
  Landmark,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { JSX } from "react";

interface ServiceItem {
  label: string;
  icon: string;
}

interface HotelCardProps {
  hotelName: string;
  countryName: string;
  cityName: string;
  image: string;
  description: string;
  services: ServiceItem[];
  date: string;
  price: string;
  currency: string;
}

const iconMap: Record<string, JSX.Element> = {
  wifi: <Wifi className="w-5 h-5" />,
  pool: <WavesLadder className="w-5 h-5" />,
  food: <Utensils className="w-5 h-5" />,
  mountain: <Mountain className="w-5 h-5" />,
  parking: <Car className="w-5 h-5" />,
  gym: <Dumbbell className="w-5 h-5" />,
  tour: <Landmark className="w-5 h-5" />,
  spa: <Utensils className="w-5 h-5" />,
};

export default function HotelCardWithDescription({
  hotelName,
  countryName,
  cityName,
  image,
  description,
  services,
  date,
  price,
  currency,
}: HotelCardProps) {
  return (
    <div className="w-full max-w-[380px] bg-white rounded-2xl shadow p-6 flex flex-col gap-6 text-black">
      <h2 className="text-[28px] font-semibold">{hotelName}</h2>

      <div className="flex items-center gap-6 text-[16px] text-gray-700">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>{countryName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          <span>{cityName}</span>
        </div>
      </div>

      <img
        src={image}
        alt={hotelName}
        className="w-full h-[180px] object-cover rounded-xl"
      />

      <div>
        <h3 className="text-[20px] font-semibold mb-1">Опис</h3>
        <p className="text-[16px] text-gray-700 leading-[1.4]">{description}</p>
      </div>

      <div>
        <h3 className="text-[20px] font-semibold mb-2">Сервіси</h3>
        <div className="flex items-center justify-between text-[16px]">
          {services.map((service) => (
            <div key={service.label} className="flex items-center gap-2">
              {iconMap[service.icon] ?? null}
              <span>{service.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full border-b"></div>

      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-2 text-[16px] text-gray-700">
          <Calendar className="w-5 h-5" />
          <span className="text-black">{date}</span>
        </div>

        <div className="flex items-center justify-between text-right">
          <p className="text-[clamp(5px,4vw,22px)] font-bold leading-none text-black">
            {price} {currency}
          </p>
          <Button color="openPrice" className="mt-2">
            Відкрити ціну
          </Button>
        </div>
      </div>
    </div>
  );
}
