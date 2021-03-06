import { IncomingHttpHeaders } from "http";
import queryString from "querystring";
import { BASE_URL_V1 } from "../../constants";

import { throwNetworkError, throwHTTPError } from "./errors";
import store from "../../store";
import { getAccessToken } from "../../store/auth_slice";

export interface Dictionary<T = any> {
  [key: string]: T;
}

/** allowed http methods */
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

/** get default HTTP headers for Django service
 *
 * @param {string} accessToken - the access token
 * @param {string} accept - the MIME type to accept
 * @param {string} authorizationType - the authorization type
 * @param {string} contentType - the content type
 * @returns {IncomingHttpHeaders} - the headers
 */
export function getDefaultHeaders(
  accessToken: string,
  accept = "application/json",
  authorizationType = "Bearer",
  contentType = "application/json"
): IncomingHttpHeaders {
  return {
    accept,
    authorization: `${authorizationType} ${accessToken}`,
    "content-type": contentType,
  };
}

/**
 * get payload for fetch
 *
 * @param {object} _ - signal object that allows you to communicate with a DOM request
 * @param {string} accessToken - the access token
 * @param {string} method - the HTTP method
 * @param {object} data - data to be used for payload
 * @returns {Object} the payload
 */
export function getFetchOptions<T extends object = Dictionary>(
  _: AbortSignal,
  accessToken: string,
  method: HTTPMethod,
  data?: T
): RequestInit {
  return {
    headers: getDefaultHeaders(accessToken) as HeadersInit,
    method,
    ...(data ? { body: JSON.stringify(data) } : {}),
  };
}

/** interface to describe URL params object */
export interface URLParams {
  [key: string]: string | number | boolean | undefined;
}

export interface CustomFetch {
  (input: RequestInfo, init?: RequestInit | undefined): Promise<
    Response | undefined
  >;
}

export const customFetch: CustomFetch = async (...rest) => {
  try {
    return await fetch(...rest);
  } catch (err) {
    throwNetworkError(err as any);
  }
};

/** params option type */
type paramsType = URLParams | null;

// class for making requests to api
export class DjangoService<PayloadT extends object = Dictionary> {
  public accessToken: string;
  public baseURL: string;
  public endpoint: string;
  public generalURL: string;
  public getOptions: typeof getFetchOptions;
  public signal: AbortSignal;

  /**
   * Constructor method
   *
   * @param {function() | string } accessToken - asyc fn for getting the access token or access token
   * @param {string} baseURL - the base Django API URL
   * @param {string} endpoint - the Django endpoint
   * @param {function()} getOptions - a function to get the payload
   * @param {AbortController} signal - abort signal
   */

  constructor(
    endpoint: string,
    accessToken: string = getAccessToken(store.getState()),
    baseURL: string = BASE_URL_V1,
    getOptions: typeof getFetchOptions = getFetchOptions,
    signal: AbortSignal = new AbortController().signal
  ) {
    this.endpoint = endpoint;
    this.getOptions = getOptions;
    this.signal = signal;
    this.baseURL = baseURL;
    this.generalURL = `${this.baseURL}${this.endpoint}`;
    this.accessToken = accessToken;
  }

  /** appends any query params to the url as a querystring
   *
   * @param {string} generalUrl - the url
   * @param {object} params - the url params object
   * @returns {string} the final url
   */
  public static getURL(generalUrl: string, params: paramsType): string {
    if (params) {
      return `${generalUrl}?${decodeURIComponent(
        queryString.stringify(params)
      )}`;
    }
    return generalUrl;
  }

  /** converts filter params object to string
   *
   * @param {object} obj - the object representing filter params
   * @returns {string} filter params as a string
   */
  public static getFilterParams(
    obj: URLParams | Record<string, unknown>
  ): string {
    return Object.entries(obj)
      .map(([key, val]) => `${key}:${val}`)
      .join(",");
  }

