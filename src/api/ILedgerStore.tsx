import {IAccount, ISplit, ITransaction, ICurrency} from "./models";
import {data} from "./data";

export interface IAccountMap {
    [key: string]: IAccount
}
export interface ISplitMap {
    [key: string]: ISplit
}
export interface ITransactionMap {
    [key: string]: ITransaction
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

export const intialLedgerStoreState: ILedgerStore = {
    selectedAccount: null,
    accounts: data.accounts,
    transactions: data.transactions,
    splits: data.splits,
    currencies: data.currencies
};

