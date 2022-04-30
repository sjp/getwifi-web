import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import { Home } from "../routes/home/Home";
import { NotFound } from "../routes/notfound/NotFound";
import { Profile } from "../routes/profile/Profile";
import { Header } from "./header/Header";

export const App: FunctionalComponent = () => {
    return (
        <div id="preact_root">
            <Header />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFound default />
            </Router>
        </div>
    );
};
