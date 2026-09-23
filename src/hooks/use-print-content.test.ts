import { renderHook } from "@testing-library/preact";
import { createRef } from "preact";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePrintContent } from "./use-print-content";

const PRINT_DELAY_MS = 500;

const getFrame = () => document.querySelector<HTMLIFrameElement>("#printIframe");

// Stubs `print` on the frame's window (happy-dom does not implement it),
// recording the page title and the printed content at the moment printing was
// requested.
const stubPrint = (frame: HTMLIFrameElement) => {
  const win = frame.contentWindow;
  if (!win) {
    throw new Error("expected an attached print iframe");
  }
  const titles: string[] = [];
  const printed: (Element | null)[] = [];
  const print = vi.fn(() => {
    titles.push(document.title);
    printed.push(win.document.querySelector("#qr"));
  });
  win.print = print;
  return { print, printed, titles };
};

const createSvgRef = () => {
  const ref = createRef<SVGSVGElement | null>();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = "qr";
  ref.current = svg;
  return ref;
};

describe("usePrintContent", () => {
  beforeEach(() => {
    document.title = "Original";
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("does nothing without content", () => {
    const { result } = renderHook(() => usePrintContent({}));
    result.current();
    expect(getFrame()).toBeNull();
  });

  it("prints a copy of the content in a hidden iframe and cleans up", () => {
    const contentRef = createSvgRef();
    const { result } = renderHook(() =>
      usePrintContent({ contentRef, documentTitle: "WiFi - Cafe" }),
    );

    result.current();

    const frame = getFrame();
    expect(frame).not.toBeNull();
    if (!frame) {
      throw new Error("expected an attached print iframe");
    }
    expect(frame.style.position).toBe("absolute");

    const { print, printed, titles } = stubPrint(frame);

    frame.dispatchEvent(new Event("load"));
    vi.advanceTimersByTime(PRINT_DELAY_MS);

    expect(print).toHaveBeenCalledOnce();
    // The page title is swapped while printing so it becomes the file name.
    expect(titles).toEqual(["WiFi - Cafe"]);
    expect(document.title).toBe("Original");
    // A clone is printed, leaving the original content untouched.
    expect(printed).toHaveLength(1);
    expect(printed[0]).not.toBeNull();
    expect(printed[0]).not.toBe(contentRef.current);
    expect(getFrame()).toBeNull();
  });

  it("keeps the page title when no document title is given", () => {
    const contentRef = createSvgRef();
    const { result } = renderHook(() => usePrintContent({ contentRef }));

    result.current();
    const frame = getFrame();
    if (!frame) {
      throw new Error("expected an attached print iframe");
    }
    const { titles } = stubPrint(frame);

    frame.dispatchEvent(new Event("load"));
    vi.advanceTimersByTime(PRINT_DELAY_MS);

    expect(titles).toEqual(["Original"]);
  });

  it("replaces a pending print iframe when printing again", () => {
    const contentRef = createSvgRef();
    const { result } = renderHook(() => usePrintContent({ contentRef }));

    result.current();
    const first = getFrame();
    result.current();

    expect(document.querySelectorAll("#printIframe")).toHaveLength(1);
    expect(getFrame()).not.toBe(first);
  });
});
