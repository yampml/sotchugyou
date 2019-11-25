import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/actionIndexes";
import Notifier from "components/Notifier/Notifier";
// core components
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.jsx";
import { SnackbarProvider } from 'notistack';

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState()),
    };
};

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
    };
  };

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(function App(props) {

    React.useEffect(() => {
        props.onAuthCheckState();        
        // console.log("Is authenticated?: ", props.isAuthenticated);
    });
    
    return <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
            vertical: 'top', // top; bottom
            horizontal: 'right', // left; center; right
        }}>
        <Notifier />
        <Switch>
            { !props.isAuthenticated ? <Route path="/auth" component={Auth} /> : null}
            { props.isAuthenticated ? <Route path="/admin" component={Admin} />: null}
            { !props.isAuthenticated ? <Redirect from="/" to="/auth" /> : null}
            { props.isAuthenticated ? <Redirect from="/" to="/admin/dashboard" /> : null}
        </Switch>
    </SnackbarProvider>

}
))