import "./wifi.css";
import { ProblemDetails, useGetWifi, WifiAuthType } from "./api";
import { fromPrivateShare, toPrivateShare } from "./serialization";

interface NotFoundProps {
  shortCode: string;
}

const NotFound = ({ shortCode }: Readonly<NotFoundProps>) => {
  return <div>Couldn&apos;t find a wifi record named {shortCode}</div>;
};

const Loading = () => {
  return <div>&hellip;</div>;
};

interface ErrorProps {
  error: ProblemDetails | null;
  refetch: () => Promise<unknown>;
}

const Error = ({ error, refetch }: Readonly<ErrorProps>) => {
  // eslint-disable-next-line no-console
  console.log("logging error");
  // eslint-disable-next-line no-console
  console.log(error);
  // eslint-disable-next-line no-console
  console.dir(error);

  // note: if error is null, consider checking network connection
  // eslint-disable-next-line no-console
  console.log(navigator?.onLine);

  return (
    <>
      <div>error status {error?.status}</div>
      <div>Oopsie woopsie, something went wrong</div>
      <button onSubmit={() => refetch()}>Refresh</button>
    </>
  );
};

export interface WifiDetailsProps {
  ssid: string;
  password?: string;
  authType: WifiAuthType;
  hidden: boolean;
}

export const WifiDetails = ({ ssid, password, authType, hidden }: Readonly<WifiDetailsProps>) => {
  const test = "r4j⇢3$u💩z7⇢T*eg";
  const wifi = { ssid: test, password: "yolo", authType: "wpa" as WifiAuthType, hidden: true };
  return (
    <>
      <pre>input: {test}</pre>
      <pre>toPrivateShare: {toPrivateShare(wifi)}</pre>
      <pre>fromPrivateShare: {fromPrivateShare(toPrivateShare(wifi))?.ssid}</pre>
      <pre>
        b64Enc-round-trip-url:{" "}
        {fromPrivateShare(toPrivateShare(wifi))!.ssid === test ? "yep" : "nope"}
      </pre>
      <pre>
        ssid: {ssid}
        password: {password}
        authType: {authType}
        hidden: {hidden.toString()}
      </pre>
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
  let { isLoading, isSuccess, data, isError, error, refetch } = useGetWifi(params.shortCode);
  isLoading = false;
  isError = false;
  isSuccess = true;
  data = {
    ssid: "test",
    password: "pw",
    authType: "wpa",
    hidden: true,
  };
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} refetch={refetch} />;
  }

  if (isSuccess && (!data || !data?.ssid)) {
    return <NotFound shortCode={params.shortCode} />;
  }

  return (
    <WifiDetails
      ssid={data!.ssid}
      password={data!.password}
      authType={data!.authType}
      hidden={data!.hidden}
    />
  );
};
