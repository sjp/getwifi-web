import type { ChangeEvent } from "preact/compat";
import { useDocumentTitle } from "./hooks/use-document-title";
import { useI18nContext } from "./i18n/i18n-react";
import type { Locales } from "./i18n/i18n-types";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { LanguageOption } from "./language-option";

export const LanguageSelector = () => {
  const { LL, setLocale } = useI18nContext();
  const title = `${LL.htmlTitle()} - getwifi.link`;
  useDocumentTitle(title);

  return (
    <select
      class="lang-select"
      onChange={async (evt: ChangeEvent<HTMLSelectElement>) => {
        const lcl = evt.currentTarget.value as Locales;
        // The chosen locale's dictionary is code-split, so load it before
        // switching (no-op once it has been loaded).
        await loadLocaleAsync(lcl);
        setLocale(lcl);
      }}
    >
      <LanguageOption name="English" locale="en" />
      <LanguageOption name="简体中文" locale="zh-CN" />
      <LanguageOption name="繁體中文" locale="zh-TW" />
      <LanguageOption name="हिन्दी" locale="hi" />
      <LanguageOption name="Español" locale="es" />
      <LanguageOption name="Français" locale="fr" />
      <LanguageOption name="العربية" locale="ar" />
      <LanguageOption name="বাংলা" locale="bn" />
      <LanguageOption name="Русский" locale="ru" />
      <LanguageOption name="Português" locale="pt" />
      <LanguageOption name="Bahasa Indonesia" locale="id" />
      <LanguageOption name="اردو" locale="ur" />
      <LanguageOption name="日本語" locale="ja" />
      <LanguageOption name="Deutsch" locale="de" />
      <LanguageOption name="Kiswahili" locale="sw" />
      <LanguageOption name="मराठी" locale="mr" />
      <LanguageOption name="తెలుగు" locale="te" />
      <LanguageOption name="Türkçe" locale="tr" />
      <LanguageOption name="தமிழ்" locale="ta" />
      <LanguageOption name="Tiếng Việt" locale="vi" />
      <LanguageOption name="한국어" locale="ko" />
      <LanguageOption name="Italiano" locale="it" />
    </select>
  );
};
