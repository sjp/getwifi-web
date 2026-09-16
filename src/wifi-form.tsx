import type { Signal } from "@preact/signals";
import { useI18nContext } from "./i18n/i18n-react";
import { isWifiAuthType, type WifiAuthType } from "./wifi";

export interface WifiFormProps {
  readonly ssid: Signal<string>;
  readonly password: Signal<string>;
  readonly authType: Signal<WifiAuthType>;
  readonly hidden: Signal<boolean>;
}

const EncryptionSelect = ({ authType }: { readonly authType: Signal<WifiAuthType> }) => {
  const { LL } = useI18nContext();

  return (
    <label>
      {LL.encryption()}
      <select
        name="encryption"
        onInput={(evt) => {
          const selected = evt.currentTarget.value;
          if (isWifiAuthType(selected)) {
            authType.value = selected;
          }
        }}
      >
        <option value="wpa">WPA / WPA2 / WPA3</option>
        <option value="none">None</option>
        <option value="wep">WEP</option>
      </select>
    </label>
  );
};

export const WifiForm = ({ ssid, password, authType, hidden }: WifiFormProps) => {
  const { LL } = useI18nContext();
  const noPassword = authType.value === "none";

  return (
    <form autocomplete="off">
      <fieldset>
        <label>
          {LL.ssid()}
          <input
            name="ssid"
            autofocus={true}
            type="text"
            onInput={(evt) => {
              ssid.value = evt.currentTarget.value;
            }}
          />
        </label>
        <label>
          {LL.password()}
          <input
            name="password"
            type="password"
            disabled={noPassword}
            onInput={(evt) => {
              password.value = evt.currentTarget.value;
            }}
          />
        </label>
        <EncryptionSelect authType={authType} />
        <label>
          <input
            name="hidden"
            type="checkbox"
            onChange={() => {
              hidden.value = !hidden.value;
            }}
          />
          {LL.hidden()}
        </label>
      </fieldset>
    </form>
  );
};
