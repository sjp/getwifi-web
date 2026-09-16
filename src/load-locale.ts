import en from "./i18n/en/index";
import { initFormatters } from "./i18n/formatters";
import { baseLocale, loadedFormatters, loadedLocales } from "./i18n/i18n-util";
import type { Translations } from "./i18n/i18n-types";

// Synchronously load the base locale ('en'). Importing it statically keeps it in
// the main bundle so the first render — including the build-time prerender, where
// effects do not run — has translations available without awaiting a dynamic
// import. Every other locale is code-split (see i18n-util.async's dynamic
// imports) and fetched on demand: the detected locale after hydration, and any
// locale chosen via the language selector.
export const loadBaseLocale = (): void => {
  // The generated dictionary widens interpolated strings to `string`, losing the
  // template-literal types `Translations` expects. typesafe-i18n's own generated
  // loader asserts identically; we cannot reuse it because it statically imports
  // every locale, which would defeat the code-splitting described above.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  loadedLocales[baseLocale] = en as unknown as Translations;
  loadedFormatters[baseLocale] = initFormatters(baseLocale);
};
