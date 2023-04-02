import "./wifi.css";
import { ProblemDetails, useGetWifi } from "./api";
import { useOnlineStatus } from "./hooks";
import { WifiQrCode } from "./wifi-qr";

interface NotFoundProps {
  shortCode: string;
}

const NotFound = ({ shortCode }: Readonly<NotFoundProps>) => {
  return <div>Couldn&apos;t find a wifi record named {shortCode}</div>;
};

const Loading = () => {
  return <div>&hellip;</div>;
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
      <button onSubmit={() => refetch()}>Refresh</button>
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
  const { isLoading, isSuccess, data, isError, error, refetch } = useGetWifi(params.shortCode);
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} refetch={refetch} />;
  }

  if (isSuccess && (!data || !data?.ssid)) {
    return <NotFound shortCode={params.shortCode} />;
  }

  const wifiData = {
    ssid: data!.ssid,
    password: data!.password,
    authType: data!.authType,
    hidden: data!.hidden,
  };

  return <WifiQrCode wifi={wifiData} />;
};
