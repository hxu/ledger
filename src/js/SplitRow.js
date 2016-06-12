import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getDescriptionForSplit, getTransferAccountForSplit } from './LedgerStore';

export default class _SplitRow extends React.Component {
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
          {this.props.description}
        </td>
        <td>
          {this.props.transfer}
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

const mapStateToProps = function(state, ownProps) {
  var transfer = getTransferAccountForSplit(ownProps.split, state.transactions, state.splits);
  return {
    description: getDescriptionForSplit(ownProps.split, state.transactions),
    transfer: (transfer === -1) ? '--- Split Transaction ---' : state.accounts[transfer].name
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {}
};

const SplitRow = connect(mapStateToProps, mapDispatchToProps)(_SplitRow);

export default SplitRow;
