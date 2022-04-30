import { FunctionalComponent, h } from "preact";

import style from "./style.css";

export const Home: FunctionalComponent = () => {
    return (
        <div className={style.home}>
            <h1>Home</h1>
            <p>This is the Home component.</p>
        </div>
    );
};
