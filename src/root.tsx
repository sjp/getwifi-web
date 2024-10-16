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
import { Header } from "./header";
import { Footer } from "./footer";
import { useI18nContext } from "./i18n/i18n-react";

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
    documentTitle: `WiFi - ${ssid}`,
  });
  const { LL } = useI18nContext();
  
  return (
    <>
      <Header />
      <main class="container">
        <h1>Create WiFi QR codes in seconds!</h1>
        <p>
          Sharing WiFi credentials with a QR code makes it easy for your guests
          to connect to your WiFi network without entering a long and
          complicated password.
        </p>
        <div class="grid">
          <div>
            <form>
              <fieldset>
                <label>
                  {LL.ssid()}
                  <input
                    autofocus={true}
                    type="text"
                    onInput={(evt) => {
                      ssid.value = evt.currentTarget.value;
                    }}
                  />
                </label>
                <label>
                  {LL.password()}
                  <input
                    type="password"
                    onInput={(evt) => {
                      password.value = evt.currentTarget.value;
                    }}
                  />
                </label>
                <label>
                  {LL.encryption()}
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
                  {LL.hidden()}
                </label>
              </fieldset>
            </form>
          </div>
          <div class="qr-column">
            <WifiQrCodeSvg wifi={qrparams.value} ref={svgRef} />
            <div class="qr-operations">
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
                <PrinterIcon /> {LL.print()}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
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
