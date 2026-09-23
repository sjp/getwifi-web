import { signal } from "@preact/signals";
import { fireEvent, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import { QrPanel } from "./qr-panel";
import { renderWithI18n } from "./test/render";
import type { WifiDetails } from "./wifi";

const CAFE: WifiDetails = { ssid: "Cafe", password: "pw", authType: "wpa" };

const renderPanel = (wifi: WifiDetails) => {
  const shouldDownloadPng = signal(false);
  renderWithI18n(<QrPanel wifi={wifi} shouldDownloadPng={shouldDownloadPng} />);
  return {
    shouldDownloadPng,
    svgButton: screen.getByRole<HTMLButtonElement>("button", { name: /SVG/u }),
    pngButton: screen.getByRole<HTMLButtonElement>("button", { name: /PNG/u }),
    printButton: screen.getByRole<HTMLButtonElement>("button", { name: /Print/u }),
  };
};

describe("QrPanel", () => {
  it("disables every action until there is an SSID", () => {
    const { svgButton, pngButton, printButton } = renderPanel({ ssid: "" });
    expect(svgButton.disabled).toBe(true);
    expect(pngButton.disabled).toBe(true);
    expect(printButton.disabled).toBe(true);
  });

  it("downloads the rendered QR code as an SVG", async () => {
    const createObjectURL = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:svg");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    const downloads: string[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      downloads.push(this.download);
    });
    const { svgButton } = renderPanel(CAFE);

    fireEvent.click(svgButton);

    expect(downloads).toEqual(["wifi-Cafe-qrcode.svg"]);
    const [blob] = createObjectURL.mock.calls[0] ?? [];
    if (!(blob instanceof Blob)) {
      throw new TypeError("expected the SVG to be downloaded as a Blob");
    }
    const svg = await blob.text();
    expect(svg).toMatch(/^<svg[^>]*>/u);
    expect(svg).toContain("<path");
  });

  it("requests a PNG download", () => {
    const { pngButton, shouldDownloadPng } = renderPanel(CAFE);
    fireEvent.click(pngButton);
    expect(shouldDownloadPng.value).toBe(true);
  });

  it("prints the rendered QR code", () => {
    const { printButton } = renderPanel(CAFE);
    fireEvent.click(printButton);

    const frame = document.querySelector<HTMLIFrameElement>("#printIframe");
    const win = frame?.contentWindow;
    if (!frame || !win) {
      throw new Error("expected an attached print iframe");
    }
    // happy-dom does not implement `print`; record the markup being printed
    // (the frame's document is torn down once printing finishes).
    const printed: string[] = [];
    win.print = () => {
      printed.push(win.document.body.innerHTML);
    };

    frame.dispatchEvent(new Event("load"));
    vi.runAllTimers();

    expect(printed).toHaveLength(1);
    expect(printed[0]).toMatch(/^<svg[^>]*viewBox="0 0 41 41"[^>]*>/u);
    expect(printed[0]).toContain("<path");
    expect(document.querySelector("#printIframe")).toBeNull();
  });
});
