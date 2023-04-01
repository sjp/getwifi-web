import { padBase64Suffix, base64toUrlSafe, base64EncodeBuffer, toBuffer } from "./base64";
import { WifiDetails } from "./models";
import { xorWithKey } from "./obfuscate";

// avoids additional properties being serialized
// either from outside the interface or to simplify serialization
const toCompactWifiClone = (wifi: WifiDetails): WifiDetails => {
  const result: WifiDetails = { ssid: wifi.ssid };

  // the following are optional so only conditionally serialize
  if (wifi.password) {
    result.password = wifi.password;
  }
  if (wifi.authType && wifi.authType !== "none") {
    result.authType = wifi.authType;
  }
  if (wifi.hidden) {
    result.hidden = true;
  }

  return result;
};

const toObfuscatedBase64 = (input: string): string => {
  const utf8Bytes = new TextEncoder().encode(input);
  const obfuscated = xorWithKey(utf8Bytes);
  return base64EncodeBuffer(obfuscated);
};

const toPrivateShareUrl = (input: string): string => {
  const base64 = toObfuscatedBase64(input);
  return base64toUrlSafe(base64);
};

const deserializePrivateShareUrl = (input: string): string => {
  const paddedInput = padBase64Suffix(input);
  const obfuscated = toBuffer(paddedInput);
  const deobfuscated = xorWithKey(obfuscated);
  return new TextDecoder().decode(deobfuscated);
};

export const toPrivateShare = (wifi: WifiDetails): string => {
  const clone = toCompactWifiClone(wifi);
  const json = JSON.stringify(clone);
  return toPrivateShareUrl(json);
};

export const fromPrivateShare = (input: string): WifiDetails | null => {
  try {
    const json = deserializePrivateShareUrl(input);
    const obj = JSON.parse(json) as WifiDetails;
    if (!obj || !obj.ssid) {
      return null;
    }

    const result = toCompactWifiClone(obj);
    return result;
  } catch {
    // deliberately not interested in the result
    return null;
  }
};
