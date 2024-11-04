import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create();

// request
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url } = config;
  console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

  return config;
};

// response
const onResponse = (res: AxiosResponse): AxiosResponse => {
  const { method, url } = res.config;
  const { status } = res;

  if (status !== 200) {
    console.log(`🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`);
  }

  console.log(`🛬 [API - RESPONSE] ${method?.toUpperCase()} ${url} | status: ${status}`);

  return res;
};

// error
const onError = (error: AxiosError): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    const { status } = error;

    if (error.response) {
      const { status, statusText } = error.response;

      console.log(
        `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status} ${statusText}`,
      );
    } else {
      console.log(`🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | status: ${status}`);
    }
  }

  return Promise.reject(error);
};

// interceptor
axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onResponse, onError);

const apiRequest = {
  get: async <T>(url: string): Promise<T> =>
    await axiosInstance
      .get(url) //
      .then((response) => response.data.data),
  post: async <T, P>(url: string, payload: P): Promise<T> =>
    await axiosInstance
      .post(url, payload) //
      .then((response) => response.data.data),
};

export { apiRequest };
