import { combineReducers, createStore, applyMiddleware } from 'redux';
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
export function removeAccountAction(acct) {
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

function changeSplitsAccount(fromAccount, toAccount, splits) {
  var newSplits = _.mapValues(splits, function(split) {
    if (split.account === fromAccount) {
      var newSplit = _.clone(split);
      newSplit.account = toAccount;
      return newSplit;
    } else {
      return split;
    }
  });
  return newSplits;
}

function changeParentAccount(fromAccount, toAccount, accounts) {
  var newAccts = {};
  _.forOwn(accounts, function(acct) {
    if (acct.parent === fromAccount) {
      var newAcct = _.clone(acct);
      newAcct.parent = toAccount;
      newAccts[newAcct.id] = newAcct;
    } else {
      newAccts[acct.id] = acct;
    }
  });
  return newAccts;
}

function removeAccount(state = initialState, action) {
  /* Reducer for removing accounts.
   We need the whole state because we need to change the parent account of
   splits that belong to the account being removed
   */
  if (action.type == REMOVE_ACCOUNT) {
    var oldId = action.account;
    var newId = getParentAccount(oldId, state.accounts);
    
    var newAccounts = changeParentAccount(oldId, newId, state.accounts);
    delete newAccounts[oldId];
    
    var newSplits = changeSplitsAccount(oldId, newId, state.splits);
    // If the account that we're removing is selected, deselect it
    var newSelection = (state.selectedAccount === oldId) ? null : state.selectedAccount;
    
    var newState = Object.assign({}, state, {
      accounts: newAccounts,
      splits: newSplits,
      selectedAccount: newSelection
    });
    return newState;
  } else {
    return state;
  }
}

function getParentAccount(accountId, accounts) {
  /* Gets the parent account id, or returns null if there is none
   */
  var parent = accounts[accountId].parent;
  if (_.isNil(parent)) {
    return null;
  } else {
    return parent;
  }
}

function accounts(state = initialState.accounts, action) {
  switch(action.type) {
    case ADD_ACCOUNT:
      return addAccount(action.account, state);
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
  switch(action.type) {
    default:
      return state;
  }
}

function transactions(state = initialState.splits, action) {
  return state;
}

function prices(state = initialState.splits, action) {
  return state;
}

export const ledgerApp = function(state, action) {
  var reducers = [
    combineReducers({
      selectedAccount,
      accounts,
      splits,
      transactions,
      prices
    }),
    removeAccount
  ];

  return reducers.reduce((s, reducer) => reducer(s, action), state);
};


const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
};


export let ledgerStore = createStore(ledgerApp, initialState, applyMiddleware(logger));

