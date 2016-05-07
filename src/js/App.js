import React from 'react';
import data from './data';
import CONSTANTS from './constants';
import Account from './Account';
import _ from 'lodash';
import moment from 'moment';

class AccountList extends React.Component{
  render() {
    var clickHandler = this.props['click-handler'];
    return (
      <div>
        {this.props.accounts.map(function(acct) {
          return <Account click-handler={(e) => clickHandler(acct, e)} key={acct.id} account={acct} />
        })}
      </div>
    )
  }
}

class AccountDetail extends React.Component {
  render() {
    var splits = _.sortBy(this.props.splits, 'timestamp');
    var runningTotal = 0;
    splits.forEach(function(s) {
      runningTotal += s.amount;
      s.balance = runningTotal;
    });
    
    return (
      <div>
        <div>
          <h3>Account Summary</h3>
          <table>

          </table>
        </div>
        <div>
          <h3>Transactions list</h3>
        </div>
        <div>
          <table>
            <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Date
              </th>
              <th>
                Description
              </th>
              <th>
                Amount
              </th>
              <th>
                Balance
              </th>
            </tr>
            </thead>
            <tbody>
            {splits.map(function(s) {
              return <SplitRow split={s} key={s.id} />
            })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


class SplitRow extends React.Component {
  render() {
    var split = this.props.split;
    return (
      <tr>
        <td>
          {split.id}
        </td>
        <td>
          {moment.utc(split.timestamp).format()}
        </td>
        <td>
          {split.description}
        </td>
        <td>
          {split.amount}
        </td>
        <td>
          {split.balance}
        </td>
      </tr>
    );
  }
}

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

class App extends React.Component{
  constructor(props) {
    super(props);
    console.log('Data');
    console.log(data);
    this.state = {
      selectedAccount: null,
      data: Object.assign({}, data)
    };
    this.handleAccountClick = this.handleAccountClick.bind(this);
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
  
  removeAccount(acct) {
    var acctId;
    if (_.isPlainObject(acct)) {
      acctId = acct.id;
    } else {
      acctId = act;
    }
    
    // FIXME: finish implementing this
  }
  

  handleAccountClick(acct, e) {
    e.preventDefault();
    this.setState({selectedAccount: acct});
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
        <div><pre>{JSON.stringify(this.state)}</pre></div>
        <AccountList accounts={this.state.data.accounts} click-handler={this.handleAccountClick} />
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