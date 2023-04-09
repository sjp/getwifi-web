import "./wifi.css";
import {
  ApiResponse,
  ProblemDetails,
  saveWifi,
  SaveWifiRequest,
  SaveWifiResponse,
  useGetWifi,
} from "./api";
import { useOnlineStatus } from "./hooks";
import { WifiQrCode } from "./wifi-qr";
import { Loader } from "./loader";
import { useMutation } from "@tanstack/react-query";

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
  error?: ProblemDetails;
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

export interface SaveWifiRouteParams {
  shortCode: string;
}

export interface SaveWifiProps {
  params: Readonly<SaveWifiRouteParams>;
}

export const SaveWifi = ({ params }: Readonly<SaveWifiProps>) => {
  const { isLoading, isSuccess, data, isError } = useMutation<
    ApiResponse<SaveWifiResponse, ProblemDetails>,
    unknown,
    SaveWifiRequest
  >({ mutationFn: saveWifi });

  if (isLoading) {
    return <Loader color="yellow" />;
  }

  if (isError || data.error) {
    return <Error error={data?.error} refetch={refetch} />;
  }

  if (isSuccess && data.status == 404) {
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
