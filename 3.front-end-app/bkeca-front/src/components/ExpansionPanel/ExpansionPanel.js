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

export default function DetailedExpansionPanel() {
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
              Ten Bai Kiem tra
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Bai Kiem Tra description
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={clsx(classes.column, classes.helper)} >
            <Typography variant="h5">Hạn cuối: 1/1/2020</Typography>
          </div>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="Barbados" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              <Typography variant="h4">0/10</Typography>
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Đã nộp
              </a>
            </Typography>
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              <Typography variant="h4">0/10</Typography>
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Đã chấm điểm
              </a>
            </Typography>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
