import { createSlice } from "@reduxjs/toolkit";

const meterSlice = createSlice({
  name: "meter",
  initialState: {
    meters: <any[]>[],
  },
  reducers: {
    addMeterToTable(state, action) {
      const newItem = action.payload;
      state.meters.push(newItem);
    },
    removeMeterFromTable(state, action) {
      const id = action.payload;
      state.meters = state.meters.filter((item) => item.id !== id);
    },
  },
});

export const formActions = meterSlice.actions;
export default meterSlice;
