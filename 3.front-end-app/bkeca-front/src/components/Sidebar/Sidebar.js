/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Divider } from "@material-ui/core";


const paddingNested = {
  paddingLeft: '3rem',
}

class Sidebar extends React.Component {

  constructor(props) {
    super()
  }

  state = {
    open: false,
    collapseList: new Array(100).fill(false)
  }

  handleClick = (key) => {

    // this.setState(state => ({ open: !state.open }));
    let c = this.state.collapseList.slice();
    c[key] = !c[key]
    this.setState({ collapseList: c })
  };


  render() {
    const { ...props } = this.props;
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
      return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
    const { classes, color, logo, image, logoText, routes } = props;
    var links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          var activePro = " ";
          var listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + prop.path)
          });
          if (prop.hide) return null;
          if (prop.slash) {
            return <Divider />;
          }
          if (prop.redirect) return null;
          if (prop.childLink && prop.collapse) {
            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
            });
            return (
              <div key={key} >
                <ListItem button className={classes.itemLink + listItemClasses} onClick={() => this.handleClick(key)} key={key}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                      <prop.icon
                        className={classNames(classes.itemIcon, whiteFontClasses)}
                      />
                    )}
                  <ListItemText
                    primary={prop.sidebarName}
                    secondary={this.state.collapseList[key] ? <ExpandLess /> : <ExpandMore />}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                  
                </ListItem>
                <Collapse in={this.state.collapseList[key]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {
                      prop.childLink.map((childProp, childKey) => {
                        var listItemClasses;
                        listItemClasses = classNames({
                          [" " + classes[color]]: activeRoute(childProp.path)
                        });
                        const whiteFontClasses = classNames({
                          [" " + classes.whiteFont]: activeRoute(childProp.path)
                        });
                        return (<NavLink
                          to={childProp.path}
                          className={classes.item}
                          activeClassName="active"
                          key={"childNav" + childKey}
                        >
                          <ListItem button className={classes.itemLink + listItemClasses} style={paddingNested} key={"childListItem" + childKey}>
                            <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                              {typeof childProp.icon === "string" ? (
                                <Icon>{childProp.icon}</Icon>
                              ) : (
                                  <childProp.icon />
                                )}
                            </ListItemIcon>
                            <ListItemText
                              primary={childProp.sidebarName}
                              className={classes.itemText + whiteFontClasses}
                              disableTypography={true}
                            />
                          </ListItem>
                        </NavLink>
                        )
                      }
                      )
                    }
                  </List>
                </Collapse>
              </div>
            )
          } else {
            listItemClasses = classNames({
              [" " + classes[color]]: activeRoute(prop.layout + prop.path)
            });
            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
            });
            return (
              <NavLink
                to={prop.layout + prop.path}
                className={activePro + classes.item}
                activeClassName="active"
                key={key}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(classes.itemIcon, whiteFontClasses)}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                      <prop.icon
                        className={classNames(classes.itemIcon, whiteFontClasses)}
                      />
                    )}
                  <ListItemText
                    primary={prop.name}
                    className={classNames(classes.itemText, whiteFontClasses)}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
          }
        })}
      </List>
    );
    var brand = (
      <div className={classes.logo}>
        <a
          href="https://www.creative-tim.com?ref=mdr-sidebar"
          className={classNames(classes.logoLink)}
          target="_blank"
        >
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </a>
      </div>
    );
    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="right"
            open={props.open}
            classes={{
              paper: classNames(classes.drawerPaper)
            }}
            onClose={props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              <AdminNavbarLinks />
              {links}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classNames(classes.drawerPaper)
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};

export default withStyles(styles)(Sidebar);