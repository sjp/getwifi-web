import { renderHook, waitFor } from "@testing-library/preact";
import type { ComponentChildren } from "preact";
import { describe, expect, it, vi } from "vitest";
import TypesafeI18n, { useI18nContext } from "../i18n/i18n-react";
import type { Locales } from "../i18n/i18n-types";
import { loadLocaleAsync } from "../i18n/i18n-util.async";
import "../test/render";
import { useDetectedLocale } from "./use-detected-locale";

vi.mock(import("../i18n/i18n-util.async"), async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, loadLocaleAsync: vi.fn(actual.loadLocaleAsync) };
});

const wrapper = ({ children }: { readonly children?: ComponentChildren }) => (
  <TypesafeI18n locale="en">{children}</TypesafeI18n>
);

const renderDetected = (detected: Locales) =>
  renderHook(
    () => {
      useDetectedLocale(detected);
      return useI18nContext();
    },
    { wrapper },
  );

describe("useDetectedLocale", () => {
  it("stays on the base locale when it was detected", () => {
    const { result } = renderDetected("en");
    expect(result.current.locale).toBe("en");
    expect(loadLocaleAsync).not.toHaveBeenCalled();
  });

  it("loads and switches to a different detected locale", async () => {
    const { result } = renderDetected("de");
    expect(loadLocaleAsync).toHaveBeenCalledWith("de");
    await waitFor(() => {
      expect(result.current.locale).toBe("de");
    });
    expect(result.current.LL.password()).toBe("Passwort");
  });
});
