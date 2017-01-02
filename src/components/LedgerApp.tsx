import * as React from "react";
import {AccountList} from "./AccountList";

export class LedgerApp extends React.Component<undefined, undefined> {

    constructor(props: undefined) {
        super(props);
    }

    render() {
        return (
            <div id="app-container">
                <AccountList />
                <div id="account-detail"><h3>Account body</h3></div>
            </div>
        )
    }
}