import * as React from "react";
import * as _ from "lodash";
import {IAccount, AccountType} from "../api/models";
import {IAccountMap, ILedgerStore} from "../api/LedgerStore";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ITreeNode, Tree} from "@blueprintjs/core";


interface AccountListOwnProps {
}

interface AccountListStoreProps {
    accounts: IAccountMap;
}

interface AccountListOwnState {
    nodes: ITreeNode[];
}

const mapStateToProps = (state: ILedgerStore): AccountListStoreProps => {
    return {accounts: state.accounts};
};

const mapDispatchToProps =  (dispatch: Dispatch<ILedgerStore>): {} => {
    return {};
};

type AccountListComponentProps = AccountListOwnProps & AccountListStoreProps;

class AccountListComponent extends React.Component<AccountListComponentProps, AccountListOwnState> {
    constructor(props: AccountListComponentProps) {
        super(props);
        this.makeStartingNodes = this.makeStartingNodes.bind(this);

        this.state = {
            nodes: this.makeStartingNodes()
        };

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
            node.hasCaret = node.childNodes.length !== 0;
        });
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
            <Tree contents={this.state.nodes}
                  onNodeCollapse={this.handleNodeCollapse}
                  onNodeExpand={this.handleNodeExpand}
            />
        )
    }

}

export const AccountList: React.ComponentClass<AccountListOwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(AccountListComponent);
