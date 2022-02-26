//URLs
export const DASHBOARD = "/dashboard";
export const REGISTRATION = "/register";
export const LOGIN = "/";
export const METERS_URL = "/dashboard/meters";
export const GRAPH_URL = "/dashboard/graphs";
export const ADD_METER = "/dashboard/add/meter";
export let EDIT_METER = "/dashboard/edit/meter/:id";
export const SITE_URL = "/dashboard/sites";
export const ADD_SITE = "/dashboard/add/site";
export let EDIT_SITE = "/dashboard/edit/site/:id";

//API end points
export const BASE_URL = "https://api-energy-watch.herokuapp.com";
export const TOKEN_ENDPOINT = `${BASE_URL}/auth/token/`;
export const BASE_URL_V1 = `${BASE_URL}/api/v1`;
export const USER_PROFILE_ENDPOINT = "/users/me/";
export const METERS_ENDPOINT = "/meters/";
export const SITES_ENDPOINT = "/sites/";
export const SITES_LIST_ENDPOINT = "/sites/all/";
//ids
export const CLIENT_ID = "fbaPXGrD6wewVEqoOkJfvierIrYbnROPXMa8CDv5";

// magic strings
export const PROFILE_STORAGE_KEY = "profile";
export const TOKEN_STORAGE_KEY = "Token";
export const ANTD_SUCCESS_NOTIFICATION_TYPE = "success";
export const ANTD_warning_NOTIFICATION_TYPE = "warning";
export const ANTD_INFO_NOTIFICATION_TYPE = "info";
export const ANTD_ERROR_NOTIFICATION_TYPE = "error";
