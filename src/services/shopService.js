import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../databases/rtDb'

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    tagTypes: ['profileImageGet'],
    endpoints: (builder) => ({

        getCategories: builder.query({
            query: () => `categories.json`,
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response);

                return responseTransformed;
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response);
                let responseReturn = null;
                if (responseTransformed.length)
                    responseReturn = responseTransformed[0];

                return responseReturn;
            }
        }),
        postOrder: builder.mutation({
            query: ({ ...order }) => ({
                url: 'orders.json',
                method: 'POST',
                body: order
            })
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),

        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
            invalidatesTags: ['profileImageGet']
        }),
    })
})

export const { useGetCategoriesQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery, usePostOrderMutation, useGetProfileImageQuery, usePostProfileImageMutation, } = shopApi