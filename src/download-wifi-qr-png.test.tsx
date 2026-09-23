import { render } from "@testing-library/preact";
import { expect, it, vi } from "vitest";
import { DownloadWifiQrCodePng } from "./download-wifi-qr-png";

it("downloads the QR code as a PNG once rendered", () => {
  const toDataURL = vi
    .spyOn(HTMLCanvasElement.prototype, "toDataURL")
    .mockReturnValue("data:image/png;base64,AAAA");
  const downloads: { href: string; download: string }[] = [];
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    downloads.push({ href: this.href, download: this.download });
  });
  const onDownloaded = vi.fn<() => void>();

  const { container } = render(
    <DownloadWifiQrCodePng wifi={{ ssid: "Cafe", authType: "wpa" }} onDownloaded={onDownloaded} />,
  );

  expect(container.querySelector("canvas")).not.toBeNull();
  expect(toDataURL).toHaveBeenCalledWith("image/png");
  expect(downloads).toEqual([
    { href: "data:image/png;base64,AAAA", download: "wifi-Cafe-qrcode.png" },
  ]);
  expect(onDownloaded).toHaveBeenCalledOnce();
});
