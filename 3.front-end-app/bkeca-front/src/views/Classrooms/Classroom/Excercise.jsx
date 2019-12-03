/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "@material-ui/core/Button";
import { red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { NavLink } from "react-router-dom";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";
import ExpansionPanel from "components/ExpansionPanel/ExpansionPanel.js";

import FullScreenDialog from "components/FullScreenDialog/FullScreenDialog";
import AlertDialogSlide from "components/AlertDialogSlide/AlertDialogSlide";

import { user_instance as axios } from '../../../apiCaller';

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

// let newQuesData = {
//   type: "Trac nghiem",
//   ques: "",
//   choices: [""],
//   ans: 0
// };

export default function Exercises(props) {
  const classes = useStyles();

  const [classroomData, setClassroomData] = React.useState(null);

  const [exDialogOpen, setExDialogOpen] = React.useState(false);
  const [exIndex, setExIndex] = React.useState(null);
  const [exData, setExData] = React.useState(null);
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [userChoices, setUserChoices] = React.useState(Array(100).fill(""));

  React.useEffect(() => {
    loadClassroom();
  }, []);

  const loadClassroom = async () => {
    const url = `/classroom/${props.match.params.id}/examAllInfo`;
    const classroomData = await axios.get(url)
      .then(res => {
        return res.data.classroomData;
      })
    setClassroomData(classroomData);
    // console.log(classroomData);
  };

  const handleClose = () => {
    setExDialogOpen(false);
  };

  const handleChangeKotae = (event, shitsumonIndex) => {
    let newUserChoices = [...userChoices];
    newUserChoices[shitsumonIndex] = event.target.value;
    setUserChoices(newUserChoices);
  };

  const handleConfirmDialogClickOpen = (examIndex) => {
    setExIndex(examIndex);
    setConfirmDialog(true);
  };

  const handleConfirmDialogBtnOk = () => {
    handleConfirmDialogClickClose();
    setExData(classroomData.Exams[exIndex])
    let newUserChoices = Array(classroomData.Exams[exIndex].Questions.length).fill(`question-${null}-choice-${null}`);
    setUserChoices(newUserChoices);
    setExDialogOpen(true);
  }

  const handleConfirmDialogClickClose = () => {
    setConfirmDialog(false);
  };

  const onSubmitExam = () => {
    let answerData = [];
    for (let i = 0; i < userChoices.length; i++) {
      let ans = userChoices[i].split('-');
      let choiceIndex = null;
      try {
        choiceIndex = Number.parseInt(ans[3]);

      } catch {

      }
      answerData.push({
        question_id: exData.Questions[i].question_id,
        choice_id: choiceIndex ? exData.Questions[i].Choices[choiceIndex].choice_id : null
      });

    }
    let submitData = {
      exam_id: exData.exam_id,
      classroom_id: exData.classroom_id,
      user_id: props.currentUser,
      answerData
    }
    /* 
    {"exam_id":1,"classroom_id":1,"user_id":"1","answerData":[{"question_id":1,"choice_id":3},{"question_id":2,"choice_id":6},{"question_id":3,"choice_id":10},{"question_id":4,"choice_id":null},{"question_id":5,"choice_id":19},{"question_id":6,"choice_id":null},{"question_id":7,"choice_id":null},{"question_id":8,"choice_id":null},{"question_id":9,"choice_id":null},{"question_id":10,"choice_id":null},{"question_id":11,"choice_id":null},{"question_id":12,"choice_id":null},{"question_id":13,"choice_id":null},{"question_id":14,"choice_id":null},{"question_id":15,"choice_id":null},{"question_id":16,"choice_id":null}]}
    */
    const url = "/submitExam";
    axios.post(url, submitData)
      .then(result => {
        console.log(result);
      })
  }

  const clearExam = () => {

  }

  const examDialog = () => {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={11}>
          <Paper className={classes.paperRoot}>
            {exData != null ? exData.Questions.map((question, questionIndex) => {
              return (
                <React.Fragment key={"frag-question-" + questionIndex}>
                  <GridContainer>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                      key={"question" + questionIndex}
                    >
                      <FormLabel component="legend">
                        Question {questionIndex + 1}. {question.description}
                      </FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={userChoices[questionIndex]}
                        onChange={e => handleChangeKotae(e, questionIndex)}
                      >
                        {question.Choices.map((choice, choiceIndex) => {
                          return (
                            <FormControlLabel
                              value={`question-${questionIndex}-choice-${choiceIndex}`}
                              control={<Radio />}
                              label={choice.description}
                              key={"choice" + choiceIndex}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </GridContainer>
                </React.Fragment>
              );
            }) : null}
          </Paper>
        </GridItem>
      </GridContainer>
    )
  }

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
        {/* <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <Fab
              color="primary"
              variant="extended"
              aria-label="add"
              className={classes.fab}
            // onClick={handleConfirmDialogBtnOk}
            >
              <AddIcon className={classes.extendedIcon} />
              Create
            </Fab>
          </GridItem>
        </GridContainer> */}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            {
              classroomData != null ?
                classroomData.Exams.map((exam, index) => {
                  return (
                    <ExpansionPanel
                      onTakeExam={() => handleConfirmDialogClickOpen(index)}
                      examData={exam}
                      key={"exam-" + index}
                    />
                  )
                })
                :
                null
            }
            <AlertDialogSlide
              open={confirmDialog}
              handleClose={handleConfirmDialogClickClose}
              handleOk={handleConfirmDialogBtnOk}
              message={"Are you sure you want to take the exam now?"}
            />
          </GridItem>
        </GridContainer>
      </GridContainer>
      {exData != null ?
        <FullScreenDialog
          title={exData.name}
          duration={exData.duration}
          exDialogOpen={exDialogOpen}
          handleClose={handleClose}
          submitBtn={<Button color="inherit" onClick={onSubmitExam}>SUBMIT</Button>}
        >
          {classroomData != null ? examDialog() : null}
        </FullScreenDialog> : null}
    </>
  );
}
