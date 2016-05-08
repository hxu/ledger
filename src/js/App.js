import React from 'react';
import data from './data';
import CONSTANTS from './constants';
import Account from './Account';
import _ from 'lodash';
import moment from 'moment';
import AccountList from './AccountList';
import AccountDetail from './AccountDetail';


function getChildrenForAccount(acct, accts) {
  if (_.isNumber(acct) || _.isNil(acct)) {
    // Return like for like
    return _.filter(accts, {'parent': acct}).map(function(a) { return a.id; });
  } else if (_.isPlainObject(acct)) {
    return _.filter(accts, {'parent': acct.id});
  } else {
    throw new Exception('Can only find children accounts for an account ID or account object');
  }
}

function getSplitsForAccount(acctId, splits) {
  var accts;
  if (_.isNumber(acctId)) {
    accts = new Set([acctId]);
  } else {
    accts = new Set(acctId);
  }

  var res = [];
  if (splits !== undefined) {
    res = _.filter(splits, function(t) {
      return accts.has(t.account);
    });
  }
  return res;
}

function removeAccount(acct, accts, splits) {
  var acctId;
  if (_.isPlainObject(acct)) {
    acctId = acct.id;
  } else {
    acctId = acct;
  }
  // If the account has a parent, move all splits to that, otherwise, orphan the splits
  var newAccount;
  if (accts[acctId].parent !== null) {
    newAccount = acct.parent;
  } else {
    newAccount = null;
  }
  var newSplits = _.mapValues(splits, function(s) {
    if (s.account === acct.id) {
      s.account = newAccount;
    }
    return s;
  });
  // Same with sub-accounts
  var newAccts = {};
  _.forOwn(accts, function(acct) {
    if (acct.id !== acctId) {
      if (acct.parent === acctId) {
        acct.parent = newAccount;
      }
      newAccts[acct.id] = acct;
    }
  });
  return [newAccts, newSplits];
}

function addAccount(acct, accts) {
  var maxId = parseInt(_.maxBy(_.keys(accts), parseInt));
  var newAccount = _.clone(acct);
  newAccount.id = maxId + 1;
  accts[newAccount.id] = newAccount;
  return accts;
}


export default class App extends React.Component{
  constructor(props) {
    super(props);
    console.log('Data');
    console.log(data);
    this.state = {
      selectedAccount: null,
      accounts: data.accounts,
      splits: data.splits,
      transactions: data.transactions,
      prices: data.prices,
    };
    this.selectAccountHandler = this.selectAccountHandler.bind(this);
    this.removeAccountHandler = this.removeAccountHandler.bind(this);
    this.addAccountHandler = this.addAccountHandler.bind(this);
  }
  
  /* Try calculating on the fly each time
  loadAccounts(accounts) {
    var data = {
      accounts,
      children: _.groupBy(accounts, 'parent'),
      byId: _.keyBy(accounts, 'id')
    };
    
    // Replace id reference to parent with the actual object reference
    accounts.forEach(function(acct) {
      if (!_.isNil(acct.parent)) {
        acct.parent = data.byId[acct.parent];
      }
    });
    
    return data;
  }
  */
  

  addAccountHandler(acct, e) {
    e.preventDefault();
    var accts = addAccount(acct, this.state.accounts);
    this.setState({accounts: accts});
  }
  

  selectAccountHandler(acct, e) {
    console.log('selecting');
    console.log(acct);
    e.preventDefault();
    this.setState({selectedAccount: acct});
  }
  
  removeAccountHandler(acct, e) {
    console.log('removing');
    console.log(acct);
    e.preventDefault();
    var [accts, splits] = removeAccount(acct, this.state.accounts, this.state.splits);
    this.setState({accounts: accts, splits: splits});
  }

  render() {
    console.log('Current state: ');
    console.log(this.state);
    return (
      <div>
        <div>Hello World</div>
        <div><pre>{JSON.stringify(this.state)}</pre></div>
        <AccountList
          accounts={this.state.accounts}
          select-handler={this.selectAccountHandler}
          remove-handler={this.removeAccountHandler}
          add-handler={this.addAccountHandler}
        />
        {(() => {
          if (this.state.selectedAccount) {
            return <div>Selected account: {this.state.selectedAccount.id}</div>
          }
        })()}
        {(() => {
          if (this.state.selectedAccount) {
            var childAccts = getChildrenForAccount(this.state.selectedAccount.id, this.state.accounts);
            return <AccountDetail account={this.state.selectedAccount} splits={getSplitsForAccount(_.concat(childAccts, this.state.selectedAccount.id), this.state.splits)} />
          }
        })()}
      </div>
    );
  }
}
