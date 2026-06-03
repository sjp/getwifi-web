import { useComputed, useSignal } from "@preact/signals";
import type { WifiAuthType, WifiDetails } from "./wifi";
import { useEffect, useRef } from "preact/hooks";
import type { Locales } from "./i18n/i18n-types";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { usePrintContent } from "./hooks/use-print-content";
import { downloadSvg } from "./download-content";
import { DownloadWifiQrCodePng } from "./download-wifi-qr-png";
import { WifiQrCodeSvg } from "./wifi-qr-svg";
import { DownloadIcon } from "./icons/download-icon";
import { PrinterIcon } from "./icons/printer-icon";
import { Header } from "./header";
import { Footer } from "./footer";
import { useI18nContext } from "./i18n/i18n-react";
import { useHtmlLang } from "./hooks/use-html-lang";

export interface RootProps {
  readonly detectedLocale: Locales;
}

export const Root = ({ detectedLocale }: RootProps) => {
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
    documentTitle: `WiFi - ${ssid.value}`,
  });
  const { LL, locale, setLocale } = useI18nContext();
  useHtmlLang(locale);

  // The first render uses the base locale ('en') so the prerender and hydration
  // agree. Once on the client, upgrade to the visitor's detected locale by
  // lazily loading its (code-split) dictionary, then switching. Runs on mount
  // only; subsequent locale changes come from the selector. On failure we simply
  // stay on the base locale.
  useEffect(() => {
    if (detectedLocale === locale) {
      return;
    }
    void loadLocaleAsync(detectedLocale).then(() => setLocale(detectedLocale));
  }, []);

  return (
    <>
      <Header />
      <main class="container">
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
