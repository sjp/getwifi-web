import { QRCodeCanvas } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { generateQrCode } from "./qrcode";
import type { Ref } from "preact";

export interface WifiQrCodeCanvasProps {
  readonly wifi: WifiDetails;
  readonly ref: Ref<HTMLCanvasElement>;
}

export const WifiQrCodeCanvas = ({ wifi, ref }: WifiQrCodeCanvasProps) => {
  const qrCode = generateQrCode(wifi);

  return <QRCodeCanvas ref={ref} value={qrCode} level="H" marginSize={4} size={512} />;
};
