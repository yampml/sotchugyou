/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
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
import { NavLink } from "react-router-dom/cjs/react-router-dom";

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

let sampleData = [
  {
    title: "someText",
    subheader: "someText",
    imgAlt: "someTExt",
    summarizedContent: "someText",
    content: [
      {
        naiyou:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        naiyou:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
      }
    ],
    expanded: false
  },
  {
    title: "someText2",
    subheader: "someText2",
    imgAlt: "someTExt2",
    summarizedContent: "someText2",
    content: [
      {
        naiyou: "someText2"
      },
      {
        naiyou: "someText2"
      }
    ],
    expanded: false
  },
  {
    title: "someText3",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText4",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText5",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText6",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText7",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText8",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText9",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText10",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText11",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  },
  {
    title: "someText12",
    subheader: "someText3",
    imgAlt: "someTExt3",
    summarizedContent: "someText3",
    content: [
      {
        naiyou: "someText3"
      },
      {
        naiyou: "someText3"
      }
    ],
    expanded: false
  }
];

export default function Classrooms(props) {
  console.log("foobar", props)
  const classes = useStyles();
  const [classrooms, setClassrooms] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [perPage, setPerPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(0);

  useEffect(() => {
    loadClassrooms();
  }, [currentPage]);

  const loadClassrooms = () => {
    setClassrooms(
      sampleData.slice(currentPage * perPage, currentPage * perPage + perPage)
    );
  };

  const handlePageClick = selected => {
    setCurrentPage(selected.selected);
    loadClassrooms();
  };

  const handleExpandClick = index => {
    let classrooms2 = [...classrooms];
    let isExpanded = classrooms2[index].expanded;
    classrooms2[index].expanded = !isExpanded;
    setClassrooms(classrooms2);
  };

  return (
    <>
      <Switch>
        {props.childLink.map((prop, key) => {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={"ClassroomsNumber" + key}
              exact={prop.exact}
              childRoute={prop.childLink}
            />
          );
        })}
      </Switch>
      {props.location.pathname === "/admin/classrooms" ? (
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
                      to={"/admin/classrooms/" + i}
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
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton aria-label="settings">
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={classroom.title}
                        subheader={classroom.subheader}
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
                      <CardContent>
                        {classroom.content.map((naiyou, i2) => {
                          return (
                            <Typography paragraph key={`naiyou${i2}`}>
                              {naiyou.naiyou}
                            </Typography>
                          );
                        })}
                      </CardContent>
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
                pageCount={sampleData.length / perPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
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
