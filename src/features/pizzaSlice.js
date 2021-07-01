import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadPizzaAsync = createAsyncThunk(
  "pizza/loadPizzaAsync",
  async ({ sortBy, categoryIndex }) => {
    const response = await axios.get(
      `/pizzas?${
        categoryIndex !== null ? `category=${categoryIndex}` : ""
      }&_sort=${sortBy.type}&_order=${sortBy.order}`
    );
    return response.data;
  }
);

const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState: {
    pizzas: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [loadPizzaAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [loadPizzaAsync.fulfilled]: (state, { payload }) => {
      state.pizzas = payload;
      state.isLoading = false;
    },
  },
});

export default pizzaSlice.reducer;
