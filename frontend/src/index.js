import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";


import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from './store';
import {setUser} from "./actions/userActions";

const token = sessionStorage.getItem('token');
if (token && token !== 'undefined' && token !== '') {
  store.dispatch(setUser(token))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
