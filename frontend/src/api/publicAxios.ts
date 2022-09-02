import axios from "axios";

export const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});
