import { createSlice } from "@reduxjs/toolkit";
const REDUCER_NAME = "meter";
const meterSlice = createSlice({
  name: REDUCER_NAME,
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

export const getAllMeters = (state: any) => {
  return (state as any)[REDUCER_NAME].meters;
};
export const getOneMeter = (state: any, id: any) => {
  return getAllMeters(state).find((item: any) => item.id === id);
};

export const formActions = meterSlice.actions;
export default meterSlice;
