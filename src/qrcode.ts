import type { WifiDetails } from "./wifi";

const escapeInput = (input: string): string => {
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
  const ssid = `S:${escapeInput(input.ssid)};`;
  const password = input.password ? `P:${escapeInput(input.password)};` : "";
  const enc = input.authType
    ? `T:${
        input.authType === "none" ? "nopass" : input.authType.toUpperCase()
      };`
    : "";
  const hidden = input.hidden ? "H:true;" : "";
  return `WIFI:${ssid}${password}${enc}${hidden}`;
};
