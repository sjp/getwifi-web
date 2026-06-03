import { Root } from "./root";
import "./app.scss";
import TypesafeI18n from "./i18n/i18n-react";
import { navigatorDetector } from "typesafe-i18n/detectors";
import { loadAllLocales } from "./i18n/i18n-util.sync";
import { detectLocale } from "./i18n/i18n-util";

// Detect locale
// Use as advanced locale detection strategy as you like.
// More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
const detectedLocale = typeof window !== "undefined" ? detectLocale(navigatorDetector) : "en";

// Load all locales synchronously at module scope. This must happen before the
// first render (including during prerender, where effects do not run) so the
// static HTML is populated rather than empty.
loadAllLocales();

export const App = () => {
  return (
    <TypesafeI18n locale={detectedLocale}>
      <Root />
    </TypesafeI18n>
  );
};
