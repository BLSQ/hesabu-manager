import "./index.css";
import "es6-shim";

import { HashRouter } from "react-router-dom";
import LogRocket from "logrocket";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TokenProvider from "./lib/TokenProvider";
import store from "./store";

if (process.env.NODE_ENV === "production") {
  LogRocket.init(process.env.REACT_APP_LOG_ROCKET_APP_ID);
}
const app = (
  <Provider store={store}>
    <TokenProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </TokenProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
