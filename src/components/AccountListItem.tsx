import * as React from "react";
import {IAccount} from "../api/models";

interface AccountListeItemProps {
    account: IAccount;
    depth: number;
}

export default class AccountListItem extends React.Component<AccountListeItemProps, undefined> {
    constructor(props: AccountListeItemProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4>{this.props.account.name}</h4>
            </div>
        )
    }
}
