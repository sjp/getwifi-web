import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./app";
import "./theme-toggle.css";

export const Main = () => {
  return <App />;
};

if (typeof window !== "undefined") {
  hydrate(<Main />, document.getElementById("app") as HTMLElement);
}

export const prerender = async () => {
  return await ssr(<Main />);
};
