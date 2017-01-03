import {IAccountCreateRequest, IAccount} from "../api/models";
import {IAction} from "./IAction";
import {ILedgerStore, IAccountMap} from "../api/ILedgerStore";

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export interface ADD_ACCOUNT {
    account: IAccountCreateRequest
}

export function addAccountAction(acct: IAccountCreateRequest): IAction<ADD_ACCOUNT> {
    return {
        type: ADD_ACCOUNT,
        payload: {account: acct}
    };
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

export function addAccountHandler(state: ILedgerStore, action: IAction<ADD_ACCOUNT>): ILedgerStore {
    let id = uuid();
    let newAccount: IAccount = Object.assign(
        {tags: [], transactions: []},
        action.payload.account,
        {id: id}
    );
    console.log(newAccount);

    let newAccounts: IAccountMap = Object.assign({}, state.accounts, {[newAccount.id]: newAccount});
    let newState: ILedgerStore = Object.assign({}, state, {accounts: newAccounts});

    return newState;
}

