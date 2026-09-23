import { vi } from "vitest";

// A controllable stand-in for `window.matchMedia` that reports the same
// `matches` for every query and lets tests flip it, notifying listeners.
export const mockMatchMedia = (initial = false) => {
  let matches = initial;
  const listeners = new Set<() => void>();
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => {
    const list = {
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: (_type: string, listener: () => void) => {
        listeners.add(listener);
      },
      removeEventListener: (_type: string, listener: () => void) => {
        listeners.delete(listener);
      },
    };
    // Only the members the app uses are implemented.
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return list as unknown as MediaQueryList;
  });
  return {
    listeners,
    set: (next: boolean) => {
      matches = next;
      for (const listener of listeners) {
        listener();
      }
    },
  };
};
