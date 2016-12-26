import * as React from "react";
import {LedgerStore} from "../api/LedgerStore";

export class LedgerApp extends React.Component<undefined, undefined> {
    store: LedgerStore;

    constructor(props: undefined) {
        super(props);
        this.store = new LedgerStore();
        console.log(this.store);
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}