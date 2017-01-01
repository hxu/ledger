import {AccountType, ICurrency, ITransaction} from "./models";
import {ICurrencyMap, IAccountMap} from "./LedgerStore";

const currencies: ICurrencyMap = {
    USD: {code: 'USD'},
    GBP: {code: 'GBP'},
    SGD: {code: 'SGD'},
    HKD: {code: 'HKD'}
};

const accounts: IAccountMap = {
    '1': {
        id: '1',
        name: 'Current assets',
        type: AccountType.ASSET,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '2': {
        id: '2',
        name: 'Investments',
        type: AccountType.ASSET,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '3': {
        id: '3',
        name: 'My checking account',
        type: AccountType.ASSET,
        parent: '1',
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '4': {
        id: '4',
        name: 'My brokerage account',
        type: AccountType.ASSET,
        parent: '2',
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '5': {
        id: '5',
        name: 'Short term liabilities',
        type: AccountType.LIABILITY,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '6': {
        id: '6',
        name: 'Platinum credit card',
        type: AccountType.LIABILITY,
        parent: '5',
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '7': {
        id: '7',
        name: 'Salary',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '8': {
        id: '8',
        name: 'Other income',
        type: AccountType.INCOME,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '9': {
        id: '9',
        name: 'Other expenses',
        type: AccountType.EXPENSE,
        currency: currencies['USD'],
        tags: [] as string[],
        transactions: [] as ITransaction[]
    },
    '10': {
        id: '10',
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
