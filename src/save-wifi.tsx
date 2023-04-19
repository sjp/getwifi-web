import "./wifi.css";
import { ApiResponse, ProblemDetails, saveWifi, SaveWifiRequest, SaveWifiResponse } from "./api";
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

const OfflineBanner = () => {
  return (
    <>
      <pre>You are offline, retry when you have an internet connection.</pre>
    </>
  );
};

interface ErrorProps {
  error?: ProblemDetails;
}

const Error = ({ error }: Readonly<ErrorProps>) => {
  const isOnline = useOnlineStatus();
  if (!isOnline) {
    return <OfflineBanner />;
  }

  return (
    <>
      <div>error status {error?.status}</div>
      <div>Oopsie woopsie, something went wrong</div>
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

  if (isError || (isSuccess && data.error)) {
    return <Error error={data?.error} />;
  }

  if (isSuccess && data.status == 404) {
    return <NotFound shortCode={params.shortCode} />;
  }

  return <></>;
};
