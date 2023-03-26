import { Route, Router } from "wouter";
import { Root } from "./root";

export const App = () => {
  return (
    <>
      <Router>
        <Route path="/" component={Root} />
      </Router>
    </>
  );
};
