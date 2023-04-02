import { QRCodeSVG } from "qrcode.react";
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

const generateQrCode = (input: WifiDetails): string => {
  const ssid = `S:${escape(input.ssid)};`;
  const password = input.password ? `P:${escape(input.password)};` : "";
  const enc = !!input.authType && input.authType !== "none" ? `T:${input.authType};` : "";
  const hidden = input.hidden ? "H:true;" : "";
  return "WIFI:" + ssid + password + enc + hidden;
};

export interface WifiQrCodeProps {
  wifi: WifiDetails;
}

export const WifiQrCode = ({ wifi }: Readonly<WifiQrCodeProps>) => {
  const qrCode = generateQrCode(wifi);

  return (
    <>
      <QRCodeSVG code={qrCode} />
      <pre>
        ssid: {wifi.ssid}
        password: {wifi.password}
        authType: {wifi.authType || "none"}
        hidden: {(wifi.hidden || false).toString()}
      </pre>
    </>
  );
};
