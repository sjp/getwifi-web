import { QRCodeCanvas } from "qrcode.react";
import type { WifiDetails } from "./wifi";
import { forwardRef } from "preact/compat";
import { generateQrCode } from "./qrcode";
import { useImperativeHandle, useRef } from "preact/hooks";

export interface WifiQrCodeCanvasProps {
  readonly wifi: WifiDetails;
}

export const WifiQrCodeCanvas = forwardRef<
  HTMLCanvasElement,
  WifiQrCodeCanvasProps
>(({ wifi }, ref) => {
  const qrCode = generateQrCode(wifi);
  const innerRef = useRef<HTMLCanvasElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLCanvasElement);

  return (
    <QRCodeCanvas
      ref={innerRef}
      value={qrCode}
      level="H"
      includeMargin={true}
      width="512px"
      height="512px"
    />
  );
});
