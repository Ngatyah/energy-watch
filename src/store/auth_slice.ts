import { createSlice } from "@reduxjs/toolkit";

export const REDUCER_NAME = "auth";

const authSlice = createSlice({
  name: REDUCER_NAME,
  initialState: {
    accessData: {},
    profileData: {},
  },
  reducers: {
    addAccessData(state, action) {
      state.accessData = action.payload;
    },
    addProfileData(state, action) {
      state.profileData = action.payload;
    },
  },
});

export const getAccessData = (state: any) => {
  return (state as any)[REDUCER_NAME].accessData;
};

// get accessToken
export const getAccessToken = (state: any) => {
  return getAccessData(state).access_token;
};

export const getProfileData = (state: any) => {
  return (state as any)[REDUCER_NAME].profileData;
};

export const authActions = authSlice.actions;
export default authSlice;
