import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ledgerStore } from './LedgerStore';
import { Provider } from 'react-redux';


ReactDOM.render(
  (<Provider store={ledgerStore}>
    <App />
  </Provider>),
  document.getElementById('app')
);