import { Classic } from "@theme-toggles/react";
import "./root.css";
import { useI18nContext } from "./i18n/i18n-react";
import type { ChangeEvent } from "preact/compat";
import { useCallback, useLayoutEffect } from "preact/hooks";
import { useTheme } from "./use-theme";
import type { Locales } from "./i18n/i18n-types";

const useDocumentTitle = (title: string): void => {
  useLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
};

interface LanguageOptionProps {
  name: string;
  locale: Locales;
}

const LanguageOption = ({ name, locale }: LanguageOptionProps) => {
  return <option value={locale}>{name}</option>;
};

const LanguageSelector = () => {
  const { LL, setLocale } = useI18nContext();
  const title = `${LL.htmlTitle()} - getwifi.link`;
  useDocumentTitle(title);

  return (
    <select
      class="lang-select"
      onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
        const lcl = evt.currentTarget.value as Locales;
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

export const Header = () => {
  const { LL } = useI18nContext();
  const { theme, setTheme } = useTheme();
  const isToggled = theme === "dark";
  const toggleTheme = useCallback(
    (toggled: boolean) => {
      setTheme(toggled ? "dark" : "light");
    },
    [setTheme]
  );

  return (
    <header>
      <div
        class="container"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <strong style={{ marginBottom: "var(--pico-spacing)" }}>
          getwifi.link
        </strong>
        <div
          class="container"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "var(--pico-spacing)",
          }}
        >
          <Classic
            title={LL.themeToggle()}
            ariaLabel={LL.themeToggle()}
            toggled={isToggled}
            // biome-ignore lint/suspicious/noReactSpecificProps: for compat with react, this must be className, even though preact supports class
            className="secondary"
            onToggle={toggleTheme}
          />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
