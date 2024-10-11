import "./root.css";

export const Root = () => {
  return (
    <form>
      <div>
        <label>
          SSID / Network ID
          <input type="text" />
        </label>
      </div>
      <div>
        <label>
          Password
          <input type="password" />
        </label>
      </div>
      <div>
        <label>
          Encryption (usually <code>WPA</code> if available)
          <select>
            <option value="none">None</option>
            <option value="wep">WEP</option>
            <option value="wpa">WPA/WPA2/WPA3</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Hidden
          <input type="checkbox" />
        </label>
      </div>
    </form>
  );
};
