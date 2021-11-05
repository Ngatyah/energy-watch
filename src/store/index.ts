import { configureStore } from "@reduxjs/toolkit";
import authSlice, { REDUCER_NAME as authReducerName } from "./auth_slice";
import meterSlice, { REDUCER_NAME as meterReducerName } from "./meter-slice";
import siteSlice, { REDUCER_NAME as siteReduceName } from "./sites_slice";

const store = configureStore({
  reducer: {
    [meterReducerName]: meterSlice.reducer,
    [authReducerName]: authSlice.reducer,
    [siteReduceName]: siteSlice.reducer,
  },
});

export default store;
