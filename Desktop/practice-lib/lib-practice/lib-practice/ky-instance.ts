import { request } from "http";
import ky from "ky";
import { optional } from "zod/v4-mini";


export const Instanceky = ky.create({
  prefixUrl:"https://jsonplaceholder.typicode.com/",
  hooks:{
    afterResponse:[(request,optional,response)=>{ 
      console.log(response);
      console.log(request);
      console.log(optional);
    }],
  beforeRequest: [request => {
    console.log(request);
  }]
  }
})