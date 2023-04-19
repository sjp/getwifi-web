import "./wifi.css";
import { ProblemDetails, useGetWifi } from "./api";
import { useOnlineStatus } from "./hooks";
import { WifiQrCode } from "./wifi-qr";
import { Loader } from "./loader";

interface NotFoundProps {
  shortCode: string;
}

const NotFound = ({ shortCode }: Readonly<NotFoundProps>) => {
  return <div>Couldn&apos;t find a wifi record named {shortCode}</div>;
};

interface OfflineBannerProps {
  refetch: () => Promise<unknown>;
}

const OfflineBanner = ({ refetch }: Readonly<OfflineBannerProps>) => {
  return (
    <>
      <pre>You are offline, retry when you have an internet connection.</pre>
      <button onSubmit={() => refetch()}>Retry</button>
    </>
  );
};

interface ErrorProps {
  error: ProblemDetails | null;
  refetch: () => Promise<unknown>;
}

const Error = ({ error, refetch }: Readonly<ErrorProps>) => {
  const isOnline = useOnlineStatus();
  if (!isOnline) {
    return <OfflineBanner refetch={refetch} />;
  }

  return (
    <>
      <div>error status {error?.status}</div>
      <div>Oopsie woopsie, something went wrong</div>
      <button onSubmit={() => refetch()}>Retry</button>
    </>
  );
};

export interface WifiRouteParams {
  shortCode: string;
}

export interface WifiProps {
  params: Readonly<WifiRouteParams>;
}

export const Wifi = ({ params }: Readonly<WifiProps>) => {
  const { isLoading, isSuccess, data, isError, refetch } = useGetWifi(params.shortCode);

  if (isLoading) {
    return <Loader color="yellow" />;
  }

  if (isError || (isSuccess && data.error)) {
    return <Error error={data?.error || null} refetch={refetch} />;
  }

  if (isSuccess && !data?.data) {
    return <NotFound shortCode={params.shortCode} />;
  }

  const response = data.data;
  const wifiData = {
    ssid: response!.ssid,
    password: response!.password,
    authType: response!.authType,
    hidden: response!.hidden,
  };

  return <WifiQrCode wifi={wifiData} />;
};
