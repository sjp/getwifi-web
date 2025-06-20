import { QRCodeCanvas } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { forwardRef } from "preact/compat";
import { generateQrCode } from "./qrcode";

export interface WifiQrCodeCanvasProps {
  readonly wifi: WifiDetails;
}

export const WifiQrCodeCanvas = forwardRef<
  HTMLCanvasElement,
  WifiQrCodeCanvasProps
>(({ wifi }, ref) => {
  const qrCode = generateQrCode(wifi);

  return (
    <QRCodeCanvas
      ref={ref}
      value={qrCode}
      level="H"
      includeMargin={true}
      width="512px"
      height="512px"
    />
  );
});
