import axios, { Axios } from "axios";
import { z } from "zod";
import {
  clearUserToken,
  getAccessToken,
  getRefreshToken,
  storeUserToken,
} from "./tokenStorage";

export const LoginSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  password: z.string().min(3, { message: "Password is required" }),
});
export type LoginData = z.infer<typeof LoginSchema>;

export type TokenData = {
  access: string;
  refresh: string;
};

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

export const getToken = async (loginData: LoginData) => {
  return await axios
    .post<TokenData>(`${import.meta.env.VITE_APP_API_URL}api/token/`, loginData)
    .then((response) => response.data);
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
