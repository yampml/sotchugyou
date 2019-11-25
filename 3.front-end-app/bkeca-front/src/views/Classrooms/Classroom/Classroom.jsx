/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { NavLink } from "react-router-dom";

import GridContainer from "components/Grid/GridContainer";
import classroomsImg from "assets/img/cover.jpeg";
import GridItem from "components/Grid/GridItem.js";
import ReactPaginate from "react-paginate";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    padding: theme.spacing(3, 2)
  },
  card: {
    // maxWidth: 345,
    // padding: "0 0 1rem 0 !important"
  },
  media: {
    height: 0,
    paddingTop: "32.25%" // 16:9
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
  gridContainerWidth100: {
    width: "100% !important"
  },
  reactPaginateUl: {
    display: "inline-block",
    paddingLeft: "15px",
    paddingRight: "15px"
  },
  reactPaginateLi: {
    display: "inline-block",
    float: "left"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: 0,
    width: "100%"
  },
  greyHr: {
    height: "2px",
    color: "grey",
    backgroundColor: "grey",
    border: "none"
  },
  activelink: {
    color: "#2196f3",
    fontWeight: "bold"
  },
  title: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent"
    }
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

export default function Classroom(props) {
  const classes = useStyles();

  return (
    <>
      <GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <NavLink
              exact
              to={"/admin/classrooms/" + props.match.params.id}
              activeClassName={classes.activelink}
            >
              <Button color="primary" className={[classes.title].join(" ")}>
                Timeline
              </Button>
            </NavLink>
            <NavLink
              exact
              to={"/admin/classrooms/" + props.match.params.id + "/ex/"}
              activeClassName={classes.activelink}
            >
              <Button color="primary" className={classes.title}>
                Exercises
              </Button>
            </NavLink>
            <NavLink
              exact
              to={"/admin/classrooms/" + props.match.params.id + "/all/"}
              activeClassName={classes.activelink}
            >
              <Button color="primary" className={classes.title}>
                People
              </Button>
            </NavLink>
            <NavLink
              exact
              to={"/admin/classrooms/" + props.match.params.id + "/gr/"}
              activeClassName={classes.activelink}
            >
              <Button color="primary" className={classes.title}>
                Grades
              </Button>
            </NavLink>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://www.fulcrumlabs.ai/wp-content/uploads/2017/09/learning-culture.gif"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Lớp học của Híu
                </Button>
                <Button size="small" color="primary">
                  Thầy giáo Be
                </Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={2}>
            <Paper className={classes.paperRoot}>
              <Typography variant="h5" component="h3">
                This is a sheet of paper.
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your
                application.
              </Typography>
            </Paper>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader title="Đăng tin mới cmn" />
                <CardContent>
                  <CKEditor
                    editor={ClassicEditor}
                    data={props.match.params.id}
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </CardContent>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader title="Tin mới cmn" />
                <CardContent>
                  <Typography>Messi sut sml Ronaldo</Typography>
                </CardContent>
                <hr className={classes.greyHr}></hr>
                <CardActions>
                  <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="Comment something di dude"
                    margin="normal"
                  />
                  <Button size="small" color="primary">
                    Abort
                  </Button>
                  <Button size="small" color="primary">
                    Post
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader title="Tin mới cmn" />
                <CardContent>
                  <Typography>Messi sut sml Ronaldo</Typography>
                </CardContent>
                <hr className={classes.greyHr}></hr>
                <CardActions>
                  <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="Comment something di dude"
                    margin="normal"
                  />
                  <Button size="small" color="primary">
                    Abort
                  </Button>
                  <Button size="small" color="primary">
                    Post
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          </GridItem>
        </GridContainer>
      </GridContainer>
    </>
  );
}
