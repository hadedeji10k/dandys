import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/utils/axiosInstance";
import { dandysToken } from "@/utils/constant";
import { decode } from "@/utils/helpers";
import { ISignUp } from "@/interface";

export const buyerApi = createApi({
  reducerPath: "buyerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const userToken = window.localStorage.getItem(dandysToken);
      const encodedToken = JSON.parse(userToken as string)?.value;
      const token = decode(encodedToken!);

      headers.set("content-type", "application/json");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => `/`,
    }),
    signUp: builder.mutation<any, ISignUp>({
      query: (body) => ({
        url: `/auth/signup`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetHomeQuery, useSignUpMutation } = buyerApi;
