import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";
import axios from "axios";

// Development only axios helpers!
if (process.env.NODE_ENV == "development") {
  window.axios = axios;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
