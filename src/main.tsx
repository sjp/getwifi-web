import { render } from "preact";
import { App } from "./app";
import "./index.css";
import "@theme-toggles/react/css/Classic.css";

render(<App />, document.getElementById("app") as HTMLElement);
