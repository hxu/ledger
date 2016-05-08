import _ from 'lodash';
import React from 'react';
import SplitRow from './SplitRow';


export default class AccountDetail extends React.Component {
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
