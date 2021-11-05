import { createSlice } from "@reduxjs/toolkit";
export const REDUCER_NAME = "meter";
const meterSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    meters: <any[]>[],
  },
  reducers: {
    addMeterToTable(state, action) {
      const newMeter = action.payload;
      state.meters.push(newMeter);
    },
    removeMeterFromTable(state, action) {
      const id = action.payload;
      state.meters = state.meters.filter((item) => item.id !== id);
    },
  },
});
//get access to all meters
export const getAllMeters = (state: any) => {
  return (state as any)[REDUCER_NAME].meters;
};
//get a single meter.
export const getOneMeter = (state: any, id: any) => {
  return getAllMeters(state).find((item: any) => item.id === id);
};

export const formActions = meterSlice.actions;
export default meterSlice;
