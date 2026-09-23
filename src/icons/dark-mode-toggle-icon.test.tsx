import { fireEvent, render, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import { Classic } from "./dark-mode-toggle-icon";

describe("Classic theme toggle", () => {
  it("uses sensible defaults", () => {
    render(<Classic />);
    const button = screen.getByRole("button", { name: "Toggle theme" });
    expect(button.getAttribute("title")).toBe("Toggle theme");
    expect(button.className.split(" ").filter(Boolean)).toEqual(["theme-toggle"]);
    expect(button.style.getPropertyValue("--theme-toggle__classic--duration")).toBe("500ms");
  });

  it("reflects its options in its classes and style", () => {
    render(
      <Classic
        toggled
        forceMotion
        reversed
        duration={250}
        className="secondary"
        aria-label="Theme"
        title="Switch"
      />,
    );
    const button = screen.getByRole("button", { name: "Theme" });
    expect(button.getAttribute("title")).toBe("Switch");
    expect(button.className.split(" ").filter(Boolean)).toEqual([
      "theme-toggle",
      "theme-toggle--toggled",
      "theme-toggle--force-motion",
      "theme-toggle--reversed",
      "secondary",
    ]);
    expect(button.style.getPropertyValue("--theme-toggle__classic--duration")).toBe("250ms");
  });

  it("marks an explicitly untoggled state", () => {
    render(<Classic toggled={false} />);
    expect(screen.getByRole("button").classList.contains("theme-toggle--untoggled")).toBe(true);
  });

  it("reports the opposite state when clicked", () => {
    const onToggled = vi.fn<(toggled: boolean) => void>();
    const { rerender } = render(<Classic toggled={false} onToggled={onToggled} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggled).toHaveBeenLastCalledWith(true);

    rerender(<Classic toggled onToggled={onToggled} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onToggled).toHaveBeenLastCalledWith(false);
  });

  it("does not require a click handler", () => {
    render(<Classic />);
    expect(() => {
      fireEvent.click(screen.getByRole("button"));
    }).not.toThrow();
  });
});
