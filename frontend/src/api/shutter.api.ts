import axios from "axios";

import { authApi } from "./auth.api";

export type ShutterStatus = {
  shutter: { currentPos: { position: number } };
};

export type ShutterData = {
  ip_addr: string;
  proxy_address: string;
};

export const sendShutterCommand = async (
  proxyAddress: string,
  command: string
) => {
  return await axios
    .get<ShutterStatus>(`${proxyAddress}command/${command}`)
    .then((response) => response.data);
};

export const getShutterStatus = async (proxyAddress: string) => {
  return await axios
    .get<ShutterStatus>(`${proxyAddress}status`)
    .then((response) => response.data);
};

export const getShutterIpAddress = async () => {
  const response = await authApi.get<ShutterData>("api/shutter/");
  return response.data;
};
