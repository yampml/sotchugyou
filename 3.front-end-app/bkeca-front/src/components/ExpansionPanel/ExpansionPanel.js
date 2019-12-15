import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
    width: "100%"
  },
  heading: {
    display: "inline-block",
    fontSize: theme.typography.pxToRem(15)
  },
  headingIcon: {
    display: "inline-block",
    paddingRight: theme.spacing(1)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%",
    display: "flex",
    alignItems: "center"
  },
  columnMain: {
    flexBasis: "66.66%",
    display: "flex",
    alignItems: "center"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

export default function DetailedExpansionPanel(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <AssignmentRoundedIcon
              color="primary"
              className={classes.headingIcon}
            />
            <Typography className={classes.heading}>
              {props.examData.name}
            </Typography>
          </div>
          <div className={clsx(classes.columnMain, classes.helper)}>
            {
              new Date(props.examData.end_time).getTime() > Date.now() ?
                <p className={classes.secondaryHeading}>
                  {`Deadline: ${new Date(props.examData.end_time).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}  `}
                </p>
                :
                <p className={classes.secondaryHeading} style={{ "color": "red" }}>
                  {`Deadline: ${new Date(props.examData.end_time).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}  `}
                </p>
            }
            {props.examTakenChip()}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Chip
              color={props.examData.status === 'OPENING' ? 'primary' : 'secondary'}
              variant="outlined"
              label={`STATUS: ${props.examData.status}`}
            />
          </div>

          <div className={clsx(classes.columnMain, classes.helper)} >
            <Typography variant="subtitle1">{props.examData.description}</Typography>
          </div>
          {/* <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              <Typography variant="h4">0/10</Typography>
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}> show this with instructor only!
                Đã nộp
              </a>
            </Typography>

          </div> */}
          <div className={clsx(classes.column, classes.helper)}>
            {
              props.isDone === true ?
                <React.Fragment>
                  <Fab
                    color="secondary"
                    variant="extended"
                    aria-label="add"
                    // className={classes.fab}
                    onClick={props.onOpenResult}
                  >
                    <ArrowForwardIcon className={classes.extendedIcon} />
                    View Result
                  </Fab>
                  <Fab
                    color="secondary"
                    variant="extended"
                    aria-label="add"
                    // className={classes.fab}
                    onClick={props.onSendToBlockchain}
                  >
                    <ArrowForwardIcon className={classes.extendedIcon} />
                    SEND TO BLOCKCHAIN
                  </Fab>
                </React.Fragment>

                : null
            }
            {(props.examData.status === 'OPENING' && props.isDone !== true) ?
              <Fab
                color="primary"
                variant="extended"
                aria-label="add"
                // className={classes.fab}
                onClick={props.onTakeExam}
              >
                <ArrowForwardIcon className={classes.extendedIcon} />
                Go to Exam!
              </Fab>
              : null
            }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
