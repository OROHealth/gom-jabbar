import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import './index.css';
import App from './components/App';

import { store, persistor } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
