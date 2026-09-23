import { signal } from "@preact/signals";
import { fireEvent, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { renderWithI18n } from "./test/render";
import type { WifiAuthType } from "./wifi";
import { WifiForm } from "./wifi-form";

const renderForm = () => {
  const signals = {
    ssid: signal(""),
    password: signal(""),
    authType: signal<WifiAuthType>("wpa"),
    hidden: signal(false),
  };
  renderWithI18n(<WifiForm {...signals} />);
  return signals;
};

describe("WifiForm", () => {
  it("renders translated labels", () => {
    renderForm();
    expect(screen.getByLabelText("SSID / Network ID")).toBeTruthy();
    expect(screen.getByLabelText("Password")).toBeTruthy();
    expect(screen.getByLabelText("Encryption")).toBeTruthy();
    expect(screen.getByLabelText("Hidden")).toBeTruthy();
  });

  it("updates the SSID and password as the user types", () => {
    const { ssid, password } = renderForm();
    fireEvent.input(screen.getByLabelText("SSID / Network ID"), { target: { value: "Cafe" } });
    fireEvent.input(screen.getByLabelText("Password"), { target: { value: "secret" } });
    expect(ssid.value).toBe("Cafe");
    expect(password.value).toBe("secret");
  });

  it("disables the password for open networks", () => {
    const { authType } = renderForm();
    const passwordInput = screen.getByLabelText<HTMLInputElement>("Password");
    expect(passwordInput.disabled).toBe(false);

    fireEvent.input(screen.getByLabelText("Encryption"), { target: { value: "none" } });
    expect(authType.value).toBe("none");
    expect(passwordInput.disabled).toBe(true);

    fireEvent.input(screen.getByLabelText("Encryption"), { target: { value: "wep" } });
    expect(authType.value).toBe("wep");
  });

  it("toggles the hidden flag", () => {
    const { hidden } = renderForm();
    const checkbox = screen.getByLabelText("Hidden");
    fireEvent.click(checkbox);
    expect(hidden.value).toBe(true);
    fireEvent.click(checkbox);
    expect(hidden.value).toBe(false);
  });
});
