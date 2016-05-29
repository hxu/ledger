import { addAccountAction, selectAccountAction, removeAccountAction } from './LedgerStore';
import AccountList from './AccountList';
import { connect } from 'react-redux';


const mapStateToProps = function(state) {
  return {
    accounts: state.accounts
  }
};

const mapDispatchToProps = function(dispatch) {
  return {
    addHandler: (acct) => {
      dispatch(addAccountAction(acct));
    },
    selectHandler: (acct, e) => {
      e.preventDefault();
      dispatch(selectAccountAction(acct));
    },
    removeHandler: (acct, e) => {
      e.preventDefault();
      dispatch(removeAccountAction(acct));
    }
  };
};

const AccountListContainer = connect(mapStateToProps, mapDispatchToProps)(AccountList);

export default AccountListContainer;

