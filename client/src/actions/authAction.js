import axios from "axios";

import {
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  RESET_LOGIN_FAILED,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
  RESET_SIGNUP_SUCCESSFUL,
  CHECK_AUTH_SUCCESSFUL,
  CHECK_AUTH_FAILED,
  LOGOUT,
} from "../types/authType";

import {
  ERR_MSG_LOGIN_GENERAL,
  ERR_MSG_LOGIN_INVALID_CREDENTIAL,
  ERR_MSG_SIGNUP,
  ERR_MSG_SIGNUP_EXISTING_USER,
} from "../constants/errorMessage";

const service = axios.create({ baseURL: process.env.REACT_APP_API });

export const checkTokenValidity = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    try {
      await service.post(
        "/auth/check",
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      dispatch({ type: CHECK_AUTH_SUCCESSFUL });

      return;
    } catch (err) {
      console.log(err);
    }
  }

  dispatch({ type: CHECK_AUTH_FAILED });
};

export const loginUser = (creds) => async (dispatch) => {
  let data;
  console.log("process.env.REACT_APP_API", process.env.REACT_APP_API);
  try {
    const resp = await service.post("/auth/login", { ...creds });
    data = await resp.data;
  } catch (err) {
    console.log(err);

    if (err.response.status === 404) {
      dispatch({
        type: LOGIN_FAILED,
        payload: ERR_MSG_LOGIN_INVALID_CREDENTIAL,
      });
    } else dispatch({ type: LOGIN_FAILED, payload: ERR_MSG_LOGIN_GENERAL });

    return;
  }
  localStorage.setItem("user", JSON.stringify(data));
  dispatch({ type: LOGIN_SUCCESSFUL, payload: data });
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT });
};

export const signUpUser = (user) => async (dispatch) => {
  let data;
  try {
    const resp = await service.post("/auth/signup", { ...user });
    data = await resp.data;
  } catch (err) {
    console.log(err);

    if (err.response.status === 422) {
      dispatch({
        type: SIGNUP_FAILED,
        payload: ERR_MSG_SIGNUP_EXISTING_USER,
      });
    } else {
      dispatch({
        type: SIGNUP_FAILED,
        payload: ERR_MSG_SIGNUP,
      });
    }

    return;
  }

  dispatch({ type: SIGNUP_SUCCESSFUL, payload: data });
  dispatch({ type: RESET_SIGNUP_SUCCESSFUL, payload: data });
};

export const resetLoginFailed = () => async (dispatch) => {
  dispatch({ type: RESET_LOGIN_FAILED });
};
