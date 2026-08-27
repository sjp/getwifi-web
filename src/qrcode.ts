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

// Values consisting solely of hex digits are ambiguous: some readers interpret
// them as raw hex bytes rather than text. The ZXing WiFi format resolves this by
// wrapping such values in double quotes.
const isHex = (input: string): boolean => /^[0-9a-fA-F]+$/.test(input);

const formatValue = (input: string): string => {
  const escaped = escapeInput(input);
  return isHex(input) ? `"${escaped}"` : escaped;
};

export const generateQrCode = (input: WifiDetails): string => {
  const noPassword = input.authType === "none";
  const ssid = `S:${formatValue(input.ssid)};`;
  const password = !noPassword && input.password ? `P:${formatValue(input.password)};` : "";
  const enc = input.authType ? `T:${noPassword ? "nopass" : input.authType.toUpperCase()};` : "";
  const hidden = input.hidden ? "H:true;" : "";
  return `WIFI:${ssid}${password}${enc}${hidden}`;
};
