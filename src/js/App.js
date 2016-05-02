import React from 'react';
import data from './data';
import CONSTANTS from './constants';
import Account from './Account';
import _ from 'lodash';
import moment from 'moment';

class AccountList extends React.Component{
  render() {
    console.log(this.props);
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

class App extends React.Component{
  constructor(props) {
    super(props);
    console.log(data);
    this.state = {
      selectedAccount: null,
      data: Object.assign({}, data)
    };
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }
  
  getSplitsForAccount(acctId) {
    var splits = [];
    if (this.state.data.splits !== undefined) {
      splits = _.filter(this.state.data.splits, function(t) {
        return t.account === acctId;
      });
    }
    return splits;
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
            return <AccountDetail account={this.state.selectedAccount} splits={this.getSplitsForAccount(this.state.selectedAccount.id)} />
          }
        })()}
      </div>
    );
  }
}

export default App;