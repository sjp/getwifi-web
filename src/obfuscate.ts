const a = new Uint8Array([
  0x47, 0x0b, 0xe2, 0xd5, 0xd8, 0xfd, 0xee, 0x90, 0x79, 0x7d, 0x42, 0x03, 0x02, 0x3d, 0xb7, 0x07,
]);
const b = new Uint8Array([
  0x68, 0xad, 0x83, 0x26, 0x52, 0x3f, 0x55, 0x83, 0xf4, 0x2d, 0x8b, 0xcf, 0x3c, 0xf5, 0xd4, 0xb8,
]);

// Create a "key" based on two other "keys"
// This is done in-memory so no trivial searching will find the correct key in use.
const key = a.map((n, i) => n ^ b[i]);

// A *very* basic obfuscation method that is intended to make it difficult to trivially read data that may be sensitive.
// This is not intended to be secure, as the "key" is always going to be available on the client.
// Any determined adversary will be able to reverse engineer the obfuscation scheme.
export const xorWithKey = (input: Uint8Array): Uint8Array => {
  const result: number[] = [];

  const l = key.length;
  for (let i = 0; i < input.length; i++) {
    const lookup = i % l;
    result[i] = input[i] ^ key[lookup];
  }

  return new Uint8Array(result);
};
