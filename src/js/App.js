import React from 'react';
import data from './data';
import CONSTANTS from './constants';

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
      </div>
    );
  }
});

export default App;