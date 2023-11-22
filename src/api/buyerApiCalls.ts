import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/utils/axiosInstance";
import { dandysToken } from "@/utils/constant";
import { decode } from "@/utils/helpers";
import {
  ICreateBankDetails,
  ISignIn,
  ISignUp,
  IUpdatePassword,
  IUpdateUser,
} from "@/interface";

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
    signIn: builder.mutation<any, ISignIn>({
      query: (body) => ({
        url: `/auth/signin`,
        method: "POST",
        body,
      }),
    }),

    // User
    getCurrentUser: builder.query<void, void>({
      query: () => `/user/me`,
    }),
    updateUser: builder.mutation<any, IUpdateUser>({
      query: (body) => ({
        url: `/user`,
        method: "PUT",
        body,
      }),
    }),
    updatePassword: builder.mutation<any, IUpdatePassword>({
      query: (body) => ({
        url: `/user/password`,
        method: "PUT",
        body,
      }),
    }),
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: `/user`,
        method: "DELETE",
      }),
    }),
    getUserBankDetails: builder.query<void, void>({
      query: () => `/user/bank-details`,
    }),
    createBankAccount: builder.mutation<any, ICreateBankDetails>({
      query: (body) => ({
        url: `/user/bank-details`,
        method: "POST",
        body,
      }),
    }),

    // Category
    getCategories: builder.query<void, void>({
      query: () => `/products/categories`,
    }),

    // Product
    getProducts: builder.query<void, void>({
      query: () => `/products`,
    }),
    getProductById: builder.query<void, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetHomeQuery,
  useSignUpMutation,
  useSignInMutation,
  // User
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  useGetUserBankDetailsQuery,
  useCreateBankAccountMutation,
  // Category
  useGetCategoriesQuery,
  // Product
  useGetProductsQuery,
  useGetProductByIdQuery,
} = buyerApi;
