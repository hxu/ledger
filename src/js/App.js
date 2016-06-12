import React from 'react';
import data from './data';
import _ from 'lodash';
import AccountListContainer from './AccountListContainer';
import AccountDetail from './AccountDetail';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';


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
        <AccountListContainer />

        {(() => {
          if (this.props.selectedAccount) {
            return <div>Selected account: {this.props.selectedAccount}</div>
          }
        })()}
        
        {(() => {
          if (this.props.selectedAccount) {
            return <AccountDetail account={this.props.selectedAccount} />
          }
        })()}

        {(() => {
          if (this.props.selectedTransaction) {
            return <TransactionDetail transaction={this.props.selectedTransaction} />
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    selectedAccount: state.selectedAccount,
    selectedTransaction: state.selectedTransaction
  }
};

const mapDispatchToProps = function(dispatch) {
  return {};
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);
export default App;
