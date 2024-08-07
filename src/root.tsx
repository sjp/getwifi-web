import { useForm } from "react-hook-form";
import type { WifiDetails } from "./models";
import "./root.css";
import { WifiQrCode } from "./wifi-qr";

export const Root = () => {
  const { register, handleSubmit, formState, watch } = useForm<WifiDetails>();
  // eslint-disable-next-line no-console
  const onSubmit = (data: any) => console.log(data);

  const [ssid, password, authType, hidden] = watch(["ssid", "password", "authType", "hidden"]);

  const wifi: WifiDetails = {
    ssid: ssid,
    password: password,
    authType: authType,
    hidden: hidden,
  };

  return (
    <>
      {formState.isValid && <WifiQrCode wifi={wifi} />}
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            SSID / Network ID
            <input
              {...register("ssid", { required: true, minLength: 1, maxLength: 1000 })}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              {...register("password", { required: false, minLength: 1, maxLength: 1000 })}
              type="password"
            />
          </label>
        </div>
        <div>
          <label>
            Encryption (usually <code>WPA</code> if available)
            <select {...register("authType")}>
              <option value="none">None</option>
              <option value="wep">WEP</option>
              <option value="wpa">WPA/WPA2/WPA3</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Hidden
            <input {...register("hidden")} type="checkbox" />
          </label>
        </div>
      </form>
    </>
  );
};
