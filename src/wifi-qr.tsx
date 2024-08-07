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
    !!input.authType && input.authType !== "none" ? `T:${input.authType.toUpperCase()};` : "";
  const hidden = input.hidden ? "H:true;" : "";
  return `WIFI:${ssid}${password}${enc}${hidden}`;
};

export interface WifiQrCodeProps {
  wifi: WifiDetails;
}

export const WifiQrCode = ({ wifi }: Readonly<WifiQrCodeProps>) => {
  const qrCode = generateQrCode(wifi);

  return (
    <>
      <QRCodeSVG value={qrCode} level="H" includeMargin />
      <pre>
        ssid: {wifi.ssid}
        {"\n"}
        password: {wifi.password}
        {"\n"}
        encryption: {wifi.authType || "none"}
        {"\n"}
        hidden: {(wifi.hidden || false).toString()}
      </pre>
    </>
  );
};
