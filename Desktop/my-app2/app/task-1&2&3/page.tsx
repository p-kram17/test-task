"use client";
import { Button } from "@/shared/ui/button";
import { LabelInput } from "@/shared/ui/label-input";
import { useState, useRef, ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import {
  searchGeo,
  startSearchPrices,
  getSearchPrices,
  stopSearchPrices,
  getHotels,
} from "@/shared/utils/api";
import useLabelInputStore from "@/shared/store/use-label-input-store";
import { ListCountries } from "@/modules/task-1&2&3/components/list-countries";
import GridHotels from "@/modules/task-1&2&3/components/grid-hotels";
import { debounce } from "@/shared/lib/debounce";

export interface IListOfCountries {
  setClickInput: Dispatch<SetStateAction<boolean>>;
}

export default function Pages() {
  const [clickInput, setClickInput] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const activeTokenRef = useRef<string | null>(null);

  const setGetSearchPricesData = useLabelInputStore(
    (state) => state.setGetSearchPricesData,
  );
  const setHotelInfo = useLabelInputStore((state) => state.setHotelInfo);
  const setTourPice = useLabelInputStore((state) => state.setTourPice);
  const setInputData = useLabelInputStore((state) => state.setInputData);
  const chosenElement = useLabelInputStore((state) => state.chosenElement);
  const setChosenElement = useLabelInputStore(
    (state) => state.setChosenElement,
  );
  const setToken = useLabelInputStore((state) => state.setToken);
  const setTime = useLabelInputStore((state) => state.setTime);
  const selectedItem = useLabelInputStore((state) => state.selectedItem);
  const hotelInfo = useLabelInputStore((state) => state.HotelInfo);

  const debouncedSearchGeo = useCallback(
    debounce((value: string) => {
      if (value.trim().length > 1) {
        searchGeo(value)
          .then((res) => res.json())
          .then((data) => {
            setInputData(Object.values(data));
          });
      }
    }, 500),
    [setInputData]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChosenElement(value);
    debouncedSearchGeo(value);
  };

  const pollResults = async (
    searchToken: string,
    waitTime: string,
    retryCount = 0,
  ) => {
    if (activeTokenRef.current !== searchToken) return;

    const waitMs = new Date(waitTime).getTime() - Date.now();
    if (waitMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }

    if (activeTokenRef.current !== searchToken) return;

    try {
      const res = await getSearchPrices(searchToken);

      if (res.status === 200) {
        const data = await res.json();
        setGetSearchPricesData(Object.values(data.prices));
        setTourPice(Object.values(data.prices));
        setIsSearching(false);
        setIsSubmitting(false);
        activeTokenRef.current = null;
        setHasSearched(true);

        if (selectedItem?.id) {
          getHotels(selectedItem.id)
            .then((data) => data.json())
            .then((data) => {
              setHotelInfo(Object.values(data));
            });
        }
      } else if (res.status === 425) {
        const data = await res.json();
        pollResults(searchToken, data.waitUntil, 0);
      } else {
        throw new Error("Search failed");
      }
    } catch (e) {
      console.error(e);
      if (retryCount < 2) {
        console.log(`Retrying... attempt ${retryCount + 1}`);
        pollResults(searchToken, waitTime, retryCount + 1);
      } else {
        setError("Не вдалося знайти тури. Спробуйте пізніше.");
        setIsSearching(false);
        setIsSubmitting(false);
      }
    }
  };

  const handleSearchClick = async () => {
    if (!selectedItem?.id) {
      console.warn("No country selected");
      return;
    }

    setIsSubmitting(true);
    setIsSearching(true);
    setError(null);
    setHasSearched(false);

    if (activeTokenRef.current) {
      try {
        await stopSearchPrices(activeTokenRef.current);
      } catch (e) {
        console.error("Failed to stop search", e);
      }
      activeTokenRef.current = null;
    }

    setGetSearchPricesData([]);
    setTourPice([]);
    setHotelInfo([]);

    try {
      const startRes = await startSearchPrices(selectedItem.id).then((r) =>
        r.json(),
      );
      const newToken = startRes.token;
      const waitUntil = startRes.waitUntil;

      setToken(newToken);
      setTime(waitUntil);
      activeTokenRef.current = newToken;

      pollResults(newToken, waitUntil);
    } catch (e) {
      console.error(e);
      setError("Помилка при старті пошуку.");
      setIsSearching(false);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <section
      onClick={() => setClickInput(false)}
      className="flex flex-col items-center justify-center w-full min-h-screen gap-8 bg-gray-100"
    >
      <div className="flex flex-col items-center gap-[30px] w-full max-w-[250px] rounded-[5px] py-[20px] px-[10px] bg-white relative">
        <LabelInput
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          setIsClickedOnInput={setClickInput}
          value={chosenElement}
          id="Form"
          label="Форма пошуку турів"
          labelClassName="mx-auto text-black text-[20px]"
          InputClassName="mx-auto mt-[10px] px-[20px]"
        >
          {clickInput && <ListCountries setClickInput={setClickInput} />}
        </LabelInput>

        <Button
          onClick={handleSearchClick}
          className="w-full rounded-[7px]"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Ініціалізація..." : "Знайти"}
        </Button>

        {isSearching && !isSubmitting && (
          <div className="text-blue-500 text-sm">Шукаємо тури...</div>
        )}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
      </div>

      {hasSearched && !isSearching && !error && hotelInfo.length === 0 ? (
        <div className="text-gray-500 text-lg">
          За вашим запитом турів не знайдено
        </div>
      ) : (
        <GridHotels />
      )}
    </section>
  );
}
