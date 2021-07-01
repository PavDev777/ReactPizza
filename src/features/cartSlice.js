import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTotalPrice} from "../utils";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: {},
        totalPrice: 0,
        totalCount: 0,
    },
    reducers: {
        addPizzaToCart: (state, action) => {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                },
            };

            const items = Object.values(newItems).map((obj) => obj.items);
            const countPizzas = [].concat.apply([], items).length;
            const allPizzas = [].concat.apply([], items);

            state.items = newItems;

            const summPizzas = getTotalPrice(allPizzas);
            state.totalPrice = summPizzas;
            state.totalCount = countPizzas;
        },
        clearCart: (state) => {
            state.items = {};
            state.totalPrice = 0;
            state.totalCount = 0;
        },
        removeCartItem: (state, action) => {
            const newItems = {
                ...state.items,
            };

            const currentTotalPrice = newItems[action.payload].totalPrice;
            const count = newItems[action.payload].items.length;
            delete newItems[action.payload];

            state.items = newItems;
            state.totalPrice = state.totalPrice - currentTotalPrice;
            state.totalCount = state.totalCount - count;
        },
        plusItem: (state, action) => {
            const newItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0],
            ];
            const plus = {
                ...state.items,
                [action.payload]: {
                    items: newItems,
                    totalPrice: getTotalPrice(newItems),
                },
            };
            state.items = plus;
            state.totalPrice = getTotalPrice(newItems);
            state.totalCount = newItems.length;
        },
        minusItem: (state, action) => {
            const currentItems = state.items[action.payload].items;
            const newItems =
                currentItems.length > 1 ? currentItems.slice(1) : currentItems;

            const minus = {
                ...state.items,
                [action.payload]: {
                    items: newItems,
                    totalPrice: getTotalPrice(newItems),
                },
            };

            state.items = minus;
            state.totalPrice = getTotalPrice(newItems);
            state.totalCount = newItems.length;
        },
    },
});

export const {
    addPizzaToCart,
    clearCart,
    removeCartItem,
    plusItem,
    minusItem,
} = cartSlice.actions;

export default cartSlice.reducer;
