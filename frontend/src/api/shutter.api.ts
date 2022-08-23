import axios, { AxiosResponse } from "axios";

export function sendShutterCommand(command: string): Promise<AxiosResponse> {
  return axios.post(`${import.meta.env.VITE_APP_API_URL}api/shutter/`, {
    command,
  });
}

export async function getShutterStatus() {
  return await axios
    .get<{currentPos: {position: number}}>(`${import.meta.env.VITE_APP_API_URL}api/shutter/`)
    .then((response) => response.data);
}
