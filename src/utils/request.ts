import {stringify} from 'query-string';
import {
  TRequestUrlPath,
  TRequestData,
  IRequestParams,
  THttpSuccessResponse,
} from '@app/types/http';
import devConfig from '@app/config';

// 构造参数
export const formatURL = (
  url: TRequestUrlPath,
  params?: IRequestParams,
): TRequestUrlPath => {
  let query = '';
  if (params && Object.keys(params).length) {
    query = url.includes('?')
      ? `&${stringify(params)}`
      : `?${stringify(params)}`;
  }
  return `${url}${query}`;
};

export const httpService = <T>(
  url: TRequestUrlPath,
  options: RequestInit = {},
): Promise<THttpSuccessResponse<T>> => {
  const defaultOptions = {
    includeCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(devConfig.host + url, Object.assign(defaultOptions, options))
    .then(response => response.json())
    .catch(error => {
      console.warn(`url：${url}`, error);
    });
};

export const get = <T>(
  url: TRequestUrlPath,
  getParams?: IRequestParams,
): Promise<THttpSuccessResponse<T>> => {
  return httpService<T>(formatURL(url, getParams), {method: 'GET'});
};

export const post = <T>(
  url: TRequestUrlPath,
  data?: TRequestData,
): Promise<THttpSuccessResponse<T>> => {
  return httpService<T>(url, {method: 'POST', body: JSON.stringify(data)});
};

export const put = <T>(
  url: TRequestUrlPath,
  data?: TRequestData,
): Promise<THttpSuccessResponse<T>> => {
  return httpService<T>(url, {method: 'PUT', body: JSON.stringify(data)});
};

export const patch = <T>(
  url: TRequestUrlPath,
  data?: TRequestData,
): Promise<THttpSuccessResponse<T>> => {
  return httpService<T>(url, {method: 'PATCH', body: JSON.stringify(data)});
};

export const remove = <T>(
  url: TRequestUrlPath,
  data?: TRequestData,
): Promise<THttpSuccessResponse<T>> => {
  return httpService<T>(url, {method: 'DELETE', body: JSON.stringify(data)});
};

export default {
  get,
  post,
  put,
  patch,
  remove,
};
