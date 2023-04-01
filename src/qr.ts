import { WifiDetails } from "./models";

const escape = (input: string): string => {
  if (!input) {
    return input;
  }

  return input
    .replaceAll("\\", "\\\\")
    .replaceAll('"', '\\"')
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll(":", "\\:");
};

export const generateQrCode = (input: WifiDetails): string => {
  const ssid = `S:${escape(input.ssid)};`;
  const password = input.password ? `P:${escape(input.password)};` : "";
  const enc = !!input.authType && input.authType !== "none" ? `T:${input.authType};` : "";
  const hidden = input.hidden ? "H:true;" : "";
  return "WIFI:" + ssid + password + enc + hidden;
};
