import { Classic } from "@theme-toggles/react";
import "./root.css";

const LanguageSelector = () => {
  return <></>;
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
            style={{ outline: "none" }}
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
