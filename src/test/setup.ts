import { cleanup } from "@testing-library/preact";
import { afterEach } from "vitest";

// Testing Library only unmounts automatically when Vitest globals are enabled.
afterEach(() => {
  cleanup();
});
