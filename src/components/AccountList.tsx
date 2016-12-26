import * as React from "react";
import * as _ from "lodash";
import {IAccount, AccountType} from "../api/models";
import {LedgerStore} from "../api/LedgerStore";
import AccountListItem from "./AccountListItem";


interface AccountListProps {
}

interface AccountListState {
    accounts: {string: IAccount};
}

export default class AccountList extends React.Component<AccountListProps, AccountListState> {
    constructor(props: AccountListProps) {
        super(props);
        this.state = {
            accounts: {} as {string: IAccount}
        };
    }

    componentDidMount() {
        this.setState({accounts: LedgerStore.getAccounts()});
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
        let byParent = _.groupBy(_.values(this.state.accounts), 'parent');
        depth = depth || 0;
        seen = seen || new Set([]);
        let res: JSX.Element[] = [];

        _.mapValues(accts, function(acct) {
            if (!seen.has(acct.id)) {
                res.push(this.makeAccount(acct, depth));
                seen.add(acct.id);

          if (acct.id in byParent) {
            res.push(...this.makeAccounts(byParent[acct.id], seen, depth + 1));
          }
        }
      });
      return res;
    }

    render() {
        return (
            <div>
                <h5>Assets</h5>
                {this.makeAccounts(_.filter(_.values(this.state.accounts), {type: AccountType.ASSET}), null, null)}
                <h5>Liabilities</h5>
                <h5>Equity</h5>
                <h5>Income</h5>
                <h5>Expense</h5>
            </div>
        )
    }

}
