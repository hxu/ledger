import * as React from "react";
import * as _ from "lodash";
import {IAccount, AccountType} from "../api/models";
import AccountListItem from "./AccountListItem";
import {IAccountMap, ILedgerStore} from "../api/LedgerStore";
import {Dispatch} from "redux";
import {connect} from "react-redux";


interface AccountListProps {
}

interface AccountListState {
    accounts: IAccountMap;
}

const mapStateToProps = (state: ILedgerStore): AccountListState => {
    return {accounts: state.accounts};
};

const mapDispatchToProps =  (dispatch: Dispatch<ILedgerStore>): {} => {
    return {};
};

type AccountListComponentProps = AccountListProps & AccountListState;

class AccountListComponent extends React.Component<AccountListComponentProps, {}> {
    constructor(props: AccountListComponentProps) {
        super(props);
        this.makeAccount = this.makeAccount.bind(this);
        this.makeAccounts = this.makeAccounts.bind(this);
    }
    componentDidMount() {
    }

    makeAccount(account: IAccount, depth: number): JSX.Element {
        return (
            <AccountListItem
                depth={depth}
                key={account.id}
                account={account} />
        );
    }

    makeAccounts(accts: IAccount[], seen: Set<String>, depth: number): JSX.Element[] {
        let byParent = _.groupBy(_.values(this.props.accounts), 'parent');
        depth = depth || 0;
        seen = seen || new Set([]);
        let res: JSX.Element[] = [];

        const makeAccount = this.makeAccount;
        const makeAccounts = this.makeAccounts;

        _.mapValues(accts, function(acct) {
            if (!seen.has(acct.id)) {
                res.push(makeAccount(acct, depth));
                seen.add(acct.id);

          if (acct.id in byParent) {
            res.push(...makeAccounts(byParent[acct.id], seen, depth + 1));
          }
        }
      });
      return res;
    }

    render() {
        return (
            <div>
                <h5>Assets</h5>
                {this.makeAccounts(_.filter(_.values(this.props.accounts), {type: AccountType.ASSET}), null, null)}
                <h5>Liabilities</h5>
                <h5>Equity</h5>
                <h5>Income</h5>
                <h5>Expense</h5>
            </div>
        )
    }

}

export const AccountList: React.ComponentClass<AccountListProps> =
    connect(mapStateToProps, mapDispatchToProps)(AccountListComponent);
