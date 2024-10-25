import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./app";
import "@theme-toggles/react/css/Classic.css";

export const Main = () => {
  return <App />;
};

if (typeof window !== "undefined") {
  hydrate(<Main />, document.getElementById("app") as HTMLElement);
}

export const prerender = async (data: unknown) => {
  return await ssr(<Main />);
};
