import { QRCodeSVG } from "qrcode.react";
import "./private-wifi.css";
import { fromPrivateShare } from "./serialization";
import { WifiDetails } from "./models";
import { generateQrCode } from "./qr";

export interface DisplayWifiDetailsProps {
  wifi: WifiDetails;
}

export const DisplayWifiDetails = ({ wifi }: Readonly<DisplayWifiDetailsProps>) => {
  const qrCode = generateQrCode(wifi);

  return (
    <>
      <QRCodeSVG code={qrCode} />
      <pre>
        ssid: {wifi.ssid}
        password: {wifi.password}
        authType: {wifi.authType || "none"}
        hidden: {(wifi.hidden || false).toString()}
      </pre>
    </>
  );
};

const NotFound = () => {
  return <pre>No code provided...</pre>;
};

interface InvalidCodeProps {
  code: string;
}

const InvalidCode = ({ code }: Readonly<InvalidCodeProps>) => {
  return <pre>Invalid code provided: {code}</pre>;
};

export interface PrivateWifiRouteParams {
  code: string;
}

export interface PrivateWifiProps {
  params: Readonly<PrivateWifiRouteParams>;
}

export const PrivateWifi = ({ params }: Readonly<PrivateWifiProps>) => {
  if (!params.code) {
    return <NotFound />;
  }

  const wifi = fromPrivateShare(params.code);
  if (!wifi) {
    return <InvalidCode code={params.code} />;
  }

  return <DisplayWifiDetails wifi={wifi} />;
};
