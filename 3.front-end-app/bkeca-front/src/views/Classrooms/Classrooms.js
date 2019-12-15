/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, NavLink } from "react-router-dom";
// core components
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

import classroomsImg from "assets/img/cover.jpeg";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";

import { user_instance as axios } from '../../apiCaller';

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

// redux
import { connect } from "react-redux";
import * as actions from "store/actions/actionIndexes";
import { CircularProgress } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  gridPadding: {
    padding: "1rem 0 0 1rem !important"
  },
  reactPaginateUl: {
    display: "inline-block",
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  reactPaginateLi: {
    display: "inline-block",
    float: "left"
  }
}));

const theme = createMuiTheme();

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enqueueSnackbar: (notification) => dispatch(actions.enqueueSnackbar(notification)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Classrooms(props) {
  const classes = useStyles();
  const [classrooms, setClassrooms] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [perPage, setPerPage] = React.useState(8);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalClassroom, setTotalClassroom] = React.useState(0);
  // const [selectedClassroom, setSelectedClassroom] = React.useState(null);
  useEffect(() => {
    loadClassrooms();
  }, [currentPage]);

  const loadClassrooms = async () => {
    setIsLoading(true);
    const url = `/user/${props.currentUser}/classrooms?page=${currentPage}&perPage=${perPage}`;
    const classroomsData = await axios.get(url)
      .then(res => {
        setTotalClassroom(res.data.totalItems)
        setClassrooms(res.data.classrooms);
        return res.data.classrooms;
      })
    console.log(classroomsData)
    setIsLoading(false);
  };

  const handlePageClick = selected => {
    setCurrentPage(selected / perPage);
  };

  const currentUser = props.currentUser;
  return (
    <>
      {isLoading ? <CircularProgress /> : null}
      <Switch>
        {props.childLink.map((prop, key) => {
          return (
            <Route
              path={prop.layout + prop.path}
              render={props => (
                <prop.component {...props} currentUser={currentUser} childLink={prop.childLink} />
              )}
              key={"ClassroomsNumber" + key}
              exact={prop.exact}
              childRoute={prop.childLink}
            />
          );
        })}
      </Switch>
      {props.location.pathname === "/stu/classrooms" ? (
        <>
          <GridContainer>
            {classrooms.map((classroom, i) => {
              return (
                <GridItem
                  xs={12}
                  sm={12}
                  md={3}
                  key={`classroom${i}`}
                  style={{ paddingTop: "1rem" }}
                >
                  <Card className={classes.card}>
                    <NavLink
                      to={"/stu/classrooms/" + classroom.classroom_id}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            {i + 1}
                          </Avatar>
                        }
                        title={classroom.name}
                        subheader={new Date(classroom.createdAt).toDateString()}
                      />
                    </NavLink>
                    <CardMedia
                      className={classes.media}
                      image={classroomsImg}
                      title={classroom.imgAlt}
                    />
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </GridItem>
              );
            })}
            <GridItem xs={12} sm={12} md={12} style={{ paddingTop: "1rem" }}>
              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Pagination
                  limit={perPage}
                  offset={currentPage * perPage}
                  total={totalClassroom}
                  onClick={(e, selected) => handlePageClick(selected)}
                />
              </MuiThemeProvider>
            </GridItem>
          </GridContainer>
        </>
      ) : null}
    </>
  );
}
)