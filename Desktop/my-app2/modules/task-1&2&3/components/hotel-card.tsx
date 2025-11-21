import { formatPrice } from "@/shared/utils/format-price";
import { formatDate } from "@/shared/utils/format-date";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export interface HotelCardProps {
  hotelName: string;
  cityName: string;
  countryName: string;
  startDate: string;
  price: number;
  currency?: string;
  imageUrl?: string;
  onOpenPrice?: () => void;
}

export default function HotelCard({
  hotelName,
  cityName,
  countryName,
  startDate,
  price,
  currency = "грн",
  imageUrl,
  onOpenPrice,
}: HotelCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-md overflow-hidden flex flex-col w-full max-w-[340px] h-fit p-[25px]">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={hotelName}
          className="w-full h-[180px] object-cover rounded-lg"
        />
      )}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{hotelName}</h2>
        <p className="text-gray-600">
          {countryName}, {cityName}
        </p>
        <p className="text-gray-800">Старт туру: {formatDate(startDate)}</p>
        <p className="text-xl font-bold text-blue-900">
          {formatPrice(price, currency)}
        </p>
        <Button
          size="sm"
          color="primary"
          onClick={onOpenPrice}
          className={cn("text-center", !onOpenPrice && "hidden")}
        >
          Відкрити ціну
        </Button>
      </div>
    </div>
  );
}
