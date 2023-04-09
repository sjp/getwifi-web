import "./wifi.css";
import {
  ApiResponse,
  deleteWifi,
  DeleteWifiRequest,
  DeleteWifiResponse,
  ProblemDetails,
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

const OfflineBanner = () => {
  return (
    <>
      <pre>You are offline, retry when you have an internet connection.</pre>
      <button onSubmit={() => window.location.reload()}>Refresh</button>
    </>
  );
};

interface ErrorProps {
  error: ProblemDetails | null;
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
      <button onSubmit={() => window.location.reload()}>Refresh</button>
    </>
  );
};

export interface DeleteWifiRouteParams {
  shortCode: string;
  deletionCode: string;
}

export interface DeleteWifiProps {
  params: Readonly<DeleteWifiRouteParams>;
}

export const DeleteWifi = ({ params }: Readonly<DeleteWifiProps>) => {
  const { isLoading, isSuccess, data, isError } = useMutation<
    ApiResponse<DeleteWifiResponse, ProblemDetails>,
    unknown,
    DeleteWifiRequest
  >({ mutationFn: deleteWifi });

  if (isLoading) {
    return <Loader color="yellow" />;
  }

  if (isError) {
    return <Error error={null} />;
  }

  if (isSuccess && data.status) {
    return <NotFound shortCode={params.shortCode} />;
  }

  return <WifiQrCode wifi={{ ssid: "test" }} />;
};
