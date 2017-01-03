import {AccountType, ITransaction} from "./models";
import {ICurrencyMap, IAccountMap} from "./ILedgerStore";

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
        transactions: [] as ITransaction[]
    },
    '102': {
        id: '102',
        name: 'Investments',
        type: AccountType.ASSET,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '103': {
        id: '103',
        name: 'My checking account',
        type: AccountType.ASSET,
        parent: '101',
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '104': {
        id: '104',
        name: 'My brokerage account',
        type: AccountType.ASSET,
        parent: '102',
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '105': {
        id: '105',
        name: 'Short term liabilities',
        type: AccountType.LIABILITY,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '106': {
        id: '106',
        name: 'Platinum credit card',
        type: AccountType.LIABILITY,
        parent: '105',
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '107': {
        id: '107',
        name: 'Salary',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '108': {
        id: '108',
        name: 'Other income',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '109': {
        id: '109',
        name: 'Other expenses',
        type: AccountType.EXPENSE,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '110': {
        id: '110',
        name: 'Opening balances',
        type: AccountType.EQUITY,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    }
};


/*
const data = _.mapValues({
    accounts: [
    ],
    transactions: [
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
    accounts: accounts
};
