import CONSTANTS from './constants';

const data = {
  accounts: [
    {
      id: 1,
      name: 'Current assets',
      type: CONSTANTS.ACCT_TYPE.ASSET,
      parent: null
    },
    {
      id: 2,
      name: 'Investments',
      type: CONSTANTS.ACCT_TYPE.ASSET,
      parent: null
    },
    {
      id: 3,
      name: 'My checking account',
      type: CONSTANTS.ACCT_TYPE.ASSET,
      parent: 1
    },
    {
      id: 4,
      name: 'My brokerage account',
      type: CONSTANTS.ACCT_TYPE.ASSET,
      parent: 2
    },
    {
      id: 5,
      name: 'Short term liabilities',
      type: CONSTANTS.ACCT_TYPE.LIABILITY,
      parent: null
    },
    {
      id: 6,
      name: 'Platinum credit card',
      type: CONSTANTS.ACCT_TYPE.LIABILITY,
      parent: 4
    },
    {
      id: 7,
      name: 'Salary',
      type: CONSTANTS.ACCT_TYPE.INCOME,
      parent: null
    },
    {
      id: 8,
      name: 'Other income',
      type: CONSTANTS.ACCT_TYPE.INCOME,
      parent: null
    },
    {
      id: 9,
      name: 'Other expenses',
      type: CONSTANTS.ACCT_TYPE.EXPENSE,
      parent: null
    },
    {
      id: 10,
      name: 'Opening balances',
      type: CONSTANTS.ACCT_TYPE.EQUITY,
      parent: null
    },
  ],
  transactions: [
    {
      id: 1,
      splits: [1, 2, 3],
      description: "Monthly salary"
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
  ],
  prices: []
};

export default data;