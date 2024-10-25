import { useLayoutEffect } from "preact/hooks";

export const useDocumentTitle = (title: string): void => {
  useLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
};
