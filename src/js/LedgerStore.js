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
    }
    newAccts[acct.id] = newAcct;
  });
  return newAccts;
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
    case REMOVE_ACCOUNT:
      let parent = getParentAccount(action.account, state);
      let newState = changeParentAccount(action.account, parent, state);
      delete newState[action.account];
      return newState;
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

// FIXME: this doesn't work because the state is just the splits section of the state
function splits(state = initialState.splits, action) {
  switch(action.type) {
    case REMOVE_ACCOUNT:
      var parent = getParentAccount(action.account, state.accounts);
      return changeSplitsAccount(action.account, parent, state.splits);
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

export const ledgerApp = combineReducers({
  selectedAccount,
  accounts,
  splits,
  transactions,
  prices
});


const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
};


export let ledgerStore = createStore(ledgerApp, initialState, applyMiddleware(logger));

