import {Store, createStore} from "redux";
import {selectAccountHandler} from "../actions/SelectAccountAction";
import {ILedgerStore, intialLedgerStoreState} from "./ILedgerStore";


export let LedgerStore: Store<ILedgerStore> = createStore(selectAccountHandler, intialLedgerStoreState);
