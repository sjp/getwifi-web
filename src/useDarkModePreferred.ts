import { useMediaQuery } from "./useMediaQuery";

export const useDarkModePreferred = () =>
  useMediaQuery("(prefers-color-scheme: dark)");
