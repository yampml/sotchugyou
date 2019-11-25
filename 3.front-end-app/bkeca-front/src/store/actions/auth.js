import * as actionTypes from "./actionTypes";
import { auth_instance as auxios } from "../../apiCaller";
import * as actions from "./actionIndexes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
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
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    };
    let url =
      "http://localhost:6969/";
    if (!isSignUp) { // sign in
      url = 
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD-nqQ-SE0MrKwuZ13obpCojigB98jod8I";
      auxios
        .post(url, authData)
        .then(response => {
          console.log(response);
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
          dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
          console.log(err);
          dispatch(authFail(err.response.data.error));
        });
    } else {
       //   auxios.put("/signup", { email, password })
    //     .then(response => {
    //       console.log("Auxios response: ", response);
    //     })
    //     .catch(err => {
    //       console.log("Auxios error: ", err);
    //     })
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
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
