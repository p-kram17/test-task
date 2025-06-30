import axios from "axios"
const URL ="https://chatgpt.com/c/68622732-2690-800b-b965-a10ccf03df48"

export const axiosInstance = axios.create({
  headers:{
    "Content-Type":"aaplication-json"
  },
  timeout: 5000,
  baseURL:URL
})