import axios from "axios";

export type ShutterStatus = {
  shutter: {currentPos: { position: number }};
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
  return await axios
    .get<ShutterData>(`${import.meta.env.VITE_APP_API_URL}api/shutter/`)
    .then((response) => response.data);
};
