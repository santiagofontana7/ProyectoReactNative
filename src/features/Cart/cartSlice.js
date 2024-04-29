import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLogged",
            updatedAt: new Date().toLocaleString(),
            total: null,
            items: [],
        },
    },
    reducers: {
        addCartItem: (state, { payload }) => {
            const productRepeated = state.value.items.find(
                (item) => item.id === payload.id
            )
            if (productRepeated) {
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === payload.id) {
                        item.quantity += payload.quantity
                        return item
                    }
                    return item
                })
                const total = itemsUpdated.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                )
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    total,
                    updatedAt: new Date().toLocaleString(),
                }
            } else {
                state.value.items.push(payload)
                const total = state.value.items.reduce(
                    (acc, currentItem) =>
                        (acc += currentItem.price * currentItem.quantity),
                    0
                )
                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString(),
                }
            }
        },
        removeCartItem: (state, { payload }) => {
            var index = state.value.items.map(item => { return item.id; }).indexOf(payload.id);
            if (index != -1) {
                state.value.items.splice(index, 1);
                state.value.total -= payload.quantity * payload.price;
            }
        },
        emptyCart: (state) => {
            state.value.items = [];
            state.value.total = 0;
        }
    },
})

export const { addCartItem, removeCartItem, emptyCart } = cartSlice.actions
export default cartSlice.reducer