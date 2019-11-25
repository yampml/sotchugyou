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

// redux
import { connect } from "react-redux";
import * as actions from "../store/actions/actionIndexes";

// axios
import { auth_instance as auxios } from "../apiCaller";

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


  const switchAuthModeHandler = () => {
    // rest.testReduxAuthStart();
    setIsSignUp(!isSignUp);
  };

  const btnLoginSubmit = () => {
    // if (isSignUp) {
    //   auxios.put("/signup", { email, password })
    //     .then(response => {
    //       console.log("Auxios response: ", response);
    //     })
    //     .catch(err => {
    //       console.log("Auxios error: ", err);
    //     })
    // } else {

    // }
    props.onAuth(email, password, isSignUp);
  }
  return (
    <Grid container component="main" className={classes.root}>
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
            {isSignUp ? null : <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={btnLoginSubmit}
            >
              {isSignUp ? "Sign Up" : "Sign in"}
            </Button>
            { props.loading ? <Grid container justify="center"><CircularProgress /></Grid> : null }
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
  );
});