import { Root } from "./root";
import "./app.scss";
import TypesafeI18n from "./i18n/i18n-react";
import { navigatorDetector } from "typesafe-i18n/detectors";
import { detectLocale } from "./i18n/i18n-util";
import { loadBaseLocale } from "./load-locale";

// Detect locale
// Use as advanced locale detection strategy as you like.
// More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
const detectedLocale = typeof window !== "undefined" ? detectLocale(navigatorDetector) : "en";

// Synchronously load only the base locale before the first render (including the
// prerender). The detected locale is loaded and applied after hydration, and all
// other locales are code-split and fetched on demand.
loadBaseLocale();

export const App = () => {
  return (
    <TypesafeI18n locale="en">
      <Root detectedLocale={detectedLocale} />
    </TypesafeI18n>
  );
};
