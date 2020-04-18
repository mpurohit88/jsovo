import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import reducer from "./Reducer/photo";

import App from "./App";

const photos = createStore(reducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={photos}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
