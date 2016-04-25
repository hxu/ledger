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
          return <Account click-handler={clickHandler} key={acct.id} account={acct} />
        })}
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
 
  handleAccountClick(e) {
    e.preventDefault();
    console.log('this: ');
    console.log(this);
    console.log('event: ');
    console.log(e);
    console.log(e.target);
    this.setState({selectedAccount: e.target.key});
  }
  
  render() {
    return (
      <div>
        <div>Hello World</div>
        <div><pre>{JSON.stringify(this.state)}</pre></div>
        <AccountList accounts={this.state.data.accounts} click-handler={this.handleAccountClick} />
        <div>Selected account: {this.state.selectedAccount}</div>
      </div>
    );
  }
}

export default App;