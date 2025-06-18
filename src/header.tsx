import { useI18nContext } from "./i18n/i18n-react";
import { useCallback } from "preact/hooks";
import { useTheme } from "./hooks/use-theme";
import { LanguageSelector } from "./language-selector";
import { Classic } from "./icons/dark-mode-toggle-icon";

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
            aria-label={LL.themeToggle()}
            toggled={isToggled}
            className="secondary"
            onToggled={toggleTheme}
          />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};
