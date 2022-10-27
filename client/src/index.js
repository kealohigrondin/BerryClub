import React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";

const store = configureStore({
  reducer: reducers,
  // preloadedState: {
  //   auth: { authenticated: localStorage.getItem("token"), errorMessage: "" },
  // },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxThunk),
});
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
