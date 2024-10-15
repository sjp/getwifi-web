import { Root } from "./root";
import "./app.scss";
import TypesafeI18n from "./i18n/i18n-react";
import { useState, useEffect } from "preact/hooks";
import { navigatorDetector } from "typesafe-i18n/detectors";
import { loadAllLocales } from "./i18n/i18n-util.sync";
import { detectLocale } from "./i18n/i18n-util";

// Detect locale
// Use as advanced locale detection strategy as you like.
// More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
const detectedLocale = detectLocale(navigatorDetector);

export const App = () => {
  // Load locales
  // (Use a data fetching solution that you prefer)
  const [localesLoaded, setLocalesLoaded] = useState(false);
  useEffect(() => {
    loadAllLocales();
    setLocalesLoaded(true);
  }, []);

  if (!localesLoaded) {
    return <></>;
  }

  return (
    <TypesafeI18n locale={detectedLocale}>
      <Root />
    </TypesafeI18n>
  );
};
