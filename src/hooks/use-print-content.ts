import type { RefObject } from "preact";
import { useCallback } from "preact/hooks";
import { getElement } from "../get-element";

export interface UsePrintContentOptions {
  contentRef?: RefObject<SVGSVGElement | null>;
  documentTitle?: string;
}

const FRAME_ID = "printIframe";

const createPrintIframe = () => {
  const frame = document.createElement("iframe");
  frame.width = `${document.documentElement.clientWidth}px`;
  frame.height = `${document.documentElement.clientHeight}px`;
  frame.style.position = "absolute";
  frame.style.top = `-${document.documentElement.clientHeight + 100}px`;
  frame.style.left = `-${document.documentElement.clientWidth + 100}px`;
  frame.id = FRAME_ID;
  // Ensure we set a DOCTYPE on the iframe's document
  // https://github.com/MatthewHerbst/react-to-print/issues/459
  frame.srcdoc = "<!DOCTYPE html>";

  return frame;
};

const removePrintIframe = () => {
  const documentPrintWindow = document.getElementById(FRAME_ID);
  if (documentPrintWindow) {
    document.body.removeChild(documentPrintWindow);
  }
};

const appendPrintIframe = (
  printFrame: HTMLIFrameElement,
  contentNode: SVGSVGElement,
  documentTitle?: string
) => {
  printFrame.onload = () => {
    setTimeout(() => {
      if (printFrame.contentWindow) {
        printFrame.contentWindow.focus();

        const domDoc =
          printFrame.contentDocument || printFrame.contentWindow?.document;
        domDoc?.body.appendChild(contentNode);

        const tempContentDocumentTitle =
          printFrame.contentDocument?.title ?? "";
        const tempOwnerDocumentTitle = printFrame.ownerDocument.title;

        if (documentTitle) {
          // Print filename in Chrome
          printFrame.ownerDocument.title = documentTitle;

          // Print filename in Firefox, Safari
          if (printFrame.contentDocument) {
            printFrame.contentDocument.title = documentTitle;
          }
        }

        printFrame.contentWindow.print();

        // Restore the page's original title information
        if (documentTitle) {
          printFrame.ownerDocument.title = tempOwnerDocumentTitle;

          if (printFrame.contentDocument) {
            printFrame.contentDocument.title = tempContentDocumentTitle;
          }
        }

        removePrintIframe();
      }
    }, 500);
  };

  document.body.appendChild(printFrame);
};

export const usePrintContent = ({
  contentRef,
  documentTitle,
}: UsePrintContentOptions) => {
  return useCallback(() => {
    // Ensure we remove any pre-existing print windows before adding a new one
    removePrintIframe();

    const contentNode = getElement(contentRef?.current || null);
    if (!contentNode) {
      return;
    }

    // NOTE: `canvas` elements do not have their painted images copied
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
    const clonedContentNode = contentNode.cloneNode(true);

    const printFrame = createPrintIframe();

    appendPrintIframe(printFrame, clonedContentNode, documentTitle);
  }, [contentRef, documentTitle]);
};
