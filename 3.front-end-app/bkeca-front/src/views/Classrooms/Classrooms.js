/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, NavLink } from "react-router-dom";
// core components
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import classroomsImg from "assets/img/cover.jpeg";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";

import ReactPaginate from "react-paginate";

import { user_instance as axios } from '../../apiCaller';

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

export default function Classrooms(props) {
  const classes = useStyles();
  const [classrooms, setClassrooms] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [perPage, setPerPage] = React.useState(2);
  const [currentPage, setCurrentPage] = React.useState(0);
  // const [selectedClassroom, setSelectedClassroom] = React.useState(null);
  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    const url = "/classrooms";
    const classroomsData = await axios.get(url)
      .then(res => {
        return res.data.classrooms;
      })
      setClassrooms(classroomsData);
  };

  const handlePageClick = selected => {
    setCurrentPage(selected.selected);
  };

  const handleExpandClick = index => {
    let classrooms2 = [...classrooms];
    let isExpanded = classrooms2[index].expanded;
    classrooms2[index].expanded = !isExpanded;
    setClassrooms(classrooms2);
  };

  const currentUser = props.currentUser;
  return (
    <>
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
            {classrooms.slice(currentPage*perPage, currentPage*perPage + perPage).map((classroom, i) => {
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
                      // onClick={() => {setSelectedClassroom(i)}}
                    // className={classes.item}
                    // activeClassName="active"
                    // key={"childNav" + childKey}
                    >
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                          >
                            A
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
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
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {classroom.summarizedContent}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: classroom.expanded
                        })}
                        onClick={() => handleExpandClick(i)}
                        aria-expanded={classroom.expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={classroom.expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      {/* <CardContent>
                        {classroom.content.map((naiyou, i2) => {
                          return (
                            <Typography paragraph key={`naiyou${i2}`}>
                              {naiyou.naiyou}
                            </Typography>
                          );
                        })}
                      </CardContent> */}
                    </Collapse>
                  </Card>
                </GridItem>
              );
            })}
            <GridItem xs={12} sm={12} md={12} style={{ paddingTop: "1rem" }}>
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={classrooms.length / perPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />

            </GridItem>
          </GridContainer>
        </>
      ) : null}
    </>
  );
}
