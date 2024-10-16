import { Classic } from "@theme-toggles/react";
import "./root.css";
import { GlobeIcon } from "./globe-icon";
import { useI18nContext } from "./i18n/i18n-react";
import type { KeyboardEvent } from "preact/compat";
import { useCallback } from "preact/hooks";
import { useTheme } from "./use-theme";

interface LanguageRowProps {
  name: string;
  onSelected: () => void;
}

const LanguageRow = ({ name, onSelected }: LanguageRowProps) => {
  const handleEnter = (evt: KeyboardEvent<HTMLLIElement>) => {
    if (evt.key !== "Enter") {
      return;
    }

    onSelected();
  };

  return (
    <li
      onKeyDown={handleEnter}
      onClick={() => {
        onSelected();
      }}
    >
      {name}
    </li>
  );
};

const LanguageSelector = () => {
  const { LL, setLocale } = useI18nContext();

  return (
    <details class="dropdown">
      {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
      <summary role="button" class="lang-select outline secondary">
        <GlobeIcon />
        {LL.lang()}
      </summary>
      <ul>
        <LanguageRow name="English" onSelected={() => setLocale("en")} />
        <LanguageRow name="简体中文" onSelected={() => setLocale("zh-CN")} />
        <LanguageRow name="繁體中文" onSelected={() => setLocale("zh-TW")} />
        <LanguageRow name="हिन्दी" onSelected={() => setLocale("hi")} />
        <LanguageRow name="Español" onSelected={() => setLocale("es")} />
        <LanguageRow name="Français" onSelected={() => setLocale("fr")} />
        <LanguageRow name="العربية" onSelected={() => setLocale("ar")} />
        <LanguageRow name="বাংলা" onSelected={() => setLocale("bn")} />
        <LanguageRow name="Русский" onSelected={() => setLocale("ru")} />
        <LanguageRow name="Português" onSelected={() => setLocale("pt")} />
        <LanguageRow
          name="Bahasa Indonesia"
          onSelected={() => setLocale("id")}
        />
        <LanguageRow name="اردو" onSelected={() => setLocale("ur")} />
        <LanguageRow name="日本語" onSelected={() => setLocale("ja")} />
        <LanguageRow name="Deutsch" onSelected={() => setLocale("de")} />
        <LanguageRow name="Kiswahili" onSelected={() => setLocale("sw")} />
        <LanguageRow name="मराठी" onSelected={() => setLocale("mr")} />
        <LanguageRow name="తెలుగు" onSelected={() => setLocale("te")} />
        <LanguageRow name="Türkçe" onSelected={() => setLocale("tr")} />
        <LanguageRow name="தமிழ்" onSelected={() => setLocale("ta")} />
        <LanguageRow name="Tiếng Việt" onSelected={() => setLocale("vi")} />
        <LanguageRow name="한국어" onSelected={() => setLocale("ko")} />
        <LanguageRow name="Italiano" onSelected={() => setLocale("it")} />
      </ul>
    </details>
  );
};

export const Header = () => {
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
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        getwifi.link
      </div>
      <div
        class="container"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Classic
          toggled={isToggled}
          // biome-ignore lint/suspicious/noReactSpecificProps: for compat with react, this must be className, even though preact supports class
          className="outline secondary"
          onToggle={toggleTheme}
        />
        <LanguageSelector />
      </div>
    </header>
  );
};
