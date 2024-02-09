import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/utils/axiosInstance";
import { dandysToken } from "@/utils/constant";
import { decode } from "@/utils/helpers";
import {
  ICreateDiscount,
  ICreateProduct,
  ISignIn,
  ISignUp,
  IUpdatePassword,
  IUpdateUser,
  ISellerPreference,
  ICreateSellerInformation,
  ICreateBankDetails,
  IVerifyOTP,
  IResendOTP,
  IForgotPassword,
  ICompleteForgotPassword,
  ICreateTransaction,
} from "@/interface";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
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
    forgotPassword: builder.mutation<any, IForgotPassword>({
      query: (body) => ({
        url: `/auth/password/reset`,
        method: "POST",
        body,
      }),
    }),
    completeForgotPassword: builder.mutation<any, ICompleteForgotPassword>({
      query: (body) => ({
        url: `/auth/password/reset`,
        method: "PUT",
        body,
      }),
    }),
    resendOTP: builder.mutation<any, IResendOTP>({
      query: (body) => ({
        url: `/auth/confirmation/request/email`,
        method: "POST",
        body,
      }),
    }),
    verifyOTP: builder.mutation<any, IVerifyOTP>({
      query: (body) => ({
        url: `/auth/confirmation/email`,
        method: "POST",
        body,
      }),
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

    // SELLER
    sellerCreateInformation: builder.mutation<any, ICreateSellerInformation>({
      query: (body) => ({
        url: `/seller`,
        method: "POST",
        body,
      }),
    }),
    getSellerInformation: builder.query<any, void>({
      query: () => ({
        url: `/seller`,
        method: "GET"
      }),
    }),

    // User
    getCurrentUser: builder.query<void, void>({
      query: () => `/user/me`,
    }),

    // Category
    getCategories: builder.query<void, void>({
      query: () => `/products/categories`,
    }),

    // Product
    getSellerProducts: builder.query<void, void>({
      query: () => `/products/seller-products`,
    }),
    getSellerProductById: builder.query<void, string>({
      query: (id) => `/products/seller/${id}`,
    }),
    getProductById: builder.query<void, string>({
      query: (id) => `/products/${id}`,
    }),
    getSellerCategories: builder.query<void, void>({
      query: () => `/products/seller-categories`,
    }),
    getCategoryProducts: builder.query<void, void>({
      query: () => `/products/category`,
    }),
    getSellerProductsByCategoryId: builder.query<void, string>({
      query: (id) => `/products/seller/category/${id}`,
    }),
    getProductsByCategoryId: builder.query<void, string>({
      query: (id) => `/products/category/${id}`,
    }),
    createProduct: builder.mutation<any, any>({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation<
      any,
      { payload: any; id: string }
    >({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: "PUT",
        body: body.payload,
      }),
    }),
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    deleteProductByCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: `/products/category/${id}`,
        method: "DELETE",
      }),
    }),

    getSellerDashboard: builder.query<void, void>({
      query: () => `/seller/dashboard`,
    }),

    // ORDER
    getOrderById: builder.query<void, string>({
      query: (id) => `/products/seller/category/${id}`,
    }),
    getSellerOrders: builder.query<void, void>({
      query: () => `/products/order/seller`,
    }),
    getSellerCustomers: builder.query<void, void>({
      query: () => `/seller/customer`,
    }),

    // Discount
    getDiscounts: builder.query<void, void>({
      query: () => `/discounts`,
    }),
    getSellerDiscounts: builder.query<void, void>({
      query: () => `/discounts/seller`,
    }),
    getDiscountById: builder.query<void, string>({
      query: (id) => `/discounts/${id}`,
    }),
    createDiscount: builder.mutation<any, ICreateDiscount>({
      query: (body) => ({
        url: `/discounts`,
        method: "POST",
        body,
      }),
    }),
    updateDiscount: builder.mutation<
      any,
      { payload: Partial<ICreateProduct>; id: string }
    >({
      query: (body) => ({
        url: `/discounts/${body.id}`,
        method: "PUT",
        body: body.payload,
      }),
    }),
    deleteDiscount: builder.mutation<any, string>({
      query: (id) => ({
        url: `/discounts/${id}`,
        method: "DELETE",
      }),
    }),

    // NOTIFICATION
    getNotifications: builder.query<void, void>({
      query: () => `/notifications`,
    }),
    getNotificationById: builder.query<void, string>({
      query: (id) => `/notifications/${id}`,
    }),
    deleteNotification: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
    }),
    // PREFERENCE
    getSellerPreferences: builder.query<{ data: ISellerPreference }, void>({
      query: () => `/seller/preferences`,
    }),
    setSellerPreferences: builder.mutation<any, ISellerPreference>({
      query: (body) => ({
        url: `/seller/preferences`,
        method: "PUT",
        body,
      }),
    }),

    // TRANSACTION
    createTransaction: builder.mutation<any, ICreateTransaction>({
      query: (body) => ({
        url: `/transaction`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetHomeQuery,
  useSignInMutation,
  useSignUpMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useCompleteForgotPasswordMutation,

  // User
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  useCreateBankAccountMutation,
  useGetUserBankDetailsQuery,

  // SELLER
  useSellerCreateInformationMutation,
  useGetSellerInformationQuery,
  useGetSellerDashboardQuery,

  // Order
  useGetOrderByIdQuery,
  useGetSellerOrdersQuery,
  useGetSellerCustomersQuery,

  // Category
  useGetCategoriesQuery,

  // Product
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetSellerProductsQuery,
  useDeleteProductMutation,
  useDeleteProductByCategoryMutation,
  useGetProductByIdQuery,
  useGetSellerProductByIdQuery,
  useGetSellerProductsByCategoryIdQuery,
  useGetProductsByCategoryIdQuery,
  useGetCategoryProductsQuery,
  useGetSellerCategoriesQuery,

  // Discount
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useGetSellerDiscountsQuery,
  useGetDiscountsQuery,
  useGetDiscountByIdQuery,
  useDeleteDiscountMutation,

  // Notification
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useDeleteNotificationMutation,

  // PREFERENCES
  useGetSellerPreferencesQuery,
  useSetSellerPreferencesMutation,

  // TRANSACTION
  useCreateTransactionMutation,
} = sellerApi;
