import { useComputed, useSignal } from "@preact/signals";
import "./root.css";
import type { WifiAuthType, WifiDetails } from "./models";
import { useRef } from "preact/hooks";
import { usePrintContent } from "./usePrintContent";
import { downloadSvg } from "./downloadContent";
import { DownloadWifiQrCodePng } from "./download-wifi-qr-png";
import { WifiQrCodeSvg } from "./wifi-qr-svg";
import { DownloadIcon } from "./download-icon";
import { PrinterIcon } from "./printer-icon";

export const Root = () => {
  const ssid = useSignal("");
  const password = useSignal("");
  const authType = useSignal<WifiAuthType>("wpa");
  const hidden = useSignal(false);
  const qrparams = useComputed<WifiDetails>(() => ({
    ssid: ssid.value,
    password: password.value,
    authType: authType.value,
    hidden: hidden.value,
  }));
  const shouldDownloadPng = useSignal(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const print = usePrintContent({
    contentRef: svgRef,
    documentTitle: "WiFi QR TEST",
  });

  return (
    <>
      <header>
        <h1>Get WiFi in seconds!</h1>
      </header>
      <main class="container">
        <div class="grid">
          <form>
            <fieldset>
              <label>
                SSID / Network ID
                <input
                  type="text"
                  onInput={(evt) => {
                    ssid.value = evt.currentTarget.value;
                  }}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  onInput={(evt) => {
                    password.value = evt.currentTarget.value;
                  }}
                />
              </label>
              <label>
                Encryption
                <select
                  onInput={(evt) => {
                    authType.value = evt.currentTarget.value as WifiAuthType;
                  }}
                >
                  <option value="wpa">WPA / WPA2 / WPA3</option>
                  <option value="none">None</option>
                  <option value="wep">WEP</option>
                </select>
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() => {
                    hidden.value = !hidden.value;
                  }}
                />
                Hidden
              </label>
            </fieldset>
          </form>
          <div>
            <WifiQrCodeSvg wifi={qrparams.value} ref={svgRef} />
            <div class="grid">
              <button
                class="outline secondary"
                type="button"
                onClick={() => downloadSvg(svgRef.current)}
              >
                <DownloadIcon /> SVG
              </button>
              <button
                class="outline secondary"
                type="button"
                onClick={() => {
                  shouldDownloadPng.value = true;
                }}
              >
                <DownloadIcon /> PNG
              </button>
              <button
                class="outline secondary"
                type="button"
                onClick={() => {
                  print();
                }}
              >
                <PrinterIcon /> Print
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer>Made by me &copy; {new Date().getFullYear()}</footer>
      {shouldDownloadPng.value ? (
        <DownloadWifiQrCodePng
          wifi={qrparams.value}
          onDownloaded={() => {
            shouldDownloadPng.value = false;
          }}
        />
      ) : null}
    </>
  );
};
