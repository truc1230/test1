/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type AxiosRequestConfigCustom = AxiosRequestConfig & {
  shouldNOTUseLocale?: boolean;
};

declare module 'axios' {
  export interface AxiosInstance {
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfigCustom): Promise<R>;
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfigCustom): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfigCustom): Promise<R>;
    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfigCustom): Promise<R>;
    options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfigCustom): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfigCustom): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfigCustom): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfigCustom): Promise<R>;
  }
}

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  async (error: AxiosError<any>) => {
    return Promise.reject(error);
  },
);

export default http;
