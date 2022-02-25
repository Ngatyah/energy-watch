import { createSlice } from "@reduxjs/toolkit";
import { listToObject } from "../utils";
export const REDUCER_NAME = "site";

let initialValues:any = {};


const siteSlice = createSlice({

  name: REDUCER_NAME,
  initialState: {
    sites:initialValues,
  },
  reducers: {
    addSites(state, action) {
      const sites = action.payload;
      state.sites = listToObject(sites);
    },
    addSingleSite(state, action) {
      const site = action.payload;
      state.sites = {
        [site.id]: site,
        ...state.sites
      }
    },
    removeSite(state, action) {
      const id = action.payload;
      const sites = {...state.sites}
      delete sites[id]
      state.sites = sites
    },
  },
});
//get access to all sites
export const getAllSites = (state: any): any => {
  return Object.values((state as any)[REDUCER_NAME].sites || {});
};
//get a single sites.
export const getSingleSite = (state: any, id: any) => {
  return (state as any)[REDUCER_NAME].sites[id] || null
};



export const siteActions = siteSlice.actions;
export default siteSlice;
