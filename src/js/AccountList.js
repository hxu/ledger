import CONSTANTS from './constants';
import _ from 'lodash';
import React from 'react';
import Account from './Account';


export default class AccountList extends React.Component{
  constructor(props) {
    super(props);
    console.log('Account list');
    console.log(props);
    this.state = {
      newAccount: {
        name: '',
        type: '',
        parent: ''
      }
    };
    this.updateNewAccount = this.updateNewAccount.bind(this);
    this.newAccount = this.newAccount.bind(this);
  }
  
  updateNewAccount(e, property) {
    var base = {};
    base[property] = e.target.value;
    
    var newState = _.assign(_.clone(this.state.newAccount), base);
    this.setState({newAccount: newState});
  }

  newAccount(e) {
    if (this.state.newAccount.type === '') {
      alert('New account type cannot be null');
      return undefined;
    }
    if (this.state.newAccount.name === '') {
      alert('Account name cannot be null');
      return undefined;
    }

    var newAccount = _.clone(this.state.newAccount);
    newAccount.type = parseInt(newAccount.type);
    newAccount.parent = (newAccount.parent === '') ? null : parseInt(newAccount.parent);
    console.log('Creating new account');
    console.log(newAccount)
    this.props['addHandler'](newAccount, e);
    this.setState({newAccount: {name: '', type: this.state.newAccount.type, parent: this.state.newAccount.parent}})
  }
  
  render() {
    // Want all of the accounts with no parent at the front
    var accts = _.orderBy(this.props.accounts, ['type', 'parent', 'name'], ['asc', 'desc', 'asc']);
    var byType = _.groupBy(accts, 'type');
    var byParent = _.groupBy(accts, 'parent');
    var removeHandler = this.props['removeHandler'];
    var selectHandler = this.props['selectHandler'];

    var makeAccount = function(acct, depth) {
      return (
        <Account
          select-handler={(e) => selectHandler(acct, e)}
          remove-handler={(e) => removeHandler(acct, e)}
          depth={depth}
          key={acct.id}
          account={acct} />
      );
    };
    
    var makeAccounts = function(accts, seen, depth) {
      depth = depth || 0;
      seen = seen || new Set([]);
      var res = [];
      _.mapValues(accts, function(acct) {
        if (!seen.has(acct.id)) {
          res.push(makeAccount(acct, depth));
          seen.add(acct.id);
          
          if (acct.id in byParent) {
            res.push(...makeAccounts(byParent[acct.id], seen, depth + 1));
          }
        }
      });
      return res;
    };

    return (
      <div>
        <h5>Assets</h5>
        {makeAccounts(byType[CONSTANTS.ACCT_TYPE.ASSET])}
        <h5>Liabilities</h5>
        {makeAccounts(byType[CONSTANTS.ACCT_TYPE.LIABILITY])}
        <h5>Equity</h5>
        {makeAccounts(byType[CONSTANTS.ACCT_TYPE.EQUITY])}
        <h5>Income</h5>
        {makeAccounts(byType[CONSTANTS.ACCT_TYPE.INCOME])}
        <h5>Expense</h5>
        {makeAccounts(byType[CONSTANTS.ACCT_TYPE.EXPENSE])}
        <h5>Add an account</h5>
        <input type="text" value={this.state.newAccount.name} placeholder="Name" onChange={(e) => this.updateNewAccount(e, 'name')}></input>
        Type
        <select value={this.state.newAccount.type} onChange={(e) => this.updateNewAccount(e, 'type')}>
          <option value="">Account type</option>
          {_.map(CONSTANTS.ACCT_TYPE, function(v, k) {
            var text = _.capitalize(k);
            return (
              <option value={v.toString()} key={v}>
                {text}
              </option>
            );
          })}
        </select>
        Parent
        <select value={this.state.newAccount.parent} onChange={(e) => this.updateNewAccount(e, 'parent')}>
          <option value="">Select parent</option>
          {(() => { 
            var self = this;
            return _.map(accts, function(acct) {
            // Only include accounts of the same type as the selected acount type
            if (acct.type.toString() === self.state.newAccount.type) {
              return (
                <option value={acct.id.toString()} key={acct.id}>
                  {acct.name}
                </option>
              )
            }
          })})()}
        </select>
        <button onClick={this.newAccount}>Add</button>
      </div>
    )
  }
}

AccountList.defaultProps = {
  depth: 0
};
