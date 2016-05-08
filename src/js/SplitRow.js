import React from 'react';
import moment from 'moment';

export default class SplitRow extends React.Component {
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

