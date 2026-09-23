import { describe, expect, it } from "vitest";
import { isWifiAuthType } from "./wifi";

describe("isWifiAuthType", () => {
  it.each(["none", "wep", "wpa"])("accepts %s", (value) => {
    expect(isWifiAuthType(value)).toBe(true);
  });

  it.each(["", "WPA", "wpa2", "nopass"])("rejects %j", (value) => {
    expect(isWifiAuthType(value)).toBe(false);
  });
});
