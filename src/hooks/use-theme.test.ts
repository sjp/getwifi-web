import { act, renderHook } from "@testing-library/preact";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mockMatchMedia } from "../test/match-media";
import { useMediaQuery, useTheme } from "./use-theme";

describe("useMediaQuery", () => {
  it("reports the current match and follows changes", async () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(min-width: 1px)"));
    expect(result.current).toBe(false);

    await act(() => {
      media.set(true);
    });
    expect(result.current).toBe(true);
  });

  it("uses the default value until mounted when not initialising with the value", () => {
    mockMatchMedia(true);
    const values: boolean[] = [];
    renderHook(() => {
      const value = useMediaQuery("(min-width: 1px)", {
        defaultValue: false,
        initializeWithValue: false,
      });
      values.push(value);
      return value;
    });
    expect(values[0]).toBe(false);
    expect(values.at(-1)).toBe(true);
  });

  it("unsubscribes on unmount", () => {
    const media = mockMatchMedia(false);
    const { unmount } = renderHook(() => useMediaQuery("(min-width: 1px)"));
    expect(media.listeners.size).toBe(1);
    unmount();
    expect(media.listeners.size).toBe(0);
  });
});

describe("useTheme", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    delete document.documentElement.dataset.theme;
  });

  it("follows the system preference when nothing is stored", async () => {
    const media = mockMatchMedia(true);
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(result.current.systemTheme).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");

    await act(() => {
      media.set(false);
    });
    expect(result.current.theme).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("prefers a stored theme over the system preference", () => {
    mockMatchMedia(false);
    window.localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("dark");
    expect(result.current.systemTheme).toBe("light");
  });

  it("ignores invalid stored values", () => {
    mockMatchMedia(false);
    window.localStorage.setItem("theme", "purple");
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");
  });

  it("persists a theme that differs from the system preference", async () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());

    await act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("clears the stored theme when choosing the system preference", async () => {
    mockMatchMedia(false);
    window.localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());

    await act(() => {
      result.current.setTheme("light");
    });

    expect(result.current.theme).toBe("light");
    expect(window.localStorage.getItem("theme")).toBeNull();
  });

  it("still works when storage is unavailable", async () => {
    mockMatchMedia(false);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("denied");
    });
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("light");

    await act(() => {
      result.current.setTheme("dark");
    });
    expect(result.current.theme).toBe("dark");
  });
});
