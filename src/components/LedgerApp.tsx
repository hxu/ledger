import * as React from "react";

export interface LedgerProps {foo: string}

export class LedgerApp extends React.Component<LedgerProps, undefined> {
    constructor(props: LedgerProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}