import { createSlice } from "@reduxjs/toolkit";
import { SITES_LIST_ENDPOINT } from "../constants";
import { DjangoService } from "../services/django-api";
export const REDUCER_NAME = "site";

let initialValues:any = [];


const siteSlice = createSlice({

  name: REDUCER_NAME,
  initialState: {
    sites:initialValues,
  },
  reducers: {
    addSiteToTable(state, action) {
      const newSite = action.payload;
      state.sites.push(newSite);
    },
    removeSiteFromTable(state, action) {
      const id = action.payload;
      state.sites = state.sites.filter((item:any) => item.id !== id);
    },
  },
});
//get access to all meters
export const getAllSites = (state: any) => {
  return (state as any)[REDUCER_NAME].sites;
};
//get a single meter.
export const getOneSite = (state: any, id: any) => {
  return getAllSites(state).find((item: any) => item.id === id);
};



export const siteActions = siteSlice.actions;
export default siteSlice;
