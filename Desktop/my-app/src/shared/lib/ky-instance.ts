import ky from "ky";

export const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_URL,
  credentials: "include",
  retry: {
    limit: 2,
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
