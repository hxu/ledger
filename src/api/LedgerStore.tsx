import {Store, createStore, applyMiddleware} from "redux";
import {
    selectAccountHandler,
    SELECT_ACCOUNT,
    DESELECT_ACCOUNT,
    deselectAccountHandler
} from "../actions/SelectAccountAction";
import {ILedgerStore, intialLedgerStoreState} from "./ILedgerStore";
import {IAction, isAction} from "../actions/IAction";
import {
    ADD_ACCOUNT_START,
    ADD_ACCOUNT_SUCCESS,
    ADD_ACCOUNT_ERROR,
    addAccountStartHandler,
    addAccountSuccessHandler,
    addAccountErrorHandler
} from "../actions/AddAccountAction";
import createLogger = require("redux-logger");
let thunk: any = require('redux-thunk').default;


export function rootReducer(state: ILedgerStore, action: IAction<any>): ILedgerStore {
    if (isAction<SELECT_ACCOUNT>(action, SELECT_ACCOUNT)) {
        return selectAccountHandler(state, action);
    }

    if (isAction<DESELECT_ACCOUNT>(action, DESELECT_ACCOUNT)) {
        return deselectAccountHandler(state, action);
    }

    if (isAction<ADD_ACCOUNT_START>(action, ADD_ACCOUNT_START)) {
        return addAccountStartHandler(state, action);
    }

    if (isAction<ADD_ACCOUNT_SUCCESS>(action, ADD_ACCOUNT_SUCCESS)) {
        return addAccountSuccessHandler(state, action);
    }

    if (isAction<ADD_ACCOUNT_ERROR>(action, ADD_ACCOUNT_ERROR)) {
        return addAccountErrorHandler(state, action);
    }

    return state;
}

const logger = createLogger();

export let LedgerStore: Store<ILedgerStore> = createStore(
    rootReducer,
    intialLedgerStoreState,
    applyMiddleware(thunk, logger)
);
