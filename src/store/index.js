import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/Shop/shopSlice"
import cartReducer from "../features/Cart/cartSlice"
import { shopApi } from "../services/shopService";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/User/userSlice"
import { authApi } from "../services/authService"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        shop: shopReducer,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store