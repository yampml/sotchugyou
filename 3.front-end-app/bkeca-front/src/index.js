import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.jsx";
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer
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
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </Router>
      </Provider>
    </I18nextProvider>
  </Suspense>,
  document.getElementById("root")
);
