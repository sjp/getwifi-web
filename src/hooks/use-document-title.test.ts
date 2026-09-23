import { renderHook } from "@testing-library/preact";
import { expect, it } from "vitest";
import { useDocumentTitle } from "./use-document-title";

it("sets and updates the document title", () => {
  const { rerender } = renderHook(
    ({ title }: { readonly title: string }) => {
      useDocumentTitle(title);
    },
    {
      initialProps: { title: "First" },
    },
  );
  expect(document.title).toBe("First");

  rerender({ title: "Second" });
  expect(document.title).toBe("Second");
});
