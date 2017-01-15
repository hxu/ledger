import * as React from "react";
import {AccountList} from "./AccountList";
import {AddAccountWidget} from "./AddAccountWidget";
import {AccountDetail} from "./AccountDetail";

export class LedgerApp extends React.Component<undefined, undefined> {

    constructor(props: undefined) {
        super(props);
    }

    render() {
        return (
            <div id="app-container">
                <div>
                    <nav className="pt-navbar pt-fixed-top pt-dark">
                        <div className="pt-navbar-group pt-align-left">
                            <span className="pt-icon-large pt-icon-book" />
                            <div className="pt-navbar-heading" id="app-title">
                                Ledger
                            </div>
                        </div>

                        <div className="pt-navbar-group pt-align-right">
                            <span className="pt-icon pt-icon-cog" />
                        </div>
                    </nav>
                </div>
                <div id="account-sidebar">
                    <h4>Accounts</h4>
                    <AccountList />
                    <h4>Add an account</h4>
                    <AddAccountWidget />
                </div>
                <div id="account-detail">
                    <AccountDetail />
                </div>
            </div>
        )
    }
}