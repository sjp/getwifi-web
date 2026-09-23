import { cleanup } from "@testing-library/preact";
import { afterEach, beforeEach, vi } from "vitest";

// Tests run on fake timers so that nothing waits on the wall clock; use
// `vi.advanceTimersByTime` or `vi.waitFor` (which advances them) to move time.
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  // Testing Library only unmounts automatically when Vitest globals are enabled.
  cleanup();
  vi.useRealTimers();
});
