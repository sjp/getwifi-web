import { useEffect } from "preact/hooks";
import { useI18nContext } from "../i18n/i18n-react";
import type { Locales } from "../i18n/i18n-types";
import { loadLocaleAsync } from "../i18n/i18n-util.async";

// The first render uses the base locale ('en') so the prerender and hydration
// agree. Once on the client, upgrade to the visitor's detected locale by lazily
// loading its (code-split) dictionary, then switching. Runs on mount only;
// subsequent locale changes come from the selector. On failure we simply stay
// on the base locale.
export const useDetectedLocale = (detectedLocale: Locales): void => {
  const { locale, setLocale } = useI18nContext();

  useEffect(() => {
    if (detectedLocale === locale) {
      return;
    }
    void loadLocaleAsync(detectedLocale).then(() => {
      setLocale(detectedLocale);
    });
  }, []);
};
