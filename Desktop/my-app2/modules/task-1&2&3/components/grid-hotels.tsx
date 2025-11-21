"use client";
import HotelCard from "./hotel-card";
import useLabelInputStore from "@/shared/store/use-label-input-store";

export interface IGridHotels {
  id: number;
  name: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  img: string;
}

export interface IGridHotelss {
  data: object[];
}

import { useRouter } from "next/navigation";

export default function GridHotels() {
  const HotelInfo = useLabelInputStore((state) => state.HotelInfo);
  const TourPrice = useLabelInputStore((state) => state.TourPrice);
  const router = useRouter();

  const handleOpenPrice = (hotelId: number | string, priceId: string) => {
    router.push(`/tour/${hotelId}/${priceId}`);
  };

  return (
    <section className="w-[700px] p-[25px] mx-auto bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
        {HotelInfo!.map((value, index) => (
          <HotelCard
            key={value.id}
            hotelName={value.name}
            cityName={value.cityName}
            countryName={value.countryName}
            startDate={TourPrice[index].startDate}
            price={TourPrice[index].amount}
            currency={TourPrice[index].currency}
            imageUrl={value.img}
            onOpenPrice={() => handleOpenPrice(value.id, TourPrice[index].id)}
          />
        ))}
      </div>
    </section>
  );
}
