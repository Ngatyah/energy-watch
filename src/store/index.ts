import { configureStore } from "@reduxjs/toolkit";
import authSlice, { REDUCER_NAME as authReducerName } from "./auth_slice";
import meterSlice, { REDUCER_NAME as meterReducerName } from "./meter-slice";

const store = configureStore({
  reducer: {
    [meterReducerName]: meterSlice.reducer,
    [authReducerName]: authSlice.reducer,
  },
});

export default store;
