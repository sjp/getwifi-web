import { Classic } from "@theme-toggles/react";
import "./root.css";
import { GlobeIcon } from "./globe-icon";
import { useI18nContext } from "./i18n/i18n-react";
import type { Locales } from "./i18n/i18n-types";
import type { KeyboardEvent } from "preact/compat";

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
  const { LL, locale, setLocale } = useI18nContext();

  console.log({ lang: LL.lang(), ssid: LL.ssid(), locale });

  return (
    <details class="dropdown">
      {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
      <summary role="button" class="lang-select outline secondary">
        <GlobeIcon />
        {LL.lang()}
      </summary>
      <ul>
        <LanguageRow name="English" onSelected={() => setLocale("en")} />
        <LanguageRow name="Deutsch" onSelected={() => setLocale("de")} />
        <LanguageRow name="简体中文" onSelected={() => setLocale("zh-CN")} />
        <LanguageRow name="繁體中文" onSelected={() => setLocale("zh-TW")} />
      </ul>
    </details>
  );
};

export const Header = () => {
  return (
    <>
      <header>
        <div
          class="container"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Classic
            className="outline secondary"
            onToggle={(toggled: boolean) => {
              // biome-ignore lint/suspicious/noConsole: <explanation>
              // biome-ignore lint/suspicious/noConsoleLog: <explanation>
              console.log(toggled);
            }}
          />
          <LanguageSelector />
        </div>
      </header>
    </>
  );
};
