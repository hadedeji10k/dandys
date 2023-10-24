import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/utils/axiosInstance";
import { dandysToken } from "@/utils/constant";
import { decode } from "@/utils/helpers";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const encodedToken = window.localStorage.getItem(dandysToken);
      const token = decode(encodedToken!);
      headers.set("content-type", "application/json");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = api;
