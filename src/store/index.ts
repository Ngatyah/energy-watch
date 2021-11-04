import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_slice";
import meterSlice from "./meter-slice";

const store = configureStore({
  reducer: { meter: meterSlice.reducer, auth: authSlice.reducer },
});

export default store;
