import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { studentRoutes } from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-bk.jpg";
import logo from "assets/img/reactlogo.png";


import { connect } from "react-redux";
import * as actions from "../store/actions/actionIndexes";

import { useTranslation } from "react-i18next";

let ps;

const switchRoutes = props => {
  const currentUser = props.currentUser;
  return (
    <Switch>
      {studentRoutes.map((prop, key) => {
        if (prop.layout === "/stu") {
          return (
            <Route
              path={prop.layout + prop.path}
              render={props => (
                <prop.component {...props} currentUser={currentUser} childLink={prop.childLink} />
              )}
              // component={() => <prop.component childLink={prop.childLink} />}
              key={key}
              exact={prop.exact}
            />
          );
        }
        return null;
      })}

      <Redirect from="/stu" to="/stu/dashboard" />
    </Switch>
  )
};

const useStyles = makeStyles(styles);

const mapStateToProps = state => {
  return {
    currentUser: state.auth.userId,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    enqueueSnackbar: (notification) => dispatch(actions.enqueueSnackbar(notification)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(function StudentPage({ ...props }) {
  //i18n
  const { t } = useTranslation();
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, ] = React.useState(bgImage);
  const [color, ] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={studentRoutes}
        logoText={t("SideBar.LogoText")}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...props}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={studentRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...props}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes({ ...props })}</div>
          </div>
        ) : (
            <div className={classes.map}>{switchRoutes({ ...props })}</div>
          )}
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
))