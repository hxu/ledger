import * as React from "react";
import * as _ from "lodash";
import {ISplitMap, ILedgerStore, IAccountMap} from "../api/ILedgerStore";
import {Dispatch, connect} from "react-redux";
import {IAccount} from "../api/models";
import {NonIdealState} from "@blueprintjs/core";
import {SplitList} from "./SplitList";

interface AccountDetailOwnProps {
}

interface AccountDetailStoreProps {
    selectedAccount: string;
    splits: ISplitMap;
    account: IAccount;
}

interface AccountDetailOwnState {
}

interface AccountDetailDispatch {
}

const mapStateToProps = (state: ILedgerStore): AccountDetailStoreProps => {
    return {
        selectedAccount: state.selectedAccount,
        splits: state.splits,
        account: state.accounts[state.selectedAccount]
    };
};

const mapDispatchToProps =  (dispatch: Dispatch<ILedgerStore>): AccountDetailDispatch => {
    return {
    }
};

type AccountDetailComponentProps = AccountDetailOwnProps & AccountDetailStoreProps & AccountDetailDispatch;

class AccountDetailComponent extends React.Component<AccountDetailComponentProps, AccountDetailOwnState> {
    constructor(props: AccountDetailComponentProps) {
        super(props);

        this.state = {};
    }

    render() {
        if (_.isNil(this.props.selectedAccount)) {
            return (
                <NonIdealState visual="disable"
                               title="No account selected"
                               />
            )
        } else {
            return (
                <div>
                    Selected account: {this.props.selectedAccount}
                    <pre>
                    {JSON.stringify(this.props.account, undefined, 2)}
                </pre>
                    <SplitList splits={{}}/>
                </div>
            );
        }
    }
}


export const AccountDetail: React.ComponentClass<AccountDetailOwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(AccountDetailComponent);
