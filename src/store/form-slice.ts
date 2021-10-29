import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    items: <any[]>[],
    totalQuality: 0,
  },
  reducers: {
    addItemsToTable(state, action) {
      const newItem = action.payload;
      state.items.push({
        site: newItem.site,
        serial: newItem.serial,
        model: newItem.model,
        id: newItem.id,
      });
    },
    removeItemFromTable(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;
