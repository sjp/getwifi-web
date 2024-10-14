import { useEffect, useRef } from "preact/hooks";
import type { WifiDetails } from "./models";
import { WifiQrCodeCanvas } from "./wifi-qr-canvas";
import { downloadPng } from "./downloadContent";
import { getCanvasElement } from "./getSvgElement";

export interface DownloadWifiQrCodePngProps {
  readonly wifi: WifiDetails;
  readonly onDownloaded: () => void;
}

export const DownloadWifiQrCodePng = ({
  wifi,
  onDownloaded,
}: DownloadWifiQrCodePngProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvasElement = getCanvasElement(canvasRef.current);
    if (!canvasElement) {
      return;
    }

    downloadPng(canvasElement);
    onDownloaded();
  }, [onDownloaded]);

  return (
    <div style={{ display: "none" }}>
      <WifiQrCodeCanvas wifi={wifi} ref={canvasRef} />
    </div>
  );
};
