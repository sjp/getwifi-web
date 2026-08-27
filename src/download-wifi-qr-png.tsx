import { useEffect, useRef } from "preact/hooks";
import type { WifiDetails } from "./wifi";
import { WifiQrCodeCanvas } from "./wifi-qr-canvas";
import { downloadPng, qrFileName } from "./download-content";

export interface DownloadWifiQrCodePngProps {
  readonly wifi: WifiDetails;
  readonly onDownloaded: () => void;
}

export const DownloadWifiQrCodePng = ({ wifi, onDownloaded }: DownloadWifiQrCodePngProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    downloadPng(canvasRef.current, qrFileName(wifi.ssid, "png"));
    onDownloaded();
  }, []);

  return (
    <div style={{ display: "none" }}>
      <WifiQrCodeCanvas wifi={wifi} ref={canvasRef} />
    </div>
  );
};
