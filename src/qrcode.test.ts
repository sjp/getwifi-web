import { describe, expect, it } from "vite-plus/test";
import { generateQrCode } from "./qrcode";
import { qrFileName } from "./download-content";

describe("generateQrCode", () => {
  it("generates a WPA network", () => {
    expect(generateQrCode({ ssid: "My Cafe", password: "p@ss word", authType: "wpa" })).toBe(
      "WIFI:S:My Cafe;P:p@ss word;T:WPA;",
    );
  });

  it("escapes reserved characters", () => {
    expect(generateQrCode({ ssid: 'a\\b"c;d,e:f', password: "x;y", authType: "wep" })).toBe(
      'WIFI:S:a\\\\b\\"c\\;d\\,e\\:f;P:x\\;y;T:WEP;',
    );
  });

  it("omits the password for open networks", () => {
    expect(generateQrCode({ ssid: "Open", password: "typed", authType: "none" })).toBe(
      "WIFI:S:Open;T:nopass;",
    );
  });

  it("omits the password field when it is empty", () => {
    expect(generateQrCode({ ssid: "Net", password: "", authType: "wpa" })).toBe(
      "WIFI:S:Net;T:WPA;",
    );
  });

  it("marks hidden networks", () => {
    expect(generateQrCode({ ssid: "Hid", password: "pw", authType: "wpa", hidden: true })).toBe(
      "WIFI:S:Hid;P:pw;T:WPA;H:true;",
    );
  });

  it("quotes values that look like hex", () => {
    expect(generateQrCode({ ssid: "ABCDEF", password: "0123456789abcdef", authType: "wpa" })).toBe(
      'WIFI:S:"ABCDEF";P:"0123456789abcdef";T:WPA;',
    );
  });

  it("does not quote values that are not purely hex", () => {
    expect(generateQrCode({ ssid: "ABCDEG", authType: "wpa" })).toBe("WIFI:S:ABCDEG;T:WPA;");
  });
});

describe("qrFileName", () => {
  it("includes a sanitised SSID", () => {
    expect(qrFileName('My: "Cafe"/Guest', "svg")).toBe("wifi-My CafeGuest-qrcode.svg");
  });

  it("falls back to a generic name for an empty SSID", () => {
    expect(qrFileName("", "png")).toBe("wifi-qrcode.png");
  });
});
