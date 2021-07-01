import { createSlice } from "@reduxjs/toolkit";

const catogoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoryIndex: null,
    sortBy: { type: "popular", name: "популярности", order: "desc" },
  },
  reducers: {
    getCategoryIndex: (state, action) => {
      state.categoryIndex = action.payload;
    },
    getItemType: (state, { payload }) => {
      state.sortBy = payload;
    },
  },
});

export const { getCategoryIndex, getItemType } = catogoriesSlice.actions;

export default catogoriesSlice.reducer;
