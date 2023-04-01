const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const lookup: string[] = [];
const revLookup: number[] = [];

for (let i = 0, len = baseChars.length; i < len; ++i) {
  lookup[i] = baseChars[i];
  revLookup[baseChars.charCodeAt(i)] = i;
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;

export const toBuffer = (base64: string): Uint8Array => {
  if (!validBase64Chars(base64)) {
    throw new Error();
  }

  return toUint8Array(base64);
};

/** Encode to base64, source from Uint8Array */
export const base64EncodeBuffer = (input: Uint8Array): string => {
  const len = input.length;
  const extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  const len2 = len - extraBytes;
  const maxChunkLength = 12000; // must be multiple of 3
  const parts: string[] = new Array(Math.ceil(len2 / maxChunkLength) + (extraBytes ? 1 : 0));
  let curChunk = 0;

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (let i = 0, nextI = 0; i < len2; i = nextI) {
    nextI = i + maxChunkLength;
    parts[curChunk] = encodeChunk(input, i, Math.min(nextI, len2));
    curChunk += 1;
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    const tmp = input[len2] & 0xff;
    parts[curChunk] = lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + "==";
  } else if (extraBytes === 2) {
    const tmp = ((input[len2] & 0xff) << 8) | (input[len2 + 1] & 0xff);
    parts[curChunk] =
      lookup[tmp >> 10] + lookup[(tmp >> 4) & 0x3f] + lookup[(tmp << 2) & 0x3f] + "=";
  }

  return parts.join("");
};

const encodeChunk = (input: Uint8Array, start: number, end: number): string => {
  if (start >= end) {
    throw new Error();
  }

  const arrLen = Math.ceil((end - start) / 3);
  const ret: string[] = new Array(arrLen);

  for (let i = start, curTriplet = 0; i < end; i += 3, curTriplet += 1) {
    ret[curTriplet] = tripletToBase64(
      ((input[i] & 0xff) << 16) | ((input[i + 1] & 0xff) << 8) | (input[i + 2] & 0xff),
    );
  }

  return ret.join("");
};

const tripletToBase64 = (pos: number): string => {
  return (
    lookup[(pos >> 18) & 0x3f] +
    lookup[(pos >> 12) & 0x3f] +
    lookup[(pos >> 6) & 0x3f] +
    lookup[pos & 0x3f]
  );
};

/** Whether string contains valid base64 characters */
const validBase64Chars = (input: string): boolean => {
  return /^[a-zA-Z0-9+/_-]+={0,2}$/.test(input);
};

/** Whether string contains valid URL-safe base64 characters */
const validBase64URLChars = (input: string): boolean => {
  return /^[a-zA-Z0-9_-]+$/.test(input);
};

/** Validate input is valid base64 string or throw error */
const validateBase64 = (input: string): void => {
  const isValid = isValidBase64String(input);
  if (!isValid) {
    throw new Error();
  }
};

/**
 * Convert base64 string to URL-safe base64 string.
 * Replace "+" to "-" and "/" to "_", and Remove "="
 *
 * @see https://en.wikipedia.org/wiki/Base64#URL_applications
 */
export const base64toUrlSafe = (base64: string): string => {
  validateBase64(base64);
  const pos = base64.indexOf("=");
  return pos > 0
    ? base64.slice(0, pos).replace(/\+/g, "-").replace(/\//g, "_")
    : base64.replace(/\+/g, "-").replace(/\//g, "_");
};

export const padBase64Suffix = (input: string): string => {
  let num = 0;
  const mo = input.length % 4;
  switch (mo) {
    case 3:
      num = 1;
      break;
    case 2:
      num = 2;
      break;
    case 0:
      num = 0;
      break;
    default:
      throw new Error();
  }

  return input + "=".repeat(num);
};

const toUint8Array = (base64: string): Uint8Array => {
  const lengths = getLengths(base64);
  const validLength = lengths[0];
  const placeHoldersLength = lengths[1];
  const arr = new Uint8Array(byteLength(validLength, placeHoldersLength));
  let curByte = 0;

  // if there are placeholders, only get up to the last complete 4 chars
  const len = placeHoldersLength ? validLength - 4 : validLength;

  let i = 0;

  for (; i < len; i += 4) {
    const tmp =
      (revLookup[base64.charCodeAt(i)] << 18) |
      (revLookup[base64.charCodeAt(i + 1)] << 12) |
      (revLookup[base64.charCodeAt(i + 2)] << 6) |
      revLookup[base64.charCodeAt(i + 3)];
    arr[curByte++] = (tmp >> 16) & 0xff;
    arr[curByte++] = (tmp >> 8) & 0xff;
    arr[curByte++] = tmp & 0xff;
  }

  if (placeHoldersLength === 2) {
    arr[curByte] =
      (revLookup[base64.charCodeAt(i)] << 2) | (revLookup[base64.charCodeAt(i + 1)] >> 4);
  } else if (placeHoldersLength === 1) {
    const tmp =
      (revLookup[base64.charCodeAt(i)] << 10) |
      (revLookup[base64.charCodeAt(i + 1)] << 4) |
      (revLookup[base64.charCodeAt(i + 2)] >> 2);
    arr[curByte++] = (tmp >> 8) & 0xff;
    arr[curByte] = tmp & 0xff;
  }

  return arr;
};

const getLengths = (input: string): [number, number] => {
  const len = input.length;

  if (len & 3 || len <= 0) {
    throw new Error();
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  let validLength = input.indexOf("=");
  if (validLength === -1) {
    validLength = len;
  }

  // 0 to 3 characters of padding so total length is a multiple of 4
  const placeHoldersLength = 3 - ((validLength + 3) & 3);

  return [validLength, placeHoldersLength];
};

const byteLength = (validLength: number, placeHoldersLength: number): number => {
  return (((validLength + placeHoldersLength) * 3) >> 2) - placeHoldersLength;
};

/** Encode to base64, source from string | number | bigint */
export const base64Encode = (input: string): string => {
  const u8arr = new TextEncoder().encode(input);
  return base64EncodeBuffer(u8arr);
};

/** Decode base64 to string */
export const base64Decode = (base64: string): string => {
  const u8arr = toBuffer(base64);
  return new TextDecoder().decode(u8arr);
};

/**
 * Encode to URL-safe base64, source from string.
 * Replace "+" to "-" and "/" to "_", and Remove "=".
 *
 * Note: using base64toUrlSafe() for converting base64 string to URL-safe base64 string
 *
 * @see https://en.wikipedia.org/wiki/Base64#URL_applications
 */
export const base64UrlEncode = (input: string): string => {
  const base64 = base64Encode(input);
  return base64toUrlSafe(base64);
};

/**
 * Decode URL-safe base64 to original string.
 *
 * Note: using base64fromURLSafe() for converting URL-safe base64 string to base64 string
 *
 * @see https://en.wikipedia.org/wiki/Base64#URL_applications
 */
export const base64UrlDecode = (input: string): string => {
  const paddedInput = padBase64Suffix(input); // for URL-safe
  return base64Decode(paddedInput);
};

/** Return true for valid base64 input */
export const isValidBase64String = (input: string): boolean => {
  if (!validBase64Chars(input)) {
    return false;
  }

  if (input.length < 4) {
    return false;
  }

  if (input.length % 4 !== 0) {
    return false;
  }

  return true;
};

/** Return true for valid URL-safe base64 input */
export const isValidBase64UrlString = (input: string): boolean => {
  if (!validBase64URLChars(input)) {
    return false;
  }

  if (input.length < 2) {
    // URL-safe at least 2
    return false;
  }

  return true;
};
