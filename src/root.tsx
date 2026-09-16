import { useComputed, useSignal } from "@preact/signals";
import type { WifiAuthType, WifiDetails } from "./wifi";
import { WifiForm } from "./wifi-form";
import type { Locales } from "./i18n/i18n-types";
import { DownloadWifiQrCodePng } from "./download-wifi-qr-png";
import { QrPanel } from "./qr-panel";
import { Header } from "./header";
import { Footer } from "./footer";
import { useI18nContext } from "./i18n/i18n-react";
import { useDetectedLocale } from "./hooks/use-detected-locale";
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

  const { locale } = useI18nContext();
  useHtmlLang(locale);
  useDetectedLocale(detectedLocale);

  return (
    <>
      <Header />
      <main class="container">
        <section>
          <div class="grid">
            <div>
              <WifiForm ssid={ssid} password={password} authType={authType} hidden={hidden} />
            </div>
            <QrPanel wifi={qrparams.value} shouldDownloadPng={shouldDownloadPng} />
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
