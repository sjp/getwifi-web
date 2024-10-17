import { QRCodeCanvas } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import type { RefAttributes } from "preact/compat";
import { generateQrCode } from "./qrcode";

export interface WifiQrCodeCanvasProps
  extends RefAttributes<HTMLCanvasElement> {
  readonly wifi: WifiDetails;
}

export const WifiQrCodeCanvas = ({ wifi, ref }: WifiQrCodeCanvasProps) => {
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
};
