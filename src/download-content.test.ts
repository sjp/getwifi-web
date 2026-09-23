import { afterEach, describe, expect, it, vi } from "vitest";
import { downloadPng, downloadSvg, qrFileName } from "./download-content";

describe("qrFileName", () => {
  it("includes a sanitised SSID", () => {
    expect(qrFileName('My: "Cafe"/Guest', "svg")).toBe("wifi-My CafeGuest-qrcode.svg");
  });

  it("falls back to a generic name for an empty SSID", () => {
    expect(qrFileName("", "png")).toBe("wifi-qrcode.png");
  });

  it("falls back to a generic name when only reserved characters remain", () => {
    expect(qrFileName(' <>:"/\\|?* ', "png")).toBe("wifi-qrcode.png");
  });

  it("truncates long SSIDs to 100 characters", () => {
    expect(qrFileName("a".repeat(150), "svg")).toBe(`wifi-${"a".repeat(100)}-qrcode.svg`);
  });
});

// Records the link that would be clicked to trigger a download.
const spyOnDownloadLink = () => {
  const clicked: { href: string; download: string; attached: boolean }[] = [];
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    clicked.push({ href: this.href, download: this.download, attached: this.isConnected });
  });
  return clicked;
};

describe("downloadSvg", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("does nothing without an SVG element", () => {
    const clicked = spyOnDownloadLink();
    downloadSvg(null, "wifi.svg");
    expect(clicked).toEqual([]);
  });

  it("downloads the serialised SVG via a temporary object URL", async () => {
    const clicked = spyOnDownloadLink();
    const createObjectURL = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:svg");
    const revokeObjectURL = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 1 1");

    downloadSvg(svg, "wifi.svg");

    expect(clicked).toEqual([{ href: "blob:svg", download: "wifi.svg", attached: true }]);
    expect(document.querySelector("a")).toBeNull();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:svg");

    const [blob] = createObjectURL.mock.calls[0] ?? [];
    if (!(blob instanceof Blob)) {
      throw new TypeError("expected the SVG to be downloaded as a Blob");
    }
    expect(blob.type).toBe("image/svg+xml;charset=utf-8");
    await expect(blob.text()).resolves.toContain('viewBox="0 0 1 1"');
  });
});

describe("downloadPng", () => {
  it("does nothing without a canvas", () => {
    const clicked = spyOnDownloadLink();
    downloadPng(null, "wifi.png");
    expect(clicked).toEqual([]);
  });

  it("downloads the canvas contents as a PNG data URL", () => {
    const clicked = spyOnDownloadLink();
    const canvas = document.createElement("canvas");
    const toDataURL = vi.spyOn(canvas, "toDataURL").mockReturnValue("data:image/png;base64,AAAA");

    downloadPng(canvas, "wifi.png");

    expect(toDataURL).toHaveBeenCalledWith("image/png");
    expect(clicked).toEqual([
      { href: "data:image/png;base64,AAAA", download: "wifi.png", attached: true },
    ]);
    expect(document.querySelector("a")).toBeNull();
  });
});
