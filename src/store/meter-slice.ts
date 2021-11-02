import { createSlice } from "@reduxjs/toolkit";

const meterSlice = createSlice({
  name: "meter",
  initialState: {
    items: <any[]>[],
    
  },
  reducers: {
    addItemsToTable(state, action) {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    removeItemFromTable(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const formActions = meterSlice.actions;
export default meterSlice;
