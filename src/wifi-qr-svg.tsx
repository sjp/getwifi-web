import { QRCodeSVG } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { generateQrCode } from "./qrcode";
import { EmptyQrSvg } from "./empty-qr-svg";
import type { Ref } from "preact";

export interface WifiQrCodeSvgProps {
  readonly wifi: WifiDetails;
  readonly ref: Ref<SVGSVGElement>;
}

export const WifiQrCodeSvg = ({ wifi, ref }: WifiQrCodeSvgProps) => {
  if (!wifi.ssid) {
    return <EmptyQrSvg ref={ref} />;
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
