import { useComputed, useSignal } from "@preact/signals";
import type { WifiAuthType, WifiDetails } from "./wifi";
import { useRef } from "preact/hooks";
import { usePrintContent } from "./hooks/use-print-content";
import { downloadSvg } from "./download-content";
import { DownloadWifiQrCodePng } from "./download-wifi-qr-png";
import { WifiQrCodeSvg } from "./wifi-qr-svg";
import { DownloadIcon } from "./icons/download-icon";
import { PrinterIcon } from "./icons/printer-icon";
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
        <section>
          <article>
            <header>
              <h1 style={{ textAlign: "center" }}>{LL.ctaHeader()}</h1>
            </header>
            <p>{LL.ctaDescription()}</p>
          </article>
        </section>
        <section>
          <div class="grid">
            <div>
              <form autocomplete="off">
                <fieldset>
                  <label>
                    {LL.ssid()}
                    <input
                      name="ssid"
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
                      name="password"
                      type="password"
                      onInput={(evt) => {
                        password.value = evt.currentTarget.value;
                      }}
                    />
                  </label>
                  <label>
                    {LL.encryption()}
                    <select
                      name="encryption"
                      onInput={(evt) => {
                        authType.value = evt.currentTarget
                          .value as WifiAuthType;
                      }}
                    >
                      <option value="wpa">WPA / WPA2 / WPA3</option>
                      <option value="none">None</option>
                      <option value="wep">WEP</option>
                    </select>
                  </label>
                  <label>
                    <input
                      name="hidden"
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
        </section>
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
