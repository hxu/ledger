import React from 'react';
import data from './data';
import CONSTANTS from './constants';
import Account from './Account';

var AccountList = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.accounts.map(function(acct) {
          return <Account key={acct.id} account={acct} />
        })}
      </div>
    )
  }
});

var App = React.createClass({
  getInitialState: function() {
    console.log(data);
    return Object.assign({}, data);
  },
  
  render: function() {
    return (
      <div>
        <div>Hello World</div>
        <div><pre>{JSON.stringify(this.state)}</pre></div>
        <AccountList accounts={this.state.accounts} />
      </div>
    );
  }
});

export default App;