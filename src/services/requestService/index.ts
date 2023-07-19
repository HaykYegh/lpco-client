import axios, { type AxiosPromise } from 'axios';

import type { IRequestUrl } from './requestServiceTypes';

import { LPCO_SERVER } from '../../config';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 400) {
      return Promise.reject(error.response.data.errors);
    }

    return Promise.reject(error);
  }
);

export function request({ method, url, baseURL, data, headers, params, transformRequest }: IRequestUrl): AxiosPromise {
  return axios({
    method,
    url: `${baseURL ?? LPCO_SERVER}/${url ?? ''}`,
    headers,
    data,
    params,
    transformRequest,
  });
}
