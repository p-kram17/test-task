import ky from "ky";

const URL = "http://localhost:4000";

export const kyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  retry: {
    limit: 2,
  },
});
