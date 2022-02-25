import { createSlice } from "@reduxjs/toolkit";
import { listToObject } from "../utils";
export const REDUCER_NAME = "meter";
const meterSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    meters: <any[]>[],
  },
  reducers: {
    addMeters(state, action) {
      const meters = action.payload;
      state.meters = listToObject(meters);
    },
    addSingleMeter(state, action) {
      const meter = action.payload;
      state.meters = {
        [meter.id]: meter,
        ...state.meters
      }
    },
    removeMeter(state, action) {
      const id = action.payload;
      const meters = {...state.meters}
      delete meters[id]
      state.meters = meters
    },
  },
});
//get access to all meters
export const getAllMeters = (state: any) => {
  return  Object.values((state as any)[REDUCER_NAME].meters || {});
};
//get a single meter.
export const getSingleMeter = (state: any, id: any) => {
  return (state as any)[REDUCER_NAME].meters[id] || null
};

export const meterActions = meterSlice.actions;
export default meterSlice;
