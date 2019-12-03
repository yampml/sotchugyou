/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  fixedBar: {
    position: "fixed"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();


  const [timeLeft, setTimeLeft] = React.useState(props.duration * 60);

  React.useEffect(() => {
    const timeLeftInterval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timeLeftInterval);
  }, [timeLeft]);

  const timeLeftFormat = () => {
    return `${Number.parseInt(timeLeft/60)}:${timeLeft%60}`;
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={props.exDialogOpen}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={[classes.appBar, classes.fixedBar].join(' ')}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
            {props.submitBtn ? props.submitBtn : null}
            <Button autoFocus color="inherit" >
              {"TIME LEFT: " + timeLeftFormat()}
            </Button>
          </Toolbar>
        </AppBar>
        {props.children}
      </Dialog>
    </div>
  );
}
