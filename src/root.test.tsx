import { fireEvent, screen } from "@testing-library/preact";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Root } from "./root";
import { mockMatchMedia } from "./test/match-media";
import { renderWithI18n } from "./test/render";

describe("Root", () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it("sets the document language", () => {
    renderWithI18n(<Root detectedLocale="en" />);
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dir).toBe("ltr");
  });

  it("renders a QR code once an SSID is entered", async () => {
    const { container } = renderWithI18n(<Root detectedLocale="en" />);
    const qrSvg = () => container.querySelector(".qr-column svg");
    expect(qrSvg()?.getAttribute("viewBox")).toBe("0 0 33 33");
    expect(screen.getByRole<HTMLButtonElement>("button", { name: /SVG/u }).disabled).toBe(true);

    fireEvent.input(screen.getByLabelText("SSID / Network ID"), { target: { value: "Cafe" } });
    await Promise.resolve();

    expect(qrSvg()?.getAttribute("viewBox")).not.toBe("0 0 33 33");
    expect(screen.getByRole<HTMLButtonElement>("button", { name: /SVG/u }).disabled).toBe(false);
  });

  it("downloads a PNG and then removes the offscreen canvas", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue("data:image/png;base64,");
    const downloads: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      downloads.push(this.download);
    });
    const { container } = renderWithI18n(<Root detectedLocale="en" />);

    fireEvent.input(screen.getByLabelText("SSID / Network ID"), { target: { value: "Cafe" } });
    await Promise.resolve();
    fireEvent.click(screen.getByRole("button", { name: /PNG/u }));
    await vi.waitFor(() => {
      expect(downloads).toEqual(["wifi-Cafe-qrcode.png"]);
    });
    await vi.waitFor(() => {
      expect(container.querySelector("canvas")).toBeNull();
    });
  });
});
