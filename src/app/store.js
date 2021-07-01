import { configureStore } from "@reduxjs/toolkit";
import categories from "../features/categoriesSlice";
import pizza from "../features/pizzaSlice";
import cart from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    categories,
    pizza,
    cart
  },
});
