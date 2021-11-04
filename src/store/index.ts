import { configureStore } from "@reduxjs/toolkit";
import authSlice, { REDUCER_NAME as authReducerName } from "./auth_slice";
import meterSlice from "./meter-slice";

const store = configureStore({
  reducer: { meter: meterSlice.reducer, [authReducerName]: authSlice.reducer },
});

export default store;
