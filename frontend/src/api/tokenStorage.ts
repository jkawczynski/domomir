import { TokenData } from "./auth.api";

export const storeUserToken = (tokenData: TokenData) => {
  localStorage.setItem("accessToken", tokenData.access);
  localStorage.setItem("refreshToken", tokenData.refresh);
};

export const clearUserToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken") || "";
};
