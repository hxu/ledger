import _ from 'lodash';
import React from 'react';
import SplitRow from './SplitRow';


export default class AccountDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSplit: {
        date: '',
        amount: '',
        description: ''
      }
    };
    
    this.updateNewSplit = this.updateNewSplit.bind(this);
  }

  updateNewSplit(e, property) {
    var base = {};
    base[property] = e.target.value;
    
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
              <td><input type="text" value={this.state.newSplit.date} onChange={(e) => this.updateNewSplit(e, 'date')} placeholder="date" /></td>
              <td><input type="text" value={this.state.newSplit.description} onChange={(e) => this.updateNewSplit(e, 'description')} placeholder="description" /></td>
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
