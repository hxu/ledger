import {IAccount, ITransaction, ISplit, ICurrency, IAccountCreateRequest} from "./models";
import * as _ from "lodash";


export class LedgerStore {
    accounts: {string: IAccount};
    transactions: {string: ITransaction};
    splits: {string: ISplit};
    currencies: {string: ICurrency};

    static _store: LedgerStore;

    constructor() {
        this.accounts = {} as {string: IAccount};
        this.transactions = {} as {string: ITransaction};
        this.splits = {} as {string: ISplit};
        this.currencies = {} as {string: ICurrency};
    }

    static getStore(): LedgerStore {
        if (_.isNull(LedgerStore._store)) {
            LedgerStore._store = new LedgerStore();
        }
        return this._store;
    }

    static getAccounts(): {string: IAccount} {
        return this._store.accounts;
    }

    static createAccount(request: IAccountCreateRequest): IAccount {
        return null;
    }

    static removeAccount(accountId: string): void {
    }
}
