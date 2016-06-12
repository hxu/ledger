import _ from 'lodash';
import React from 'react';
import SplitRow from './SplitRow';
import { connect } from 'react-redux';

class _TransactionDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>Transaction Detail</div>
    )
  }
}

const mapStateToProps = function(state, ownProps) {
  return {}
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {}
};

const TransactionDetail = connect(mapStateToProps, mapDispatchToProps)(_TransactionDetail);

export default TransactionDetail;

