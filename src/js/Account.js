import React from 'react';

class Account extends React.Component{
  render() {
    return (
      <div>
        {_.range(this.props.depth).map(() => '*')}
        <a href onClick={this.props['select-handler']} id={'acct-' + this.props.account.id.toString()}>{this.props.account.name}</a>
        <span> - </span>
        <a href onClick={this.props['remove-handler']}>remove</a>
      </div>
    );
  }
};

export default Account;
