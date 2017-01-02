import * as React from "react";
import {AccountList} from "./AccountList";
import {AddAccountWidget} from "./AddAccountWidget";

export class LedgerApp extends React.Component<undefined, undefined> {

    constructor(props: undefined) {
        super(props);
    }

    render() {
        return (
            <div id="app-container">
                <div id="account-sidebar">
                    <h4>Accounts</h4>
                    <AccountList />
                    <h4>Add an account</h4>
                    <AddAccountWidget />
                </div>
                <div id="account-detail"><h3>Account body</h3></div>
            </div>
        )
    }
}