import CONSTANTS from './constants';
import _ from 'lodash';
import React from 'react';
import Account from './Account';

export default class AccountList extends React.Component{
  constructor(props) {
    super(props);
  }
  
  render() {
    // Want all of the accounts with no parent at the front
    var accts = _.orderBy(this.props.accounts, ['parent', 'name'], ['desc', 'asc']);
    var byType = _.groupBy(accts, 'type');
    var byParent = _.groupBy(accts, 'parent');
    var selectHandler = this.props['select-handler'];
    var removeHandler = this.props['remove-handler'];

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
      </div>
    )
  }
}
AccountList.defaultProps = {
  depth: 0
};
