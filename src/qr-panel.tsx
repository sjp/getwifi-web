import type { Signal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { downloadSvg, qrFileName } from "./download-content";
import { usePrintContent } from "./hooks/use-print-content";
import { useI18nContext } from "./i18n/i18n-react";
import { DownloadIcon } from "./icons/download-icon";
import { PrinterIcon } from "./icons/printer-icon";
import type { WifiDetails } from "./wifi";
import { WifiQrCodeSvg } from "./wifi-qr-svg";

export interface QrPanelProps {
  readonly wifi: WifiDetails;
  readonly shouldDownloadPng: Signal<boolean>;
}

export const QrPanel = ({ wifi, shouldDownloadPng }: QrPanelProps) => {
  const { LL } = useI18nContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const print = usePrintContent({
    contentRef: svgRef,
    documentTitle: `WiFi - ${wifi.ssid}`,
  });
  const hasSsid = wifi.ssid.length > 0;

  return (
    <div class="qr-column">
      <WifiQrCodeSvg wifi={wifi} ref={svgRef} />
      <div class="qr-operations">
        <button
          class="outline secondary"
          type="button"
          disabled={!hasSsid}
          onClick={() => {
            downloadSvg(svgRef.current, qrFileName(wifi.ssid, "svg"));
          }}
        >
          <DownloadIcon /> SVG
        </button>
        <button
          class="outline secondary"
          type="button"
          disabled={!hasSsid}
          onClick={() => {
            shouldDownloadPng.value = true;
          }}
        >
          <DownloadIcon /> PNG
        </button>
        <button
          class="outline secondary"
          type="button"
          disabled={!hasSsid}
          onClick={() => {
            print();
          }}
        >
          <PrinterIcon /> {LL.print()}
        </button>
      </div>
    </div>
  );
};
