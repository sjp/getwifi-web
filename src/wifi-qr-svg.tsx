import { QRCodeSVG } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { generateQrCode } from "./qrcode";
import { forwardRef } from "preact/compat";
import { EmptyQrSvg } from "./empty-qr-svg";

export interface WifiQrCodeSvgProps {
  readonly wifi: WifiDetails;
}

export const WifiQrCodeSvg = forwardRef<SVGSVGElement, WifiQrCodeSvgProps>(
  ({ wifi }, ref) => {
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
  }
);
