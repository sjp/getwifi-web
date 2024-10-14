import { useCallback, useSyncExternalStore } from "preact/compat";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}
