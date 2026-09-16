import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./app";
import "./theme-toggle.css";

export const Main = () => {
  return <App />;
};

if (typeof window !== "undefined") {
  const appRoot = document.querySelector("#app");
  if (appRoot) {
    hydrate(<Main />, appRoot);
  }
}

export const prerender = () => {
  return ssr(<Main />);
};
