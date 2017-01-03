import * as React from "react";
import {IAccount} from "../api/models";
import {IAction, isAction} from "./IAction";
import {ILedgerStore} from "../api/ILedgerStore";

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

