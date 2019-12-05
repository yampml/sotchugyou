import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/actionIndexes";
import Notifier from "components/Notifier/Notifier";
// core components
import StudentPage from "layouts/StudentPage.js";
import Auth from "layouts/Auth.jsx";
import { SnackbarProvider } from 'notistack';
import { Portal } from "@material-ui/core";

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
        <Portal><Notifier /></Portal>
        <Switch>
            { !props.isAuthenticated ? <Route path="/auth" component={Auth} /> : null}
            { props.isAuthenticated ? <Route path="/stu" component={StudentPage} />: null}
            { !props.isAuthenticated ? <Redirect from="/" to="/auth" /> : null}
            { props.isAuthenticated ? <Redirect from="/" to="/stu/dashboard" /> : null}
        </Switch>
    </SnackbarProvider>

}
))