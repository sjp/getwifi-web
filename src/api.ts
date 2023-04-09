import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export interface ApiResponse<Data, Error> {
  ok: boolean;
  status: number;
  data: Data;
  error: Error;
}

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

const getWifiByCode = async (
  wifiCode: string,
): Promise<ApiResponse<GetWifiResponse, ProblemDetails>> => {
  const url = `${apiBasePath}/wifi/${wifiCode}`;
  const response = await fetch(url);
  const result = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data: response.ok ? result : null,
    error: !response.ok ? result : null,
  };
};

export const useGetWifi = (
  wifiCode: string,
): UseQueryResult<ApiResponse<GetWifiResponse, ProblemDetails>> => {
  return useQuery<ApiResponse<GetWifiResponse, ProblemDetails>>(["wifi", { id: wifiCode }], () =>
    getWifiByCode(wifiCode),
  );
};

export interface DeleteWifiRequest {
  shortCode: string;
  deletionCode: string;
}

export interface DeleteWifiResponse {}

export const deleteWifi = async (
  request: DeleteWifiRequest,
): Promise<ApiResponse<DeleteWifiResponse, ProblemDetails>> => {
  const params = new URLSearchParams({ deletionCode: request.deletionCode });
  const url = `${apiBasePath}/wifi/${request.shortCode}?${params}`;
  const requestOptions: RequestInit = { method: "DELETE" };

  const res = await fetch(url, requestOptions);
  return await res.json();
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

export const saveWifi = async (
  request: SaveWifiRequest,
): Promise<ApiResponse<SaveWifiResponse, ProblemDetails>> => {
  const url = `${apiBasePath}/wifi`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  };

  const res = await fetch(url, requestOptions);
  return await res.json();
};
