import * as React from "react";
import * as ReactDOM from "react-dom";
import {LedgerApp} from "./components/LedgerApp";

ReactDOM.render(
    <LedgerApp foo="bar" />,
    document.getElementById("app")
);
