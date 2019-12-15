import * as actionTypes from "./actionTypes";
import { auth_instance as auxios, user_instance as userxios } from "../../apiCaller";
import * as actions from "./actionIndexes";


export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  // console.log("Check AUTH timeout", (expirationTime - new Date().getTime()))
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, (expirationTime - new Date().getTime()));
  };
};
// postman11@gmail.cozxcm
// foobarpassword
export const auth = (databody, isSignUp) => {
  // console.log(databody);
  // console.log(isSignUp)
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: databody.email,
      password: databody.password,
      username: databody.username,
      dob: databody.dob,
      role: databody.role
    };
    console.log("IN AUTH ACTION: ", authData);
    if (!isSignUp) { // sign in
      auxios
        .post("/signin/", authData)
        .then(response => {
          console.log("RESPONSEE IN LOGIN: ", response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("expiresIn", response.data.expiresIn);
          localStorage.setItem("userId", response.data.userId);
          dispatch(authSuccess(response.data.token, response.data.userId));
          dispatch(actions.enqueueSnackbar({
            message: "Login successfully, redirecting...!",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
              autoHideDuration: 1000,
            }
          }));
          dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
          const errorMessage = err.response.data ? err.response.data.message : "";
          dispatch(actions.enqueueSnackbar({
            message: errorMessage,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
              autoHideDuration: 1000,
            }
          }));
          dispatch(authFail(errorMessage));

        });
    } else {
      auxios // sign up
        .put("/signup", authData)
        .then(response => {
          console.log("Auxios response: ", response);
          dispatch(registerSuccess());
          dispatch(actions.enqueueSnackbar({
            message: "Account registered successfully, please switch to login!",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
              autoHideDuration: 1000,
            }
          }))
        })
        .catch(err => {
          dispatch(actions.enqueueSnackbar({
            message: err.response.data.message,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
              autoHideDuration: 1000,
            }
          }))
          dispatch(authFail(err.response.data.error));
        });
    }
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(Number.parseInt(localStorage.getItem("expiresIn")));
      if (expirationDate <= new Date().getTime()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            expirationDate.getTime()
          )
        );
        dispatch(fetchCurrentUser(userId, token));
      }
    }
  };
};

export const fetchCurrentUser = (userID, token) => {
  return dispatch => {
    const url = "/user/" + userID;
    userxios
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(async result => {
        const userTakenExam = await userxios.get(url + "/allTakenExams");
        const studentExams = userTakenExam.data.studentExams;
        // console.log(result.data.user)
        const { user_id, username, email, created_at, priv_key, cert } = result.data.user;

        dispatch(setCurrentUser({ user_id, username, email, created_at, priv_key, cert, studentExams }));
      })
  }
}

export const setCurrentUser = (user) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    currentUser: { ...user }
  }
}