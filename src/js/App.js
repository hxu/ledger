import React from 'react';
import data from './data';
import CONSTANTS from './constants';
import Account from './Account';

class AccountList extends React.Component{
  render() {
    console.log(this.props);
    var clickHandler = this.props['click-handler'];
    return (
      <div>
        {this.props.accounts.map(function(acct) {
          return <Account click-handler={(e) => clickHandler(acct, e)} key={acct.id} account={acct} />
        })}
      </div>
    )
  }
}

class AccountDetail extends React.Component {
  render() {
    console.log(this.props);
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
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);
    console.log(data);
    this.state = {
      selectedAccount: null,
      data: Object.assign({}, data)
    };
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }
 
  handleAccountClick(acct, e) {
    e.preventDefault();
    console.log('this: ');
    console.log(this);
    console.log('acct: ');
    console.log(acct);
    this.setState({selectedAccount: acct});
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
        <div><pre>{JSON.stringify(this.state)}</pre></div>
        <AccountList accounts={this.state.data.accounts} click-handler={this.handleAccountClick} />
        {(() => {
          if (this.state.selectedAccount) {
            return <div>Selected account: {this.state.selectedAccount.id}</div>
          }
        })()}
        {(() => {
          if (this.state.selectedAccount) {
            return <AccountDetail account={this.state.selectedAccount}/>
          }
        })()}
      </div>
    );
  }
}

export default App;