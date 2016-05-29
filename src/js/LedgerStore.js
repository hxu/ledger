import { combineReducers } from 'redux';
import data from './data';
import _ from "lodash";

/* Actions */

const getAcctId = function(acct) {
  var acctId;
  if (_.isPlainObject(acct)) {
    acctId = acct.id;
  } else {
    acctId = acct;
  }
  return acctId;
};

export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';
export function selectAccountAction(acct) {
  return {
    type: SELECT_ACCOUNT,
    account: getAcctId(acct)
  };
}

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export function addAccountAction(acct) {
  return {
    type: ADD_ACCOUNT,
    account: acct
  };
}

export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export function removeAccountAcount(acct) {
  return {
    type: REMOVE_ACCOUNT,
    account: getAcctId(acct)
  };
}

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export function updateAccountAction(newAcct) {
  return {
    type: UPDATE_ACCOUNT,
    account: newAcct
  };
}

/* Reducers */

export const initialState = {
  selectedAccount: null,
  accounts: data.accounts,
  splits: data.splits,
  transactions: data.transactions,
  prices: data.prices
};

function addAccount(acct, accts) {
  var maxId = parseInt(_.maxBy(_.keys(accts), parseInt));
  var newAccount = _.clone(acct);
  newAccount.id = maxId + 1;
  accts[newAccount.id] = newAccount;
  return accts;
}

function accounts(state = initialState.accounts, action) {
  switch(action.type) {
    case ADD_ACCOUNT:
      return addAccount(action.account, state);
    case REMOVE_ACCOUNT:
    case UPDATE_ACCOUNT:
    default:
      return state;
  }
}

function selectedAccount(state = initialState.selectedAccount, action) {
  switch(action.type) {
    case SELECT_ACCOUNT:
      return action.account;
    default:
      return state;
  }
}

function splits(state = initialState.splits, action) {
  return state;
}

function transactions(state = initialState.splits, action) {
  return state;
}

function prices(state = initialState.splits, action) {
  return state;
}

export const ledgerApp = combineReducers({
  selectedAccount,
  accounts,
  splits,
  transactions,
  prices
});
