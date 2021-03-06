import * as _ from "lodash";
import {AccountType, ISplit, ITransaction, IBoolMap} from "./models";
import {ICurrencyMap, IAccountMap, ISplitMap, ITransactionMap} from "./ILedgerStore";

const currencies: ICurrencyMap = {
    USD: {code: 'USD'},
    GBP: {code: 'GBP'},
    SGD: {code: 'SGD'},
    HKD: {code: 'HKD'}
};

const accounts: IAccountMap = {
    '101': {
        id: '101',
        name: 'Current assets',
        type: AccountType.ASSET,
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '102': {
        id: '102',
        name: 'Investments',
        type: AccountType.ASSET,
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '103': {
        id: '103',
        name: 'My checking account',
        type: AccountType.ASSET,
        parent: '101',
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '104': {
        id: '104',
        name: 'My brokerage account',
        type: AccountType.ASSET,
        parent: '102',
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '105': {
        id: '105',
        name: 'Short term liabilities',
        type: AccountType.LIABILITY,
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '106': {
        id: '106',
        name: 'Platinum credit card',
        type: AccountType.LIABILITY,
        parent: '105',
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '107': {
        id: '107',
        name: 'Salary',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '108': {
        id: '108',
        name: 'Other income',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '109': {
        id: '109',
        name: 'Other expenses',
        type: AccountType.EXPENSE,
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    },
    '110': {
        id: '110',
        name: 'Opening balances',
        type: AccountType.EQUITY,
        currency: currencies['USD'],
        tags: {} as IBoolMap,
        splits: {} as IBoolMap
    }
};


const _splits: ISplit[] = [
    {
        id: "",
        account: "107",
        credit: 10000,
        debit: 0,
        currency: "USD",
        date: Date.UTC(2016, 4, 1),
        transaction: "",
        description: "Monthly salary",
    },
    {
        id: "",
        account: "103",
        credit: 0,
        debit: 9000,
        currency: "USD",
        date: Date.UTC(2016, 4, 1),
        transaction: "",
        description: "Monthly salary"
    },
    {
        id: "",
        account: "109",
        credit: 0,
        debit: 1000,
        currency: "USD",
        date: Date.UTC(2016, 4, 1),
        transaction: "",
        description: 'Tax withholding'
    },
    {
        id: "",
        account: "106",
        credit: 250,
        debit: 0,
        currency: "USD",
        date: Date.UTC(2016, 6, 12),
        transaction: "",
        description: "Misc expenses"
    },
    {
        id: "",
        account: "109",
        credit: 0,
        debit: 250,
        currency: "USD",
        date: Date.UTC(2016, 6, 12),
        transaction: "",
        description: "Misc expenses"
    }
];

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

let txn1 = {
    id: uuid(),
    splits: {} as IBoolMap,
};

let txn2 = {
    id: uuid(),
    splits: {} as IBoolMap,
};

const transactions: ITransactionMap = {
    [txn1.id]: txn1,
    [txn2.id]: txn2
};

const splits: ISplitMap = _.keyBy(_.map(_splits, (s, i) => {
    s.id = uuid();
    let txn = (i < 3) ? txn1: txn2;
    s.transaction = txn.id;
    txn.splits[s.id] = true;
    accounts[s.account].splits[s.id] = true;
    return s;
}), "id");

export const data = {
    currencies: currencies,
    accounts: accounts,
    splits: splits,
    transactions: transactions
};
