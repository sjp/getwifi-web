import { renderHook } from "@testing-library/preact";
import { expect, it } from "vitest";
import type { Locales } from "../i18n/i18n-types";
import { useHtmlLang } from "./use-html-lang";

it("sets the document language and text direction", () => {
  const root = document.documentElement;
  const { rerender } = renderHook(
    ({ locale }: { readonly locale: Locales }) => {
      useHtmlLang(locale);
    },
    {
      initialProps: { locale: "en" },
    },
  );
  expect(root.lang).toBe("en");
  expect(root.dir).toBe("ltr");

  rerender({ locale: "ar" });
  expect(root.lang).toBe("ar");
  expect(root.dir).toBe("rtl");

  rerender({ locale: "ur" });
  expect(root.dir).toBe("rtl");

  rerender({ locale: "zh-TW" });
  expect(root.lang).toBe("zh-TW");
  expect(root.dir).toBe("ltr");
});
