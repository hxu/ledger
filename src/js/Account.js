import React from 'react';

var Account = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.account.name}
      </div>
    );
  }
});

export default Account;
