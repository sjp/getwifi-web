import { QRCodeSVG } from "qrcode.react";
import type { WifiDetails } from "./models";

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

const generateQrCode = (input: WifiDetails): string => {
  const ssid = `S:${escapeInput(input.ssid)};`;
  const password = input.password ? `P:${escapeInput(input.password)};` : "";
  const enc =
    !!input.authType && input.authType !== "none"
      ? `T:${input.authType.toUpperCase()};`
      : "";
  const hidden = input.hidden ? "H:true;" : "";
  return `WIFI:${ssid}${password}${enc}${hidden}`;
};

export interface WifiQrCodeProps {
  readonly wifi: WifiDetails;
}

export const WifiQrCode = ({ wifi }: WifiQrCodeProps) => {
  const qrCode = generateQrCode(wifi);

  return (
    <QRCodeSVG
      value={qrCode}
      level="H"
      includeMargin={true}
      width="100%"
      height="100%"
      class="wifiqr"
      bgColor="lightgrey"
    />
  );
};
