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
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import { NavLink } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";
import ExpansionPanel from "components/ExpansionPanel/ExpansionPanel.js";

import FullScreenDialog from "components/FullScreenDialog/FullScreenDialog";
import AlertDialogSlide from "components/AlertDialogSlide/AlertDialogSlide";
import CancelIcon from '@material-ui/icons/Cancel';
import { user_instance as axios } from '../../../apiCaller';
import Chip from "@material-ui/core/Chip";
import { blue, purple } from '@material-ui/core/colors';
import { ThemeProvider } from "@material-ui/styles";
// redux
import { connect } from "react-redux";
import * as actions from "store/actions/actionIndexes";

// pagination
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import FormDialog from "components/FormDialog/FormDialog";

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
    color: "#ffffff",
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

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
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
)(function Exercises(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(false);
  const [classroomData, setClassroomData] = React.useState(null);
  const [exDialogOpen, setExDialogOpen] = React.useState(false);
  const [exIndex, setExIndex] = React.useState(null); //exam_id
  const [exData, setExData] = React.useState(null);
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [userChoices, setUserChoices] = React.useState(Array(100).fill(""));
  const [showingExamRes, setShowingExamRes] = React.useState(false);
  const [examResult, setExamResult] = React.useState(false);
  const [examStartTime, setExamStartTime] = React.useState(null);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [perPage, setPerPage] = React.useState(4);

  const [passwordDialog, setPasswordDialog] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const findObjectInArrayByAttr = (arr, key, value) => {
    return arr.filter(item => item[key] === value)[0];
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlePasswordDialogClose = () => {
    setPasswordDialog(false);
    clearExam();
  }

  const handlePasswordDialogOpen = (exam_id) => {
    setPasswordDialog(true);
    setExIndex(exam_id);
    setExData(findObjectInArrayByAttr(classroomData.Exams, "exam_id", exam_id));
  }

  const handleSendToBlockchain = async () => {
    setIsLoading(true);
    console.log("SELECTING EXAM INDEX: ", exIndex)
    console.log("CURRENT CLASSROOM DATA: ", classroomData)
    const responseCheckPwd = await axios.post(`/user/${props.currentUser.user_id}/checkUserPassword`, {
      pwd: password
    });
    console.log(responseCheckPwd.data.isEqual)
    let selectedExamID = findObjectInArrayByAttr(classroomData.Exams, "exam_id", exIndex).exam_id
    if (responseCheckPwd.data.isEqual) {
      const responseSendToBLC = await axios.post(`/user/${props.currentUser.user_id}/exam/${selectedExamID}/sendExamResultToBlockchain`, {
        cert: props.currentUser.cert,
        priv_key: props.currentUser.priv_key,
        pwd: password
      });

      handlePasswordDialogClose();
      
      props.enqueueSnackbar({
        message: "Data sent to Blockchain successfully!",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
          autoHideDuration: 2000,
          action: key => (
            <CancelIcon onClick={() => props.closeSnackbar(key)}>X</CancelIcon>
          ),
        }
      });
      props.history.push(props.history.location.pathname);
    } else {
      props.enqueueSnackbar({
        message: "Something happened! Password is not truth!",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
          autoHideDuration: 2000,
          action: key => (
            <CancelIcon onClick={() => props.closeSnackbar(key)}>X</CancelIcon>
          ),
        }
      });

    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    loadClassroom();
  }, []);

  const loadClassroom = async () => {
    setIsLoading(true);
    const url = `/classroom/${props.match.params.id}/examAllInfo`;
    const classroomData = await axios.get(url)
      .then(res => {
        return res.data.classroomData;
      })
      .catch(err => {
        props.enqueueSnackbar({
          message: (err.response.data ? err.response.data.message : "") + " Please contact admin for furthur information.",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
            autoHideDuration: 2000,
            action: key => (
              <CancelIcon onClick={() => props.closeSnackbar(key)}>X</CancelIcon>
            ),
          }
        });
      })
    setClassroomData(classroomData);
    setIsLoading(false);
    console.log("Exam All Info:", classroomData);
  };

  const loadExamResult = (user_id, exam_id) => {
    // exData.exam_id, props.currentUser.user_id
    const url = `/user/${user_id}/exam/${exam_id}/getStudentExamResult`;
    const resultData = axios.get(url)
      .then(result => {
        setExamResult(result.data.resultData);
      })
  }

  const handlePageClick = (selected) => {
    console.log(selected / perPage)
    setCurrentPage(selected / perPage)
  }

  const handleClose = () => {
    setExDialogOpen(false);
  };

  const handleChangeKotae = (event, shitsumonIndex) => {
    let newUserChoices = [...userChoices];
    newUserChoices[shitsumonIndex] = event.target.value;
    setUserChoices(newUserChoices);
  };

  const handleConfirmDialogClickOpen = (exam_id) => {
    let selectingExam = findObjectInArrayByAttr(classroomData.Exams, "exam_id", exam_id);

    if (new Date(selectingExam.end_time) < Date.now()) {
      props.enqueueSnackbar({
        message: "Deadline passed! Unable to take this exam anymore!",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
          autoHideDuration: 2000,
          action: key => (
            <CancelIcon onClick={() => props.closeSnackbar(key)}>X</CancelIcon>
          ),
        }
      });
    } else {
      setExIndex(exam_id);
      setConfirmDialog(true);
    }
  };

  const handleConfirmDialogBtnOk = () => {
    let selectingExam = findObjectInArrayByAttr(classroomData.Exams, "exam_id", exIndex);
    handleConfirmDialogClickClose();
    setExData(selectingExam)
    let newUserChoices = Array(selectingExam.Questions.length).fill(`question-${null}-choice-${null}`);
    setUserChoices(newUserChoices);
    setExamStartTime(Date.now())
    setExDialogOpen(true);
  }

  const handleConfirmDialogClickClose = () => {
    setConfirmDialog(false);
  };

  const onSubmitExam = (isForced) => {
    setIsLoading(true);
    let msg = "Submitting Exam!";
    props.enqueueSnackbar({
      message: msg,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: 'warning',
        autoHideDuration: 3000,
        action: key => (
          <CancelIcon onClick={() => props.closeSnackbar(key)}>X</CancelIcon>
        ),
      }
    });
    let answerData = [];
    for (let i = 0; i < userChoices.length; i++) {
      let ans = userChoices[i].split('-');
      let choiceIndex = null;
      try {
        if (ans[3] !== "null") choiceIndex = Number.parseInt(ans[3]);

      } catch {
        console.log('Some thing NAN in userchoices')
      }
      answerData.push({
        question_id: exData.Questions[i].question_id,
        choice_id: choiceIndex !== null ? exData.Questions[i].Choices[choiceIndex].choice_id : null
      });
    }

    let submitData = {
      exam_id: exData.exam_id,
      classroom_id: exData.classroom_id,
      user_id: props.currentUser.user_id,
      start_time: examStartTime,
      finish_time: Date.now(),
      answerData
    }
    // console.log(JSON.stringify(submitData));
    const url = "/submitExam";
    axios.post(url, submitData)
      .then(result => {
        console.log(result);
        let msg = "Submitted exam successfully!";
        props.enqueueSnackbar({
          message: msg,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
            autoHideDuration: 3000,
            action: key => (
              <CancelIcon onClick={() => props.closeSnackbar(key)}>X</CancelIcon>
            ),
          }
        });
        setIsLoading(false);
        clearExam();
        return null;
      })
      .then(() => {
        props.history.push(props.history.location.pathname);
      })
  }
  const clearExam = () => {
    handleClose();
    setPassword("");
    setExamStartTime(null);
    setExData(null);
    setUserChoices(null);
    setExIndex(null);
    setExamResult(null);
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


  const isExamDone = (exam) => {
    return props.currentUser.studentExams.filter(e => e.exam_id === exam.exam_id && e.status === 'TAKED').length > 0;
  }

  const isSavedOnChain = (exam) => {
    console.log(exam)
    return props.currentUser.studentExams.filter(e => e.exam_id === exam.exam_id && e.status === 'ONCHAIN').length > 0;
  }

  const takenChip = (exam) => {
    if (isExamDone(exam)) {
      return <Chip
        style={{ "marginLeft": "auto" }}
        color='primary'
        variant="default"
        label={`DONE!`}
      />
    } else return null;
  }

  const onOpenResult = (exam_id) => {
    setShowingExamRes(true);
    const selectingExam = findObjectInArrayByAttr(classroomData.Exams, "exam_id", exam_id);
    console.log(selectingExam)
    setExData(selectingExam);
    loadExamResult(props.currentUser.user_id, selectingExam.exam_id);
  }

  const onCloseResult = () => {
    setShowingExamRes(false);
    clearExam();
  }

  const showExamResult = () => {
    return (
      <FullScreenDialog
        type="EXAM_RESULT"
        title="RESULT+"
        open={showingExamRes}
        onOpenResult={onOpenResult}
        handleClose={onCloseResult}
      >
        <div style={
          {
            paddingTop: "10rem",
            paddingLeft: "2rem",
            wordWrap: "break-word",
            overflow: "auto"
          }
        }
        >
          <Typography color="primary" variant="h6" >
            Start Time: {examResult ? new Date(examResult.start_time).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : null}
          </Typography>
          <Typography color="primary" variant="h6" >
            End Time: {examResult ? new Date(examResult.finish_time).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) : null}
          </Typography>
          <Typography color="secondary" variant="h6" >
            Result: {examResult ? examResult.final_result : null}
          </Typography>
        </div>
      </FullScreenDialog>
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
              <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={[classes.title, classes.margin].join(" ")}>
                  Excercise
                </Button>
              </ThemeProvider>
            </NavLink>
            {isLoading ? <CircularProgress /> : null}
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
                classroomData.Exams.slice(currentPage * perPage, currentPage * perPage + perPage > classroomData.Exams.length ? classroomData.Exams.length : currentPage * perPage + perPage).map((exam, index) => {
                  return (
                    <ExpansionPanel
                      isSentToBlockchain={isSavedOnChain(exam)}
                      isDone={isExamDone(exam)}
                      onOpenResult={() => onOpenResult(exam.exam_id)}
                      onTakeExam={() => handleConfirmDialogClickOpen(exam.exam_id)}
                      onSendToBlockchain={() => handlePasswordDialogOpen(exam.exam_id)}
                      examData={exam}
                      key={"exam-" + index}
                      examTakenChip={() => takenChip(exam)}
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
            <FormDialog
              open={passwordDialog}
              handleClose={handlePasswordDialogClose}
              handleOk={handleSendToBlockchain}
              title="SEND EXAM RESULT TO BLOCKCHAIN"
              content="Input your password"
            >
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                fullWidth
                type="password"
                value={password}
                onChange={(event) => handlePasswordChange(event)}
              />
            </FormDialog>

            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Pagination
                limit={perPage} // perPage
                offset={perPage * currentPage} // perPage * currentPage
                total={classroomData ? classroomData.Exams.length : 1}  // exercise.length
                innerButtonCount={1}
                outerButtonCount={2}
                onClick={(e, offset) => handlePageClick(offset)}
              />
            </MuiThemeProvider>
          </GridItem>
        </GridContainer>
      </GridContainer>
      {
        exData != null && exDialogOpen === true ?
          <FullScreenDialog
            title={exData.name}
            duration={exData.duration}
            open={exDialogOpen}
            handleClose={handleClose}
            submitExam={() => onSubmitExam(true)} // forced
            submitBtn={
              <>
                {isLoading ? <CircularProgress /> : false}
                <Button color="inherit" onClick={() => onSubmitExam(false)}>SUBMIT</Button>
              </>
            }
          >
            <div style={{ paddingTop: "2.8rem" }}>
              {classroomData != null ? examDialog() : null}
            </div>
          </FullScreenDialog>
          :
          null
      }
      {
        showingExamRes === true && exData != null ? showExamResult() : null
      }

    </>
  );
}
)