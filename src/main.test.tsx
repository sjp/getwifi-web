import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "./test/match-media";

describe("main", () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = "";
    mockMatchMedia();
  });

  it("prerenders the app to HTML", async () => {
    const { prerender } = await import("./main");
    const { html } = await prerender();
    expect(html).toContain("getwifi.link");
    expect(html).toContain("SSID / Network ID");
  });

  it("hydrates into the #app element", async () => {
    document.body.innerHTML = '<div id="app"></div>';
    await import("./main");
    await vi.waitFor(() => {
      expect(document.querySelector("#app header")).not.toBeNull();
    });
  });
});
