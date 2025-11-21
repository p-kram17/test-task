import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface TourPrice {
  id: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  hotelID: string;
}

export interface HotelInfo {
  id: number | string;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
}

export interface IGeoItem {
  id?: number;
  name: string;
  type: "country" | "city" | "hotel";
  img?: string;
  countryName?: string;
  cityName?: string;
}

export interface IPriceOffer {
  id: string;
  amount: number;
  currency: "usd";
  startDate: string;
  endDate: string;
  hotelID: string;
}

export interface IUseLabelInputStore {
  token?: string;
  time?: string;

  TourPrice: [] | TourPrice[];
  HotelInfo: [] | HotelInfo[];
  setHotelInfo: (data: HotelInfo[]) => void;
  setTourPice: (data: TourPrice[]) => void;

  getSearchPricesData: IPriceOffer[] | null;
  setGetSearchPricesData: (data: IPriceOffer[]) => void;

  hotels: IGeoItem[];
  setHotels: (data: IGeoItem[]) => void;

  setToken: (token: string) => void;
  setTime: (time: string | Date) => void;

  chosenElement: string;
  inputData: IGeoItem[];
  selectedItem: IGeoItem | null;

  setChosenElement: (data: string) => void;
  setInputData: (data: IGeoItem[]) => void;
  setSelectedItem: (item: IGeoItem | null) => void;
}

const useLabelInputStore = create<IUseLabelInputStore>()(
  devtools(
    immer((set) => ({
      hotels: [],
      token: undefined,
      time: undefined,
      inputData: [],
      selectedItem: null,
      chosenElement: "",
      getSearchPricesData: null,
      TourPrice: [],
      HotelInfo: [],

      setGetSearchPricesData: (data: IPriceOffer[]) =>
        set((state) => {
          state.getSearchPricesData = data;
        }),

      setHotels: (data: IGeoItem[]) =>
        set((state) => {
          state.hotels = data;
        }),

      setToken: (token: string) =>
        set((state) => {
          state.token = token;
        }),

      setTime: (time: string | Date) =>
        set((state) => {
          const date = new Date(time);
          if (isNaN(date.getTime())) {
            console.warn("Invalid date passed to setTime:", time);
            state.time = undefined;
            return;
          }
          state.time = date.toISOString();
        }),

      setChosenElement: (data: string) =>
        set((state) => {
          state.chosenElement = data;
        }),

      setInputData: (data: IGeoItem[]) =>
        set((state) => {
          state.inputData = data;
        }),

      setSelectedItem: (item: IGeoItem | null) =>
        set((state) => {
          state.selectedItem = item;
        }),

      setTourPice: (data: TourPrice[]) =>
        set((state) => {
          state.TourPrice = data;
        }),

      setHotelInfo: (data: HotelInfo[]) =>
        set((state) => {
          state.HotelInfo = data;
        }),
    })),
  ),
);

export default useLabelInputStore;
