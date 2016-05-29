import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ledgerApp, initialState } from './LedgerStore';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
};


let ledgerStore = createStore(ledgerApp, initialState, applyMiddleware(logger));

ReactDOM.render(
  (<Provider store={ledgerStore}>
    <App />
  </Provider>),
  document.getElementById('app')
);