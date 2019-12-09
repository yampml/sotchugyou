import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// import { useSnackbar } from 'notistack';
// redux
import { connect } from "react-redux";
import * as actions from "../store/actions/actionIndexes";


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    enqueueSnackbar: (notification) => dispatch(actions.enqueueSnackbar(notification)),
    closeSnackbar: (key) => dispatch(actions.closeSnackbar(key))
  };
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        BKECA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function SignInSide(props) {
  const classes = useStyles();


  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSignUp, setIsSignUp] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [dob, setDob] = React.useState(new Date(1997, 8, 7));
  const [role, setRole] = React.useState("student")

  const switchAuthModeHandler = () => {
    // rest.testReduxAuthStart();
    setIsSignUp(!isSignUp);
    let msg = 'Switched to ' + (isSignUp ? 'Sign Up' : 'Sign In') + ' mode!';
    props.enqueueSnackbar({
      message: msg,
      options: {
        key: new Date().getTime() + Math.random(),
        variant: isSignUp ? 'success' : 'info',
        autoHideDuration: 1000,
        action: key => (
          <CancelIcon onClick={() => props.closeSnackbar(key)}>X</CancelIcon>
        ),
      }
    })

  };

  const handleDateChange = date => {
    setDob(date);
  };

  const handleRoleChange = event => {
    setRole(event.target.value);
  }
  console.log(isSignUp)
  const btnLoginSubmit = () => {
    props.onAuth({ email, password, dob, role, username }, isSignUp);
  }
  return <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        {isSignUp ?
          <>
            <Avatar className={classes.avatar}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
              </Typography>
          </>
          :
          <>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
              </Typography>
          </>
        }
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          {isSignUp ?
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Full Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={event => setUsername(event.target.value)}
            /> : null
          }
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          {!isSignUp ? null :
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                inputVariant="outlined"
                // disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="dob-picker"
                label="Date of Birth"
                value={dob}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          }
          {!isSignUp ? null :
            <TextField
              margin="normal"
              label="Role"
              select
              variant="outlined"
              value={role}
              onChange={handleRoleChange}
              inputProps={{ name: "role", id: "outlined-role-simple" }}
            >
              <MenuItem value={"student"}>Student</MenuItem>
              <MenuItem value={"instructor"}>Instructor</MenuItem>
            </TextField>
          }
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={btnLoginSubmit}
          >
            {isSignUp ? "Sign Up" : "Sign in"}
          </Button>
          {props.loading ? <Grid container justify="center"><CircularProgress /></Grid> : null}
          <Grid container>
            <Grid item xs>
              {isSignUp ? null : <Link href="#" variant="body2">
                Forgot password?
                </Link>}
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => switchAuthModeHandler()}>
                {isSignUp ? "Switch to Sign In" : "Don't have an account? Sign Up!"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Grid>
  </Grid>
});
