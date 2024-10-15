import { Classic } from "@theme-toggles/react";
import "./root.css";
import { GlobeIcon } from "./globe-icon";

const LanguageSelector = () => {
  return (
    <details class="dropdown">
      {/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
      <summary role="button" class="lang-select outline secondary">
        <GlobeIcon />
        English
      </summary>
      <ul>
        <li>Francais</li>
        <li>Italiano</li>
        <li>Espanol</li>
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
