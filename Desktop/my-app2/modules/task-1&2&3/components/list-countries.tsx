"use client";

import { ListOfData } from "@/shared/ui/list-data";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect, SetStateAction, Dispatch, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/shared/utils/api";
import useLabelInputStore from "@/shared/store/use-label-input-store";
import { cn } from "@/shared/lib/utils";
import { getIcon } from "@/shared/utils/get-icon";
import { IBaseProps } from "@/shared/types/base-props";
import { useRouter, usePathname } from "next/navigation";

export interface IListOfCountries extends IBaseProps {
  setClickInput: Dispatch<SetStateAction<boolean>>;
}

export function ListCountries({ setClickInput, className }: IListOfCountries) {
  const pathname = usePathname();
  const inputData = useLabelInputStore((state) => state.inputData);
  const setInputData = useLabelInputStore((state) => state.setInputData);
  const setChosenElement = useLabelInputStore(
    (state) => state.setChosenElement,
  );
  const setSelectedItem = useLabelInputStore((state) => state.setSelectedItem);
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await getCountries();
      return res.json();
    },
  });

  const handleClickRedirectOnHotelPage = (item: any) => {
    if (item.type === "hotel" && item.id) {
      const basePath = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;
      router.push(`${basePath}/${item.id}`);
    }
  };

  useEffect(() => {
    if (data) {
      setInputData(Object.values(data));
    }
  }, [data, setInputData]);

  return (
    <ListOfData
      className={cn(
        "absolute top-full px-[20px] py-[10px] left-0 mt-2 w-full max-w-[250px] shadow-lg rounded-lg overflow-hidden z-10 bg-white",
        className,
      )}
    >
      {/* Skeleton */}
      <div className={cn(isLoading ? "" : "hidden")}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="mb-2 min-h-[20px]" />
        ))}
      </div>

      {/* Error */}
      <div className={cn("text-red-600", error ? "" : "hidden")}>
        Error: {(error as Error)?.message}
      </div>

      {/* No data */}
      <div
        className={cn(
          "text-gray-500",
          !isLoading && !error && inputData?.length === 0 ? "" : "hidden",
        )}
      >
        No data
      </div>

      {/* List of countries / hotels */}
      <div
        className={cn(
          inputData && inputData.length > 0 && !isLoading && !error
            ? ""
            : "hidden",
        )}
      >
        {inputData?.map((item: any, i: number) => {
          const Icon = getIcon(item.type);

          return (
            <div
              key={i}
              className="mb-2 min-h-[20px] flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setChosenElement(item.name);
                setSelectedItem(item);
                setClickInput(false);
                handleClickRedirectOnHotelPage(item);
              }}
            >
              <img
                src={item.flag}
                alt={item.name}
                className={cn("w-5 h-5", !item.flag && "hidden")}
              />

              {Icon && <Icon className="w-5 h-5 text-black" />}

              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </ListOfData>
  );
}

export const MemoListCountries = memo(ListCountries);
