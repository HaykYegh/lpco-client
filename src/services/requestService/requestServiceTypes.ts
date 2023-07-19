import type { AxiosRequestConfig } from 'axios';

export interface IRequestUrl {
  method: AxiosRequestConfig['method'];
  url: AxiosRequestConfig['url'];
  baseURL?: AxiosRequestConfig['baseURL'];
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
  params?: AxiosRequestConfig['params'];
  transformRequest?: (formData: FormData) => typeof formData;
}
