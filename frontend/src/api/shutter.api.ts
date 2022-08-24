import axios, { AxiosResponse } from "axios";

type ShutterStatusPosition = {
  position: number;
};

export type ShutterStatus = {
  currentPos: ShutterStatusPosition;
};

export function sendShutterCommand(command: string): Promise<AxiosResponse> {
  return axios.post(`${import.meta.env.VITE_APP_API_URL}api/shutter/`, {
    command,
  });
}

export async function getShutterStatus() {
  return await axios
    .get<ShutterStatus>(`${import.meta.env.VITE_APP_API_URL}api/shutter/`)
    .then((response) => response.data);
}
