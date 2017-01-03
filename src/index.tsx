import * as React from "react";
import * as ReactDOM from "react-dom";
import {LedgerApp} from "./components/LedgerApp";
import {LedgerStore} from "./api/LedgerStore";
import {Provider} from "react-redux";


ReactDOM.render(
    <Provider store={LedgerStore}>
        <LedgerApp />
    </Provider>,
    document.getElementById("app")
);
