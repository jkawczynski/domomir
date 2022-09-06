import axios from "axios";

import {
  clearUserToken,
  getAccessToken,
  getRefreshToken,
  storeUserToken,
} from "./tokenStorage";

export type TokenData = {
  access: string;
  refresh: string;
};

export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  const response = await axios
    .post<{ access: string }>(
      `${import.meta.env.VITE_APP_API_URL}api/token/refresh/`,
      {
        refresh: refresh,
      }
    )
    .catch((error) => {
      clearUserToken();
      window.location.href = "/login";
      return Promise.reject(error);
    });

  const { access } = response.data;
  storeUserToken({ access, refresh });
  return access;
};

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

authApi.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response.status;
    if (status == 401 && !originalRequest.sent) {
      originalRequest.sent = true;
      await refreshAccessToken();
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);
