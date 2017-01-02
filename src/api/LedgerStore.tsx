import {IAccount, ITransaction, ISplit, ICurrency, IAccountCreateRequest} from "./models";
import {Store, createStore, Reducer} from "redux";
import {data} from "./data";


export interface IAccountMap {
    [key: string]: IAccount
}
export interface ITransactionMap {
    [key: string]: ITransaction
}
export interface ISplitMap {
    [key: string]: ISplit
}
export interface ICurrencyMap {
    [key: string]: ICurrency
}
export interface ILedgerStore {
    selectedAccount: string;
    accounts: IAccountMap;
    transactions: ITransactionMap;
    splits: ISplitMap;
    currencies: ICurrencyMap;
}

const intialLedgerStoreState: ILedgerStore = {
    selectedAccount: null,
    accounts: data.accounts,
    transactions: {} as ITransactionMap,
    splits: {} as ISplitMap,
    currencies: data.currencies
};

export interface IAction<P> {
    type: string;
    payload: P;
    error?: boolean;
    meta?: any;
}

export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';
export interface SELECT_ACCOUNT {
    account: IAccount
}
export function selectAccountAction(acct: IAccount): IAction<SELECT_ACCOUNT> {
    return {
        type: SELECT_ACCOUNT,
        payload: {account: acct}
    };
}

export const DESELECT_ACCOUNT = 'DESELECT_ACCOUNT';
export interface DESELECT_ACCOUNT {}
export function deselectAccountAction(): IAction<DESELECT_ACCOUNT> {
    return {
        type: DESELECT_ACCOUNT,
        payload: {}
    };
}

export function isAction<P>(action: IAction<any>, type: string): action is IAction<P> {
    return action.type == type;
}

export function selectAccountHandler(state: ILedgerStore, action: IAction<any>): ILedgerStore {
    if (isAction<SELECT_ACCOUNT>(action, SELECT_ACCOUNT)) {
        return Object.assign({}, state, {
            selectedAccount: action.payload.account.id
        });
    }
    if (isAction<DESELECT_ACCOUNT>(action, DESELECT_ACCOUNT)) {
        return Object.assign({}, state, {
            selectedAccount: null
        });
    }

    return state;
}

export let LedgerStore: Store<ILedgerStore> = createStore(selectAccountHandler, intialLedgerStoreState);
