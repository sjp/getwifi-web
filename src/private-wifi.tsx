import "./private-wifi.css";
import { fromPrivateShare } from "./serialization";
import { WifiQrCode } from "./wifi-qr";

const NotFound = () => {
  return <pre>No code provided&hellip;</pre>;
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

  return <WifiQrCode wifi={wifi} />;
};
