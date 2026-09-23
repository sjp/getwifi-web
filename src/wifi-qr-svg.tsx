import { QRCodeSVG } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { generateQrCode } from "./qrcode";
import { EmptyQrSvg } from "./empty-qr-svg";
import type { Ref } from "preact";

export interface WifiQrCodeSvgProps {
  readonly wifi: WifiDetails;
  readonly svgRef: Ref<SVGSVGElement>;
}

export const WifiQrCodeSvg = ({ wifi, svgRef }: WifiQrCodeSvgProps) => {
  if (!wifi.ssid) {
    return <EmptyQrSvg svgRef={svgRef} />;
  }

  const qrCode = generateQrCode(wifi);

  return (
    <QRCodeSVG ref={svgRef} value={qrCode} level="H" marginSize={4} width="100%" height="100%" />
  );
};
