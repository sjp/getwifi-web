import { useCallback, useEffect, useLayoutEffect, useState } from "preact/hooks";

export type Theme = "light" | "dark";

// Keep in sync with the inline pre-paint script in index.html.
const STORAGE_KEY = "theme";

const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark";

const readStoredTheme = (): Theme | null => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
};

const writeStoredTheme = (theme: Theme | null) => {
  try {
    if (theme === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  } catch {
    // Storage may be unavailable (private mode, disabled); persistence is best-effort.
  }
};

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return defaultValue;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  // Handles the change event of the media query.
  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

const useSystemDarkModePreference = (): Theme => {
  return useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
};

// The active theme is the user's explicitly chosen theme (persisted across
// reloads) when one exists, otherwise the system preference. Choosing the theme
// that matches the system preference clears the stored choice so the page goes
// back to following the OS setting.
export const useTheme = () => {
  const systemTheme = useSystemDarkModePreference();

  const [storedTheme, setStoredTheme] = useState<Theme | null>(() =>
    typeof window !== "undefined" ? readStoredTheme() : null,
  );

  const theme = storedTheme ?? systemTheme;

  const setTheme = useCallback(
    (next: Theme) => {
      const toStore = next === systemTheme ? null : next;
      setStoredTheme(toStore);
      writeStoredTheme(toStore);
    },
    [systemTheme],
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  return {
    theme,
    systemTheme,
    setTheme,
  };
};
