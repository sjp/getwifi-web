import { useEffect, useState } from "preact/hooks";

const getOnlineStatus = () => {
  return !!navigator && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
};

export const useOnlineStatus = (): boolean => {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

  const goOnline = () => setOnlineStatus(true);
  const goOffline = () => setOnlineStatus(false);

  useEffect(() => {
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return onlineStatus;
};