  /** create method
   * Send a POST request to the general endpoint containing the new object data
   * Successful requests will result in a HTTP status 201 response with no body
   *
   * @param {object} data - the data to be POSTed
   * @param {params} params - the url params object
   * @param {string} method - the HTTP method
   * @returns {object} the object returned by API
   */
  public async create(
    data: PayloadT,
    params: paramsType = null,
    method: HTTPMethod = "POST"
  ): Promise<Record<string, unknown>> {
    const url = DjangoService.getURL(this.generalURL, params);
    const payload = {
      ...this.getOptions<PayloadT>(this.signal, this.accessToken, method, data),
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    };
    const response = await customFetch(url, payload);
    if (response) {
      if (response.ok || response.status === 201) {
        return {};
      }

      const defaultMessage = `DjangoService create on ${this.endpoint} failed, HTTP status ${response.status}`;
      await throwHTTPError(response, defaultMessage);
    }

    return {};
  }

  /** read method
   * Send a GET request to the url for the specific object
   *
   * @param {string|number} id - the identifier of the object
   * @param {params} params - the url params object
   * @param {string} method - the HTTP method
   * @returns {object} the object returned by API
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async read(
    id: string | number,
    params: paramsType = null,
    method: HTTPMethod = "GET"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const url = DjangoService.getURL(`${this.generalURL}${id}`, params);
    const response = await customFetch(
      url,
      this.getOptions(this.signal, this.accessToken, method)
    );

    if (response) {
      if (response.ok) {
        return await response.json();
      }
      const defaultMessage = `DjangoService read on ${this.endpoint} failed, HTTP status ${response.status}`;
      await throwHTTPError(response, defaultMessage);
    }
  }

  /** update method
   * Simply send the updated object as PUT request to the general endpoint URL
   * Successful requests will result in a HTTP status 200/201 response with no body
   *
   * @param {object} data - the data to be POSTed
   * @param {params} params - the url params object
   * @param {string} method - the HTTP method
   * @returns {object} the object returned by API
   */
  public async update<T>(
    id: string | number,
    data: PayloadT,
    params: paramsType = null,
    method: HTTPMethod = "PUT"
  ): Promise<Record<string, unknown>> {
    const url = DjangoService.getURL(`${this.generalURL}${id}`, params);
    const payload = {
      ...this.getOptions<PayloadT>(this.signal, this.accessToken, method, data),
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    };
    const response = await customFetch(url, payload);
    if (response) {
      if (response.ok) {
        return {};
      }
      const defaultMessage = `DjangoService update on ${this.endpoint} failed, HTTP status ${response.status}`;
      await throwHTTPError(response, defaultMessage);
    }

    return {};
  }

  /** list method
   * Send a GET request to the general API endpoint
   *
   * @param {params} params - the url params object
   * @param {string} method - the HTTP method
   * @returns {object} list of objects returned by API
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async list(
    params: paramsType = null,
    method: HTTPMethod = "GET"
  ): Promise<any> {
    const url = DjangoService.getURL(this.generalURL, params);
    const response = await customFetch(
      url,
      this.getOptions(this.signal, this.accessToken, method)
    );

    if (response) {
      if (response.ok) {
        return await response.json();
      }
      const defaultMessage = `DjangoService list on ${this.endpoint} failed, HTTP status ${response.status}`;
      await throwHTTPError(response, defaultMessage);
    }
 }

  /** delete method
   * Send a DELETE request to the general endpoint
   * Successful requests will result in a HTTP status 204
   *
   * @param {params} params - the url params object
   * @param {string} method - the HTTP method
   * @returns {object} the object returned by API
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async delete(
    id: number | string,
    params: paramsType = null,
    method: HTTPMethod = "DELETE"
  ): Promise<Record<string, unknown>> {
    const url = DjangoService.getURL(`${this.generalURL}/${id}`, params);
    const response = await fetch(
      url,
      this.getOptions(this.signal, this.accessToken, method)
    );
    if (response.ok || response.status === 204 || response.status === 200) {
      return {};
    }
    const defaultMessage = `DjangoService delete on ${this.endpoint} failed, HTTP status ${response.status}`;
    await throwHTTPError(response, defaultMessage);

    return {};
  }
}
