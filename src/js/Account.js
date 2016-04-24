import React from 'react';

var Account = React.createClass({
  render: function() {
    return (
      <div>
        <a href onClick={this.props['click-handler']} id={'acct-' + this.props.account.id.toString()}>{this.props.account.name}</a>
      </div>
    );
  }
});

export default Account;
