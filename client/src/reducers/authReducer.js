import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  LOGOUT,
  RESET_LOGIN_FAILED,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
  RESET_SIGNUP_FAILED,
  RESET_SIGNUP_SUCCESSFUL,
  CHECK_AUTH_SUCCESSFUL,
  CHECK_AUTH_FAILED,
} from "../types/authType";

const initialState = {
  isLoggedIn: false,
  username: "",
  token: "",
  userid: "",
  isLoginFailed: false,
  errMessage: "",
  alreadyAuthenticated: false,
  isCheckingAuth: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: true,
        hasSignedUp: false,
        isSignUpSuccessful: false,
        errMessage: "",
        username: action.payload.username,
        token: action.payload.token,
        userid: action.payload.userid,
      };
    case LOGIN_FAILED:
      return { ...state, isLoginFailed: true, errMessage: action.payload };
    case RESET_LOGIN_FAILED:
      return initialState;
    case SIGNUP_SUCCESSFUL:
      const isSignUpSuccessful = !!action.payload.userid;
      return { ...state, isSignUpSuccessful, hasSignedUp: true };
    case SIGNUP_FAILED:
      return {
        ...state,
        hasSignedUp: true,
        isSignUpSuccessful: false,
        errMessage: action.payload,
      };
    case RESET_SIGNUP_SUCCESSFUL:
    case RESET_SIGNUP_FAILED:
      return initialState;
    case CHECK_AUTH_SUCCESSFUL:
      return { ...state, isLoggedIn: true, isCheckingAuth: false };
    case CHECK_AUTH_FAILED:
      return { ...state, isLoggedIn: false, isCheckingAuth: false };
    case LOGOUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default authReducer;
