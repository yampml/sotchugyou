import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import App from './App';
// i18n
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
// dashboard css
import "assets/css/material-dashboard-react.css?v=1.8.0";
// redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import notificationsReducer from "./store/reducers/notifications"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const hist = createBrowserHistory();

ReactDOM.render(
  <Suspense fallback="loading">
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={hist}>
          <App />
        </Router>
      </Provider>
    </I18nextProvider>
  </Suspense>,
  document.getElementById("root")
);

