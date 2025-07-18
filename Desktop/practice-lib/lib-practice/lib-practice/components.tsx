"use client";

import { useState, useEffect } from "react";
import ky from "ky";
import { current } from "immer";


export function LibPractice() {
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const data = new URLSearchParams({ 
      key:"naruto",
      suka:"pizda",
    });

    const fetchData = async () => {
      try {
        const response = await ky.get("https://jsonplaceholder.typicode.com/comments");
        const data = await response.json();
        setIsLoading(true);
        console.log(data);
      } catch (error) {
        console.error("Помилка:", error);
      }
    };

  }, []);

  return (
    <div className="flex flex-col gap-[20px]">
      <button className="bg-red-900" onClick={() => setNumber(current=> current + 1)} >
        додати
      </button>
      <button className="bg-red-900" onClick={() => setNumber(current => current - 1)}>
        видалити
      </button>
      <button className="bg-red-900">{number}</button>
    </div>
  );
}
