"use client";
import { useState, useEffect } from "react";
import ky from "ky";
import { Instanceky } from "./ky-instance";
import { promise } from "zod/v4-mini";


export function LibPractice() {
  const [number, setNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  useEffect(() => { 

    ky.get('https://jsonplaceholder.typicode.com/posts')
  .json()
  .then(posts => {
    console.log(posts);
    return Promise.all(posts.slice(0, 3).map(post => {
      return ky.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .json()
        .then(comments => ({
          postId: post.id,
          comments
        }));
    }));
  })
  .then(result => {
    console.log("Коментарі до кожного поста:", result);
  })
  .catch(console.error);


  }, []);

    return ( 
    <div className="flex flex-col gap-[20px]">
      <button className="bg-red-900" onClick={() => setNumber(current => current + 1)} >
        додати
      </button>
      <button className="bg-red-900" onClick={() => setNumber(current => current - 1)}>
        видалити
      </button>
      <button className="bg-red-900">{number}</button>
    </div>
  );
}
