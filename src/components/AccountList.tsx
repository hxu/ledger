import * as React from "react";
import * as _ from "lodash";
import {IAccount, AccountType} from "../api/models";
import AccountListItem from "./AccountListItem";
import {IAccountMap, ILedgerStore} from "../api/LedgerStore";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ITreeNode, Tree} from "@blueprintjs/core";


interface AccountListProps {
}

interface AccountListState {
    accounts: IAccountMap;
}

interface AccountListOwnState {
    nodes: ITreeNode[];
}

const mapStateToProps = (state: ILedgerStore): AccountListState => {
    return {accounts: state.accounts};
};

const mapDispatchToProps =  (dispatch: Dispatch<ILedgerStore>): {} => {
    return {};
};

type AccountListComponentProps = AccountListProps & AccountListState;

class AccountListComponent extends React.Component<AccountListComponentProps, AccountListOwnState> {
    constructor(props: AccountListComponentProps) {
        super(props);
        this.makeStartingNodes = this.makeStartingNodes.bind(this);

        this.state = {
            nodes: this.makeStartingNodes()
        };

        this.makeAccount = this.makeAccount.bind(this);
        this.makeAccounts = this.makeAccounts.bind(this);
        this.makeNodes();
    }

    makeStartingNodes(): ITreeNode[] {
        return [
            {
                id: AccountType.ASSET,
                hasCaret: true,
                iconName: 'folder-close',
                label: 'Assets',
                childNodes: []
            },
            {
                id: AccountType.LIABILITY,
                hasCaret: true,
                iconName: 'folder-close',
                label: 'Liabilities',
                childNodes: []
            },
            {
                id: AccountType.EQUITY,
                hasCaret: true,
                iconName: 'folder-close',
                label: 'Equity',
                childNodes: [],
            },
            {
                id: AccountType.INCOME,
                hasCaret: true,
                iconName: 'folder-close',
                label: 'Income',
                childNodes: []
            },
            {
                id: AccountType.EXPENSE,
                hasCaret: true,
                iconName: 'folder-close',
                label: 'Expense',
                childNodes: []
            }
        ]
    }

    makeNodes() {
        let nodeMap = _.keyBy(this.state.nodes, 'id');
        let rawNodes = _.reverse(_.orderBy(_.values(this.props.accounts), 'parent'));
        _.forEach(rawNodes, function(acct: IAccount) {
            let thisNode = {
                id: acct.id,
                childNodes: [] as ITreeNode[],
                iconName: 'dollar',
                label: acct.name
            };

            if (_.isEmpty(acct.parent)) {
                nodeMap[acct.type].childNodes.push(thisNode);
            } else {
                nodeMap[acct.parent].childNodes.push(thisNode);
            }

            nodeMap[thisNode.id] = thisNode;
        });

        _.forEach(nodeMap, function(node, k) {
            if (node.childNodes.length === 0) {
                node.hasCaret = false;
            } else {
                node.hasCaret = true;
            }
        });
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

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    render() {
        return (
            <div id="account-sidebar">
                <Tree contents={this.state.nodes}
                      onNodeCollapse={this.handleNodeCollapse}
                      onNodeExpand={this.handleNodeExpand}
                />
            </div>
        )
    }

}

export const AccountList: React.ComponentClass<AccountListProps> =
    connect(mapStateToProps, mapDispatchToProps)(AccountListComponent);
