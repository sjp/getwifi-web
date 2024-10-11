import { useComputed, useSignal } from "@preact/signals";
import "./root.css";
import { WifiQrCode } from "./wifi-qr";
import type { WifiAuthType, WifiDetails } from "./models";

export const Root = () => {
  const ssid = useSignal("");
  const password = useSignal("");
  const authType = useSignal<WifiAuthType>("wpa");
  const hidden = useSignal(false);
  const qrparams = useComputed<WifiDetails>(() => ({
    ssid: ssid.value,
    password: password.value,
    authType: authType.value,
    hidden: hidden.value,
  }));

  return (
    <>
      <header>
        <h1>Get WiFi in seconds!</h1>
      </header>
      <main class="container">
        <div class="grid">
          <WifiQrCode wifi={qrparams.value} />
          <form>
            <fieldset>
              <label>
                SSID / Network ID
                <input
                  type="text"
                  value={ssid}
                  onInput={(evt) => {
                    ssid.value = evt.currentTarget.value;
                  }}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onInput={(evt) => {
                    password.value = evt.currentTarget.value;
                  }}
                />
              </label>
              <label>
                Encryption (usually <code>WPA</code> if available)
                <select
                  value={authType}
                  onInput={(evt) => {
                    authType.value = evt.currentTarget.value as WifiAuthType;
                  }}
                >
                  <option value="wpa">WPA/WPA2/WPA3</option>
                  <option value="none">None</option>
                  <option value="wep">WEP</option>
                </select>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={hidden}
                  onChange={() => {
                    hidden.value = !hidden.value;
                  }}
                />
                Hidden
              </label>
            </fieldset>
          </form>
        </div>
      </main>
      <footer>Made by me &copy; {new Date().getFullYear()}</footer>
    </>
  );
};
