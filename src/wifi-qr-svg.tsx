import { QRCodeSVG } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { generateQrCode } from "./qrcode";
import type { RefAttributes } from "preact/compat";
import { EmptyQrSvg } from "./empty-qr-svg";

export interface WifiQrCodeSvgProps extends RefAttributes<SVGSVGElement> {
  readonly wifi: WifiDetails;
}

export const WifiQrCodeSvg = ({ wifi, ref }: WifiQrCodeSvgProps) => {
  if (!wifi.ssid) {
    return <EmptyQrSvg />;
  }

  const qrCode = generateQrCode(wifi);

  return (
    <QRCodeSVG
      ref={ref}
      value={qrCode}
      level="H"
      includeMargin={true}
      width="100%"
      height="100%"
    />
  );
};
