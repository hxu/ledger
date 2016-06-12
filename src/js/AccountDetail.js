import _ from 'lodash';
import React from 'react';
import SplitRow from './SplitRow';
import { connect } from 'react-redux';
import { getChildrenForAccount, getSplitsForAccount } from './LedgerStore';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';


class _AccountDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSplit: {
        date: null,
        amount: '',
        description: '',
        transfer: '',
      }
    };
    
    this.updateNewSplit = this.updateNewSplit.bind(this);
  }

  updateNewSplit(e, property) {
    console.log('foo');
    var base = {};
    base[property] = (_.isNil(e.target)) ? e : e.target.value;
    
    var newState = _.assign(_.clone(this.state.newSplit), base);
    this.setState({newSplit: newState});
  }
  
  newSplit(e) {
    // Validate the split
    // Create a transaction for the split
    // Create the opposite split
  }
  
  removeSplit(e) {
    // If the split's transaction is balanced and has only one other split, then we should remove that split
    // as well.
  }

  render() {
    var splits = _.sortBy(_.values(this.props.splits), 'timestamp');
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
                Transfer
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
            <tr>
              <td>*</td>
              <td>
                <DatePicker id="newSplitDate"
                            container="inline"
                            value={this.state.newSplit.date}
                            onChange={(e, date) => this.updateNewSplit(date, 'date')} />
              </td>
              <td><input type="text" value={this.state.newSplit.description} onChange={(e) => this.updateNewSplit(e, 'description')} placeholder="description" /></td>
              <td>
                <select value={this.state.newSplit.transfer} onChange={(e) => this.updateNewSplit(e, 'transfer')}>
                  <option value=""></option>
                  {(() => {
                    return _.map(this.props.accounts, function(acct) {
                      return (
                        <option value={acct.id.toString()} key={acct.id}>
                          {acct.name}
                        </option>
                      )
                    })
                  })()}
                </select>
              </td>
              <td><input type="text" value={this.state.newSplit.amount} onChange={(e) => this.updateNewSplit(e, 'amount')} placeholder="amount" /></td>
              <td><button>Add</button></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = function(state, ownProps) {
  var selectedAcctId = ownProps.account;
  var childAccounts = getChildrenForAccount(selectedAcctId, state.accounts);
  return {
    accounts: state.accounts,
    splits: getSplitsForAccount(_.concat(childAccounts, selectedAcctId), state.splits)
  }
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
  }
};

const AccountDetail = connect(mapStateToProps, mapDispatchToProps)(_AccountDetail);

export default AccountDetail;
