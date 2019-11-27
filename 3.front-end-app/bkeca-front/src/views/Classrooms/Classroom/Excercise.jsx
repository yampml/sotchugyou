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
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import NavigationIcon from "@material-ui/icons/Navigation";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { NavLink } from "react-router-dom";

import GridContainer from "components/Grid/GridContainer";
import classroomsImg from "assets/img/cover.jpeg";
import GridItem from "components/Grid/GridItem.js";
import ReactPaginate from "react-paginate";
import ExpansionPanel from "components/ExpansionPanel/ExpansionPanel.js";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Dialog } from "@material-ui/core";
import FullScreenDialog from "components/FullScreenDialog/FullScreenDialog";

const useStyles = makeStyles(theme => ({
  paperRoot: {
    padding: theme.spacing(3, 2)
  },
  formControl: {
    margin: theme.spacing(3)
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
  activelink: {
    color: "#2196f3",
    fontWeight: "bold"
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
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

let sampleExerciseData = [
  {
    type: "Trac nghiem",
    ques: "Kore nani~~?",
    choices: ["Kotae1", "Kotae2", "Kotae3", "Kotae4"],
    ans: 0,
    usrChoice: ""
  },
  {
    type: "Trac nghiem",
    ques: "Kore nani~~? 1",
    choices: ["Kotae1", "Kotae2", "Kotae3", "Kotae4"],
    ans: 0,
    usrChoice: ""
  },
  {
    type: "Trac nghiem",
    ques: "Kore nani~~ 2?",
    choices: ["Kotae1", "Kotae2", "Kotae3", "Kotae4"],
    ans: 0,
    usrChoice: ""
  }
];

let newQuesData = {
  type: "Trac nghiem",
  ques: "",
  choices: [""],
  ans: 0
};

export default function Exercises(props) {
  const classes = useStyles();

  const [exDialogOpen, setExDialogOpen] = React.useState(false);

  const [exData, setExData] = React.useState(sampleExerciseData);

  const [newQues, setNewQues] = React.useState(newQuesData);
  const [addNewQues, setAddNewQues] = React.useState(false);

  const handleClickOpen = () => {
    setExDialogOpen(true);
  };

  const handleClose = () => {
    setExDialogOpen(false);
  };

  const handleChangeKotae = (event, shitsumonIndex) => {
    let newExData = [...exData];
    newExData[shitsumonIndex].usrChoice = event.target.value;
    setExData(newExData);
  };

  const toggleAddNewQuesBtn = () => {
    setAddNewQues(!addNewQues);
  };

  const handleNewQuesChange = (event, args) => {
    console.log(event.target.value);
    console.log(args);
    let newQuesData2 = { ...newQuesData };
    if (args.type === "quesNaiyou") {
      newQuesData2.ques = event.target.value;
    } else if (args.type === "choices") {
      newQuesData2.choices[args.index] = event.target.value;
    } else if (args.type === "answer") {
      newQuesData2.ans = Number.parseInt(event.target.value);
    }
    setNewQues(newQuesData2);
  };

  const handleNewQuesAnsBtn = () => {
    let newQuesData2 = { ...newQuesData, choices: [...newQuesData.choices] };
    newQuesData2.choices.push("");
    setNewQues(newQuesData2);
  };

  const handleAddNewQuesBtnOk = () => {
    let newExData = [...exData];
    newExData.push({
      ...newQues,
      choices: [...newQues.choices],
      usrChoice: ""
    });
    setExData(newExData);
    setNewQues({ ...newQuesData, choices: [""] });
    setAddNewQues(false);
  };

  console.log("Props in Classroom: ", props);
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
              <Button color="primary" className={[classes.title].join(" ")}>
                Timeline
              </Button>
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
            <NavLink
              exact
              to={"/stu/classrooms/" + props.match.params.id + "/all/"}
              activeClassName={classes.activelink}
            >
              <Button color="primary" className={classes.title}>
                People
              </Button>
            </NavLink>
            <NavLink
              exact
              to={"/stu/classrooms/" + props.match.params.id + "/gr/"}
              activeClassName={classes.activelink}
            >
              <Button color="primary" className={classes.title}>
                Grades
              </Button>
            </NavLink>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <Fab
              color="primary"
              variant="extended"
              aria-label="add"
              className={classes.fab}
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.extendedIcon} />
              Create
            </Fab>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <ExpansionPanel />
            <ExpansionPanel />
            <ExpansionPanel />
            <ExpansionPanel />
          </GridItem>
        </GridContainer>
      </GridContainer>
      <FullScreenDialog exDialogOpen={exDialogOpen} handleClose={handleClose}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={11}>
            <Paper className={classes.paperRoot}>
              {exData.map((shitsumon, index) => {
                return (
                  <>
                    <GridContainer>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        key={"shitsumon" + index}
                      >
                        <FormLabel component="legend">
                          Câu {index + 1}. {shitsumon.ques}
                        </FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="gender1"
                          value={shitsumon.usrChoice}
                          onChange={e => handleChangeKotae(e, index)}
                        >
                          {shitsumon.choices.map((choice, choiceIndex) => {
                            return (
                              <FormControlLabel
                                value={choice}
                                control={<Radio />}
                                label={choice}
                                key={"choice" + choiceIndex}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </GridContainer>
                  </>
                );
              })}
              {addNewQues === true ? (
                <GridContainer>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <GridItem xs={12} sm={12} md={12}>
                      <FormLabel component="legend">New Question</FormLabel>
                      <TextField
                        id="standard-name"
                        label="Question naiyou"
                        className={classes.textField}
                        value={newQues.ques}
                        onChange={event =>
                          handleNewQuesChange(event, { type: "quesNaiyou" })
                        }
                        margin="normal"
                      />
                      <TextField
                        id="standard-name"
                        label="Right answer: "
                        className={classes.textField}
                        value={newQues.answer}
                        onChange={event =>
                          handleNewQuesChange(event, { type: "answer" })
                        }
                        margin="normal"
                      />
                      {newQues.choices.map((choice, index) => {
                        return (
                          <TextField
                            key={"newQues" + index}
                            id="standard-name"
                            label={"Choice number: " + (index + 1)}
                            className={classes.textField}
                            value={choice}
                            onChange={event =>
                              handleNewQuesChange(event, {
                                type: "choices",
                                index
                              })
                            }
                            margin="normal"
                          />
                        );
                      })}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <Button
                        color="primary"
                        onClick={handleNewQuesAnsBtn}
                        className={classes.title}
                      >
                        New Choices
                      </Button>
                      <Button
                        color="primary"
                        className={classes.title}
                        onClick={handleAddNewQuesBtnOk}
                      >
                        OK
                      </Button>
                      <Button color="primary" className={classes.title}>
                        Cancel
                      </Button>
                    </GridItem>
                  </FormControl>
                </GridContainer>
              ) : null}
              <GridContainer justify="flex-end">
                <GridItem xs={12} sm={12} md={2}>
                  <Fab
                    color="primary"
                    variant="extended"
                    aria-label="add"
                    className={classes.fab}
                    onClick={toggleAddNewQuesBtn}
                  >
                    <AddIcon />
                  </Fab>
                </GridItem>
              </GridContainer>
            </Paper>
          </GridItem>
        </GridContainer>
      </FullScreenDialog>
    </>
  );
}
