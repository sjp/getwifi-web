import { render } from "@testing-library/preact";
import { createRef } from "preact";
import { describe, expect, it } from "vitest";
import { WifiQrCodeSvg } from "./wifi-qr-svg";

describe("WifiQrCodeSvg", () => {
  it("renders a placeholder when there is no SSID", () => {
    const ref = createRef<SVGSVGElement>();
    render(<WifiQrCodeSvg wifi={{ ssid: "" }} svgRef={ref} />);
    expect(ref.current?.getAttribute("viewBox")).toBe("0 0 33 33");
  });

  it("renders a QR code for the network", () => {
    const ref = createRef<SVGSVGElement>();
    render(<WifiQrCodeSvg wifi={{ ssid: "Cafe", password: "pw", authType: "wpa" }} svgRef={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe("svg");
    expect(ref.current?.getAttribute("viewBox")).not.toBe("0 0 33 33");
  });

  it("renders a different QR code for different details", () => {
    const first = createRef<SVGSVGElement>();
    const second = createRef<SVGSVGElement>();
    render(<WifiQrCodeSvg wifi={{ ssid: "Cafe", authType: "wpa" }} svgRef={first} />);
    render(<WifiQrCodeSvg wifi={{ ssid: "Library", authType: "wpa" }} svgRef={second} />);
    expect(first.current?.innerHTML).not.toBe(second.current?.innerHTML);
  });
});
