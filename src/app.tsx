import { Route, Router } from "wouter";
import { PrivateWifi } from "./private-wifi";
import { Root } from "./root";
import { Wifi } from "./wifi";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api";
import { NotFound } from "./not-found";

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Route path="/" component={Root} />
          <Route path="/wifi/:shortCode" component={Wifi} />
          <Route path="/w/:shortCode" component={Wifi} />
          <Route path="/private-wifi/:code" component={PrivateWifi} />
          <Route path="/pw/:code" component={PrivateWifi} />
          <Route path="/not-found" component={NotFound} />
        </Router>
      </QueryClientProvider>
    </>
  );
};
