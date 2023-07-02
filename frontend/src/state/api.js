import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  reducerPath: "adminApi",
  tagTypes: ["Products","Categories","Clients","Users"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `/api/products`,
      providesTags: ["Products"],
    }),
    getCategories: build.query({
      query: () => `/api/categories`,
      providesTags: ["Categories"],
    }),
    getClients: build.query({
      query: () => `/api/orders`,
      providesTags: ["Clients"],
    }),
    getCategory: build.query({
      query: (categoryId) => `/api/categories/${categoryId}`,
      providesTags: (result, error, categoryId) => [{ type: "Categories", id: categoryId }],
    }),
    createCategory: build.mutation({
      query: (category) => ({
        url: "/api/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: build.mutation({
      query: (categoryId) => ({
        url: `/api/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: "/api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
    getProduct: build.query({
      query: (productId) => `/api/products/${productId}`,
      providesTags: (result, error, productId) => [{ type: "Products", id: productId }],
    }),
    deleteProduct: build.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getOrder: build.query({
      query: (orderId) => `/api/orders/${orderId}`,
      providesTags: (result, error, orderId) => [{ type: "Clients", id: orderId }],
    }),
    updateOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/orders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteOrder: build.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
    loginUser: build.mutation({
      query: ({ email, password }) => ({
        url: "/api/users/login",
        method: "POST",
        body: { email, password },
      }),
      onError: (error) => {
        console.log(error);
      },
      onQueryStarted: () => {
        console.log("Login mutation started");
      },
      onQueryFinished: () => {
        console.log("Login mutation finished");
      },
      invalidatesTags: ["Users"],
    }),
  }),         
});

export const { 
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetClientsQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateProductMutation,
  useGetProductQuery,
  useDeleteProductMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useLoginUserMutation,
 } = api;
