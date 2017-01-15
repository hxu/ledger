import * as _ from "lodash";
import {AccountType, ISplit, ITransaction} from "./models";
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
        tags: [] as string[],
        splits: [] as string[]
    },
    '102': {
        id: '102',
        name: 'Investments',
        type: AccountType.ASSET,
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '103': {
        id: '103',
        name: 'My checking account',
        type: AccountType.ASSET,
        parent: '101',
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '104': {
        id: '104',
        name: 'My brokerage account',
        type: AccountType.ASSET,
        parent: '102',
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '105': {
        id: '105',
        name: 'Short term liabilities',
        type: AccountType.LIABILITY,
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '106': {
        id: '106',
        name: 'Platinum credit card',
        type: AccountType.LIABILITY,
        parent: '105',
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '107': {
        id: '107',
        name: 'Salary',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '108': {
        id: '108',
        name: 'Other income',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '109': {
        id: '109',
        name: 'Other expenses',
        type: AccountType.EXPENSE,
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
    },
    '110': {
        id: '110',
        name: 'Opening balances',
        type: AccountType.EQUITY,
        currency: currencies['USD'],
        tags: [] as string[],
        splits: [] as string[]
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
    splits: [] as string[],
};

let txn2 = {
    id: uuid(),
    splits: [] as string[],
};

const transactions: ITransactionMap = {
    [txn1.id]: txn1,
    [txn2.id]: txn2
};

const splits: ISplitMap = _.keyBy(_.map(_splits, (s, i) => {
    s.id = uuid();
    let txn = (i < 3) ? txn1: txn2;
    s.transaction = txn.id;
    txn.splits.push(s.id);
    return s;
}), "id");


/*
const data = _.mapValues({
    accounts: [
    ],
    splits: [
        {
            id: 1,
            splits: [1, 2, 3],
            description: "Monthly salary"
        },
        {
            id: 2,
            splits: [4, 5],
            description: 'Misc expenses'
        }
    ],
    splits: [
        {
            id: 1,
            account: 7,
            amount: 10000,
            timestamp: Date.UTC(2016, 4, 1),
            transaction: 1
        },
        {
            id: 2,
            account: 3,
            amount: 9000,
            timestamp: Date.UTC(2016, 4, 1),
            transaction: 1
        },
        {
            id: 3,
            account: 9,
            amount: 1000,
            timestamp: Date.UTC(2016, 4, 1),
            transaction: 1,
            description: 'Tax withholding'
        },
        {
            id: 4,
            account: 6,
            amount: 250,
            timestamp: Date.UTC(2016, 6, 12),
            transaction: 2
        },
        {
            id: 5,
            account: 9,
            amount: 250,
            timestamp: Date.UTC(2016, 6, 12),
            transaction: 2
        }
    ],
    prices: []
}, function(val) {
    return _.keyBy(val, 'id');
});
*/

export const data = {
    currencies: currencies,
    accounts: accounts,
    splits: splits,
    transactions: transactions
};
