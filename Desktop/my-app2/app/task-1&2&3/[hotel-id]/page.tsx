"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getHotel, getPrice } from "@/shared/utils/api";
import HotelCardWithDescription from "@/modules/hotel-id/components/card";

export default function Hotels() {
  const params = useParams();
  const rawId = params["hotel-id"];
  const hotelId = Array.isArray(rawId) ? rawId[0] : rawId;

  const {
    data: hotelData,
    isLoading: hotelLoading,
    error: hotelError,
  } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: async () => {
      const res = await getHotel(Number(hotelId));
      return res.json();
    },
    enabled: !!hotelId,
  });

  const {
    data: priceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["price", hotelId],
    queryFn: async () => {
      const res = await getPrice(hotelId);
      return res.json();
    },
    enabled: !!hotelId,
  });

  if (!hotelData || !priceData) return <p>Loading...</p>;

  const formattedServices = Object.entries(hotelData.services).map(
    ([key, value]) => ({
      label: value,
      icon: key,
    }),
  );

  return (
    <section className="w-full flex items-center p-[25px] bg-gray-100 min-h-screen  justify-center">
      <HotelCardWithDescription
        cityName={hotelData.cityName}
        date={priceData.startDate}
        countryName={hotelData.countryName}
        price={priceData.amount}
        image={hotelData.img}
        services={formattedServices}
        hotelName={hotelData.name}
        description={hotelData.description}
        currency={priceData.currency}
      />
    </section>
  );
}
