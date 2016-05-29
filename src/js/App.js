import React from 'react';
import data from './data';
import CONSTANTS from './constants';
import Account from './Account';
import _ from 'lodash';
import moment from 'moment';
import AccountList from './AccountList';
import AccountListContainer from './AccountListContainer';
import AccountDetail from './AccountDetail';
import { connect } from 'react-redux';


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

class _App extends React.Component{
  constructor(props) {
    super(props);
    console.log('Data');
    console.log(data);
    this.state = {
    };
    this.removeAccountHandler = this.removeAccountHandler.bind(this);
  }
  
  removeAccountHandler(acct, e) {
    console.log('removing');
    console.log(acct);
    e.preventDefault();
    var [accts, splits] = removeAccount(acct, this.state.accounts, this.state.splits);
    this.setState({accounts: accts, splits: splits});
  }

  render() {
    return (
      <div>
        <div><pre>{JSON.stringify(this.state)}</pre></div>
        <AccountListContainer />

        {(() => {
          if (this.props.selectedAccount) {
            return <div>Selected account: {this.props.selectedAccount.id}</div>
          }
        })()}
        
        {(() => {
          if (this.props.selectedAccount) {
            var childAccts = getChildrenForAccount(this.props.selectedAccount.id, this.state.accounts);
            return <AccountDetail account={this.props.selectedAccount} splits={getSplitsForAccount(_.concat(childAccts, this.props.selectedAccount.id), this.state.splits)} />
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    selectedAccount: state.selectedAccount
  }
};

const mapDispatchToProps = function(dispatch) {
  return {};
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);
export default App;
