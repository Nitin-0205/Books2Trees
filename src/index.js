import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store ,{Persistor} from "./Redux/store";
import {PersistGate} from "redux-persist/es/integration/react"

ReactDOM.render(
  <Provider store = {store}>
    <PersistGate loading = {null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
