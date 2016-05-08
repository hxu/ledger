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

  console.log(acctId);
  console.log('getting splits for accounts: ');
  console.log(accts);

  var res = [];
  if (splits !== undefined) {
    res = _.filter(splits, function(t) {
      return accts.has(t.account);
    });
  }
  return res;
}

function removeAccount(acct, accts) {
    var acctId;
    if (_.isPlainObject(acct)) {
      acctId = acct.id;
    } else {
      acctId = act;
    }
    
    // FIXME: finish implementing this
  }
  


class App extends React.Component{
  constructor(props) {
    super(props);
    console.log('Data');
    console.log(data);
    this.state = {
      selectedAccount: null,
      data: Object.assign({}, data)
    };
    this.selectAccountHandler = this.selectAccountHandler.bind(this);
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
  
  getAccountById(id) {
    return _.find(this.state.data.accounts, {'id': id});
  }
  
 
  addAccount(acct) {
    this.state.data.accounts.push(acct);
  }
  

  selectAccountHandler(acct, e) {
    console.log('selecting');
    console.log(acct);
    e.preventDefault();
    this.setState({selectedAccount: acct});
  }
  
  removeAccountHandler(acct, e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
        <div><pre>{JSON.stringify(this.state)}</pre></div>
        <AccountList accounts={this.state.data.accounts} select-handler={this.selectAccountHandler} />
        {(() => {
          if (this.state.selectedAccount) {
            return <div>Selected account: {this.state.selectedAccount.id}</div>
          }
        })()}
        {(() => {
          if (this.state.selectedAccount) {
            var childAccts = getChildrenForAccount(this.state.selectedAccount.id, this.state.data.accounts);
            return <AccountDetail account={this.state.selectedAccount} splits={getSplitsForAccount(_.concat(childAccts, this.state.selectedAccount.id), this.state.data.splits)} />
          }
        })()}
      </div>
    );
  }
}

export default App;