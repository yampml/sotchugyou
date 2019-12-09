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
  console.log(databody);
  console.log(isSignUp)
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: databody.email,
      password: databody.password,
      username: databody.username,
      dob: databody.dob,
      role: databody.role
    };
    console.log(isSignUp)
    if (!isSignUp) { // sign in
      auxios
        .post("/signin/", authData)
        .then(response => {
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
          console.log(err);
          dispatch(authFail(err.response.data.error));
        });
    } else {
      auxios // sign up
        .put("/signup", authData)
        .then(response => {
          console.log("Auxios response: ", response);
          dispatch(registerSuccess());
          dispatch(actions.enqueueSnackbar({
              message: "Account registered successfully, please login!",
              options: {
                key: new Date().getTime() + Math.random(),
                        variant: 'success',
                        autoHideDuration: 1000,
              }
          }))
          // const expirationDate = new Date(
            // new Date().getTime() + response.data.expiresIn * 1000
          // );
          // localStorage.setItem("token", response.data.idToken);
          // localStorage.setItem("expirationDate", expirationDate);
          // localStorage.setItem("userId", response.data.localId);
          // auxios
          //   .put("https://react-my-burger-112af.firebaseio.com/users.json", {
          //     id: response.data.localId,
          //     role: "admin"
          //   })
          //   .then(response2 => {
          //     console.log(response2.data);
          //   })
          //   .catch(error2 => {
          //     console.log(error2);
          //     console.log("not error not error");
          //   });

          // dispatch(authSuccess(response.data.idToken, response.data.localId));
          // dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
          console.log(err);
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
      .then( async result => {
        const userTakenExam = await userxios.get(url + "/allTakenExams");
        const studentExams = userTakenExam.data.studentExams;
        const { user_id, username, email, created_at, private_key, cert_pem }  = result.data.user;
        dispatch(setCurrentUser( { user_id, username, email, created_at, private_key, cert_pem, studentExams } ));
      })
  }
}

export const setCurrentUser = (user) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    currentUser: { ...user}
  }
}