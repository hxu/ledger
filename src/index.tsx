import * as React from "react";
import * as ReactDOM from "react-dom";
import {LedgerApp} from "./components/LedgerApp";
import {ILedgerStore, selectAccountHandler, LedgerStore} from "./api/LedgerStore";
import {Store, createStore} from "redux";
import {Provider} from "react-redux";


ReactDOM.render(
    <Provider store={LedgerStore}>
        <LedgerApp />
    </Provider>,
    document.getElementById("app")
);
