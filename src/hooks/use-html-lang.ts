import { useLayoutEffect } from "preact/hooks";
import type { Locales } from "../i18n/i18n-types";

// Locales that are written right-to-left. Keep in sync with the shipped locales.
const RTL_LOCALES = new Set<Locales>(["ar", "ur"]);

// Keeps the document's language and text direction in sync with the active
// locale. This covers both the auto-detected locale on first load and any
// later switch via the language selector, so assistive tech is told the correct
// language and RTL scripts (Arabic, Urdu) lay out correctly.
export const useHtmlLang = (locale: Locales): void => {
  useLayoutEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.lang = locale;
    root.dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
  }, [locale]);
};
