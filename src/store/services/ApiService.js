import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Apiservice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["stocks", "category", "auth","order","delivery" , "client"],
  endpoints: (builder) => ({}),
});
