import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ledgerStore } from './LedgerStore';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

ReactDOM.render(
  (<MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={ledgerStore}>
      <App />
    </Provider>
  </MuiThemeProvider>),
  document.getElementById('app')
);