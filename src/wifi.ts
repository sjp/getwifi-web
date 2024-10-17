export type WifiAuthType = "none" | "wep" | "wpa";

export interface WifiDetails {
    ssid: string;
    password?: string;
    authType?: WifiAuthType;
    hidden?: boolean;
}
