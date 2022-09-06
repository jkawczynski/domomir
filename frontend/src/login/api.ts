import axios from "axios";
import { z } from "zod";

import { TokenData } from "../api/auth.api";

export const LoginSchema = z.object({
  username: z.string().min(3, { message: "Username is required" }),
  password: z.string().min(3, { message: "Password is required" }),
});
export type LoginData = z.infer<typeof LoginSchema>;

export const getToken = async (loginData: LoginData) => {
  return await axios
    .post<TokenData>(`${import.meta.env.VITE_APP_API_URL}api/token/`, loginData)
    .then((response) => response.data);
};
