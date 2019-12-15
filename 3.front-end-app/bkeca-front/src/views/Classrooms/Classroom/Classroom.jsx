/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// @material-ui/core components
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
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

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { user_instance as axios } from '../../../apiCaller';

import { blue, purple } from '@material-ui/core/colors';
import { ThemeProvider } from "@material-ui/styles";


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
    color: "#ffffff",
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

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

export default function Classroom(props) {
  const classes = useStyles();

  const [classroom, setClassroom] = React.useState(null);
  useEffect(() => {
    loadClassroom();
  }, []);

  const loadClassroom = async () => {
    const url = "/classroom/" + props.match.params.id;
    const classroomData = await axios.get(url)
      .then(res => {
        return res.data.classroom;
      })
    setClassroom(classroomData);
  };

  return (
    <>
      <GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <NavLink
              exact
              to={"/stu/classrooms/" + props.match.params.id}
              activeClassName={classes.activelink}
            >
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={[classes.title, classes.margin].join(" ")}>
                  Timeline
                </Button>
              </ThemeProvider>
            </NavLink>
            <NavLink
              exact
              to={"/stu/classrooms/" + props.match.params.id + "/ex/"}
              activeClassName={classes.activelink}
            >
              <Button color="primary" className={classes.title}>
                Exercises
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
                  {"" + (classroom == null ? null : classroom.name)}
                </Button>
                <Button size="small" color="primary">
                  {"<Instructor Name Here"}
                </Button>
              </CardActions>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={2}>
            <Paper className={classes.paperRoot}>
              <Typography variant="h5" component="h3">
                No announcement available.
              </Typography>
              <Typography component="p">
                
              </Typography>
            </Paper>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader title="Đăng tin mới" />
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
                <CardHeader title="Hạn cuối bài tập giữa học kỳ" />
                <CardContent>
                  <Typography>Bài tập cuối kì nộp thành 2 bản vào 2 ngày trước khi thi cuối kì</Typography>
                </CardContent>
                <hr className={classes.greyHr}></hr>
                <CardActions>
                  <TextField
                    id="standard-basic"
                    className={classes.textField}
                    label="Comment something"
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
