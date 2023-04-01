import { useQuery, UseQueryResult } from "react-query";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export interface ProblemDetails {
  type: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

const apiBasePath = "https://getwifi.link/api";

export type WifiAuthType = "none" | "wep" | "wpa";

export interface GetWifiResponse {
  ssid: string;
  password?: string;
  authType: WifiAuthType;
  hidden: boolean;
}

const getWifiByCode = (wifiCode: string): Promise<GetWifiResponse> => {
  const url = `${apiBasePath}/wifi/${wifiCode}`;
  return fetch(url).then((res) => res.json());
};

export const useGetWifi = (wifiCode: string): UseQueryResult<GetWifiResponse, ProblemDetails> => {
  return useQuery<GetWifiResponse, ProblemDetails>(["wifi", { id: wifiCode }], () =>
    getWifiByCode(wifiCode),
  );
};

export interface DeleteWifiRequest {
  shortCode: string;
  deletionCode: string;
}

export const deleteWifi = (request: DeleteWifiRequest): Promise<void> => {
  const params = new URLSearchParams({ deletionCode: request.deletionCode });
  const url = `${apiBasePath}/wifi/${request.shortCode}?${params}`;
  const requestOptions: RequestInit = { method: "DELETE" };

  return fetch(url, requestOptions).then((res) => res.json());
};

export interface SaveWifiRequest {
  ssid: string;
  password?: string;
  authType?: WifiAuthType;
  hidden?: boolean;
  expiryDays?: number;
}

export interface SaveWifiResponse {
  shortCode: string;
  deletionCode: string;
}

export const saveWifi = (request: SaveWifiRequest): Promise<SaveWifiResponse> => {
  const url = `${apiBasePath}/wifi`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  };

  return fetch(url, requestOptions).then((res) => res.json());
};