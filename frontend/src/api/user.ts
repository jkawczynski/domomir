import { authApi } from "./auth.api";

export type User = {
  username: string;
};

export const getMe = async () => {
  const response = await authApi.get<User>(`api/me/`);
  return response.data;
};
