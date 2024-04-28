import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from '../databases/rtDb'

export const shopApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
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
        })
    })
})

export const { useGetCategoriesQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery } = shopApi