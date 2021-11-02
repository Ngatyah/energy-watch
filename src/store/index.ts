import { configureStore } from "@reduxjs/toolkit";
import meterSlice from "./meter-slice";

const store = configureStore({
  reducer: { meter: meterSlice.reducer },
});

export default store;
