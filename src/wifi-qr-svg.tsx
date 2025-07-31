import { QRCodeSVG } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { generateQrCode } from "./qrcode";
import { forwardRef } from "preact/compat";
import { EmptyQrSvg } from "./empty-qr-svg";
import { useImperativeHandle, useRef } from "preact/hooks";

export interface WifiQrCodeSvgProps {
  readonly wifi: WifiDetails;
}

export const WifiQrCodeSvg = forwardRef<SVGSVGElement, WifiQrCodeSvgProps>(
  ({ wifi }, ref) => {
    const innerRef = useRef<SVGSVGElement>(null);
    useImperativeHandle(ref, () => innerRef.current as SVGSVGElement);

    if (!wifi.ssid) {
      return <EmptyQrSvg ref={innerRef} />;
    }

    const qrCode = generateQrCode(wifi);

    return (
      <QRCodeSVG
        ref={innerRef}
        value={qrCode}
        level="H"
        includeMargin={true}
        width="100%"
        height="100%"
      />
    );
  }
);
