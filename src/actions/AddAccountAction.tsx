import {IAccountCreateRequest, IAccount} from "../api/models";
import {IAction} from "./IAction";
import {ILedgerStore, IAccountMap} from "../api/ILedgerStore";
import {Dispatch} from "react-redux";
import Backend from "../api/Backend";

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_ACCOUNT_START = 'ADD_ACCOUNT_START';
export const ADD_ACCOUNT_SUCCESS = 'ADD_ACCOUNT_SUCCESS';
export const ADD_ACCOUNT_ERROR = 'ADD_ACCOUNT_ERROR';

export interface ADD_ACCOUNT {
    account: IAccountCreateRequest
}

export interface ADD_ACCOUNT_START {
    account: IAccountCreateRequest
}

export interface ADD_ACCOUNT_SUCCESS {
    account: IAccount
}

export interface ADD_ACCOUNT_ERROR {
    account: IAccountCreateRequest
}

export function addAccountAction(acct: IAccountCreateRequest): IAction<ADD_ACCOUNT> {
    return {
        type: ADD_ACCOUNT,
        payload: {account: acct}
    };
}

export function addAccountStartAction(acct: IAccountCreateRequest): IAction<ADD_ACCOUNT_START> {
    return {
        type: ADD_ACCOUNT_START,
        payload: {account: acct}
    };
}

export function addAccountSuccessAction(acct: IAccount): IAction<ADD_ACCOUNT_SUCCESS> {
    return {
        type: ADD_ACCOUNT_SUCCESS,
        payload: {account: acct}
    };
}

export function addAccountErrorAction(acct: IAccountCreateRequest): IAction<ADD_ACCOUNT_ERROR> {
    return {
        type: ADD_ACCOUNT_ERROR,
        payload: {account: acct},
        error: true
    }
}


export function addAccountStartHandler(state: ILedgerStore, action: IAction<ADD_ACCOUNT_START>): ILedgerStore {
    return state;
}

export function addAccountSuccessHandler(state: ILedgerStore, action: IAction<ADD_ACCOUNT_SUCCESS>): ILedgerStore {
    let newAccounts: IAccountMap = Object.assign({}, state.accounts, {[action.payload.account.id]: action.payload.account});
    let newState: ILedgerStore = Object.assign({}, state, {accounts: newAccounts});

    return newState;
}

export function addAccountErrorHandler(state: ILedgerStore, action: IAction<ADD_ACCOUNT_ERROR>): ILedgerStore {
    return state;
}


export function addAccount(acct: IAccountCreateRequest): ((dispatch: Dispatch<ILedgerStore>) => void) {
    // Asynchronously add an account
    return (dispatch: Dispatch<ILedgerStore>): Promise<IAccount> => {
        let action = addAccountAction(acct);
        dispatch(action);

        return Backend.storeAccount(action.payload.account)
            .then((acct) => {
                console.log('Add account successful');
                dispatch(addAccountSuccessAction(acct));
                return acct;
            })
            .catch((error: any) => {
                console.log('Add account failed');
                dispatch(addAccountErrorAction(error.payload as IAccountCreateRequest))
            });
    }
}
