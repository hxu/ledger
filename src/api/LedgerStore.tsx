import {Store, createStore, applyMiddleware} from "redux";
import {
    selectAccountHandler, SELECT_ACCOUNT, DESELECT_ACCOUNT,
    deselectAccountHandler
} from "../actions/SelectAccountAction";
import {ILedgerStore, intialLedgerStoreState} from "./ILedgerStore";
import {IAction, isAction} from "../actions/IAction";
import {ADD_ACCOUNT, addAccountHandler} from "../actions/AddAccountAction";
import createLogger = require("redux-logger");


export function rootReducer(state: ILedgerStore, action: IAction<any>): ILedgerStore {
    if (isAction<SELECT_ACCOUNT>(action, SELECT_ACCOUNT)) {
        return selectAccountHandler(state, action);
    }

    if (isAction<DESELECT_ACCOUNT>(action, DESELECT_ACCOUNT)) {
        return deselectAccountHandler(state, action);
    }

    if (isAction<ADD_ACCOUNT>(action, ADD_ACCOUNT)) {
        return addAccountHandler(state, action);
    }

    return state;
}

const logger = createLogger();

export let LedgerStore: Store<ILedgerStore> = createStore(
    rootReducer,
    intialLedgerStoreState,
    applyMiddleware(logger)
);
