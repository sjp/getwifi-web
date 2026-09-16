export type WifiAuthType = "none" | "wep" | "wpa";

export const isWifiAuthType = (value: string): value is WifiAuthType =>
  value === "none" || value === "wep" || value === "wpa";

export interface WifiDetails {
  readonly ssid: string;
  readonly password?: string;
  readonly authType?: WifiAuthType;
  readonly hidden?: boolean;
}
