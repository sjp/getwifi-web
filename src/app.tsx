import { Route, Router } from "wouter";
import { PrivateWifi } from "./private-wifi";
import { Root } from "./root";
import { Wifi } from "./wifi";

export const App = () => {
  return (
    <>
      <Router>
        <Route path="/" component={Root} />
        <Route path="/wifi" component={Wifi} />
        <Route path="/w" component={Wifi} />
        <Route path="/private-wifi" component={PrivateWifi} />
        <Route path="/pw" component={PrivateWifi} />
      </Router>
    </>
  );
};
