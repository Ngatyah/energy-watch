import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessData: <any[]>[],
    profileData: <any[]>[],
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

export const authActions = authSlice.actions;
export default authSlice;
