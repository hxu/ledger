import * as React from "react";
import {AccountList} from "./AccountList";

export class LedgerApp extends React.Component<undefined, undefined> {

    constructor(props: undefined) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
                <AccountList />
            </div>
        )
    }
}