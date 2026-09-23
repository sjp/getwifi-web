import { fireEvent, screen } from "@testing-library/preact";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./header";
import { useI18nContext } from "./i18n/i18n-react";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { mockMatchMedia } from "./test/match-media";
import { renderWithI18n } from "./test/render";

const CurrentLocale = () => {
  const { locale } = useI18nContext();
  return <output>{locale}</output>;
};

describe("Header", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockMatchMedia();
  });

  it("toggles between light and dark themes", () => {
    renderWithI18n(<Header />);
    const toggle = screen.getByRole("button", { name: "Toggle Theme" });
    expect(document.documentElement.dataset.theme).toBe("light");

    fireEvent.click(toggle);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(toggle);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem("theme")).toBeNull();
  });

  it("sets the document title", () => {
    renderWithI18n(<Header />);
    expect(document.title).toBe("WiFi QR Codes in Seconds - getwifi.link");
  });

  it("switches language from the selector", async () => {
    // Preload the locale so the selector's dynamic import resolves from the module
    // cache rather than racing `vi.waitFor`'s timeout on a cold, loaded run.
    await loadLocaleAsync("fr");
    renderWithI18n(
      <>
        <Header />
        <CurrentLocale />
      </>,
    );
    const select = screen.getByRole<HTMLSelectElement>("combobox", { name: "Language" });
    expect(select.value).toBe("en");

    // Testing Library's `fireEvent.change` dispatches an `input` event for Preact,
    // so dispatch a real `change` event as a browser would.
    select.value = "fr";
    fireEvent(select, new Event("change", { bubbles: true }));

    await vi.waitFor(() => {
      expect(screen.getByRole("status").textContent).toBe("fr");
    });
    expect(select.value).toBe("fr");
  });

  it("offers every supported locale", async () => {
    const { locales } = await import("./i18n/i18n-util");
    renderWithI18n(<Header />);
    const options = screen.getAllByRole<HTMLOptionElement>("option").map((option) => option.value);
    expect(options.toSorted()).toEqual(locales.toSorted());
  });
});
