import * as React from "react";
import * as _ from "lodash";
import {IAccount, AccountType} from "../api/models";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ITreeNode, Tree} from "@blueprintjs/core";
import {IAccountMap, ILedgerStore} from "../api/ILedgerStore";
import {IAction} from "../actions/IAction";
import {SELECT_ACCOUNT, selectAccountAction} from "../actions/SelectAccountAction";


interface AccountListOwnProps {
}

interface AccountListStoreProps {
    accounts: IAccountMap;
    selectedAccount: string;
}

interface AccountListOwnState {
    nodes: ITreeNode[];
}

interface AccountListDispatch {
    selectAccount: (acct: IAccount) => IAction<SELECT_ACCOUNT>;
}

const mapStateToProps = (state: ILedgerStore): AccountListStoreProps => {
    return {
        accounts: state.accounts,
        selectedAccount: state.selectedAccount
    };
};

const mapDispatchToProps =  (dispatch: Dispatch<ILedgerStore>): AccountListDispatch => {
    return {
        selectAccount: (acct: IAccount) => { return dispatch(selectAccountAction(acct)) }
    }
};

type AccountListComponentProps = AccountListOwnProps & AccountListStoreProps & AccountListDispatch;

class AccountListComponent extends React.Component<AccountListComponentProps, AccountListOwnState> {
    constructor(props: AccountListComponentProps) {
        super(props);
        this.makeStartingNodes = this.makeStartingNodes.bind(this);

        this.state = {
            nodes: this.processAccountsIntoNodes(props.accounts, null)
        };
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

    _currentNodeMap(node: ITreeNode): {[key: string]: ITreeNode} {
        let nodeMap = {} as {[key: string]: ITreeNode};
        if (node.childNodes.length > 0) {
            let childNodeMaps = node.childNodes.map(this._currentNodeMap, this);
            nodeMap = Object.assign(nodeMap, ...childNodeMaps);
        }
        nodeMap[node.id] = node;
        return nodeMap
    }

    makeCurrentNodeMap(): {[key: string]: ITreeNode} {
        // Recursively walk the existing nodes in state so that we can easily access current state
        let nodeMaps: {[key: string]: ITreeNode}[];
        if (this.state && this.state.nodes) {
            nodeMaps = this.state.nodes.map(this._currentNodeMap, this);
        } else {
            nodeMaps = [];
        }
        return Object.assign({}, ...nodeMaps) as {[key: string]: ITreeNode};
    }

    processSingleAccountIntoNode(acct: IAccount): ITreeNode {
        let thisNode = {
            id: acct.id,
            childNodes: [] as ITreeNode[],
            iconName: 'dollar',
            label: acct.name
        };
        return thisNode;
    }

    processAccountsIntoNodes(accts: IAccountMap, selectedAcct: string): ITreeNode[] {
        // Takes the accounts from the props and refreshes the tree.
        let currentNodeMap = this.makeCurrentNodeMap();
        let propsToCopy: string[] = [
            'isExpanded'
        ];

        let nodeMap: {[key: string]: ITreeNode} = {};
        // First, process each of the base account types
        _.forEach(this.makeStartingNodes(), (node: ITreeNode) => {
            _.merge(node, _.pick(currentNodeMap[node.id], propsToCopy));
            nodeMap[node.id] = node;
        });

        // Then, for each Account in props, turn it into a node
        let rawNodes = _.reverse(
            // We want the accounts without parents first
            _.orderBy(_.values(accts), 'parent') as IAccount[]
        );

        _.forEach(rawNodes, (acct: IAccount) => {
            let thisNode = this.processSingleAccountIntoNode(acct);
            // If the account already exists in the current state, copy over current state (such as whether it is expanded)
            if (thisNode.id in currentNodeMap) {
                _.merge(thisNode, _.pick(currentNodeMap[thisNode.id], propsToCopy));
            }

            thisNode.isSelected = thisNode.id === selectedAcct;

            // Push this node into the childNodes of the relevant ITreeNode
            if (_.isEmpty(acct.parent)) {
                nodeMap[acct.type].childNodes.push(thisNode);
            } else {
                nodeMap[acct.parent].childNodes.push(thisNode);
            }

            nodeMap[thisNode.id] = thisNode;
        });

        // FIXME: this should preserve childnodes order such that any account additions are put on the end
        _.forEach(nodeMap, function(node, k) {
            node.hasCaret = node.childNodes.length !== 0;
        });

        // Pull out the main top level account types into an array
        return [
            nodeMap[AccountType.ASSET],
            nodeMap[AccountType.LIABILITY],
            nodeMap[AccountType.INCOME],
            nodeMap[AccountType.EXPENSE],
            nodeMap[AccountType.EQUITY]
        ];
    }

    componentWillReceiveProps(nextProps: AccountListComponentProps) {
        this.setState({nodes: this.processAccountsIntoNodes(nextProps.accounts, nextProps.selectedAccount)});
    }

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };

    private handleNodeClick = (nodeData: ITreeNode) => {
        // Don't dispatch if we've clicked a root node
        if (!(nodeData.id in _.values(AccountType))) {
            let clickedAccount = this.props.accounts[nodeData.id];
            this.props.selectAccount(clickedAccount);
        }
    };

    render() {
        return (
            <Tree contents={this.state.nodes}
                  onNodeCollapse={this.handleNodeCollapse}
                  onNodeExpand={this.handleNodeExpand}
                  onNodeClick={this.handleNodeClick}
            />
        )
    }

}

export const AccountList: React.ComponentClass<AccountListOwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(AccountListComponent);
