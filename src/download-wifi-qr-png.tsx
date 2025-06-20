import { useEffect, useRef } from "preact/hooks";
import type { WifiDetails } from "./wifi";
import { WifiQrCodeCanvas } from "./wifi-qr-canvas";
import { downloadPng } from "./download-content";
import { getElement } from "./get-element";

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

    const canvasElement = getElement(canvasRef.current);
    if (!canvasElement) {
      return;
    }

    downloadPng(canvasElement);
    onDownloaded();
  }, []);

  return (
    <div style={{ display: "none" }}>
      <WifiQrCodeCanvas wifi={wifi} ref={canvasRef} />
    </div>
  );
};
