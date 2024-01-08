import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {getToken} from './token';

const BACKEND_URL = 'https://13.design.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;
const TOKEN_HEADER = 'X-Token';

const configureAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers[TOKEN_HEADER] = token;
    }

    return config;
  });

  return axiosInstance;
};

export default configureAxios;
