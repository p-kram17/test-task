"use client";
import { useState, useEffect } from "react";
import ky from "ky";


export function LibPractice() {
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {

    const data = ky.get("GET https://jsonplaceholder.typicode.com/posts")
    .then(data => data.json())
    .catch(error => console.log(error));
    
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
