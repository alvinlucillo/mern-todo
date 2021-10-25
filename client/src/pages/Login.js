import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  loginUser,
  resetLoginFailed,
  checkTokenValidity,
} from "../actions/authAction";

import { resetError } from "../actions/todoAction";

import {
  Alert,
  Button,
  Card,
  CardHeader,
  TextField,
  CardContent,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const { isLoginFailed, errMessage, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      dispatch(checkTokenValidity());
      if (isLoggedIn) {
        dispatch(resetError()); //clear any errors in Todo page
        history.push("/");
      }
    })();
  }, [isLoggedIn, history, dispatch]);

  const handleLoginClick = () => {
    dispatch(loginUser({ username, password }));
  };

  const handleSignupClick = () => {
    dispatch(resetLoginFailed());
    history.push("/signup");
  };

  const handleCloseAlert = () => {
    dispatch(resetLoginFailed());
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <Card
      style={{
        marginTop: "1em",
        marginLeft: "2em",
        marginRight: "2em",
        padding: "1em",
      }}
    >
      <CardHeader title="User login" />
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="login_username"
            name="username"
            label="Username"
            variant="outlined"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          <br />
          <TextField
            id="login_password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => handleInputChange(e)}
          />
          <br />
          <Button variant="contained" onClick={() => handleLoginClick()}>
            Log in
          </Button>
          <Button
            variant="text"
            style={{ marginTop: "5px" }}
            onClick={() => handleSignupClick()}
          >
            Sign up
          </Button>
          {isLoginFailed && (
            <Alert
              severity="error"
              onClose={() => handleCloseAlert()}
              style={{ marginTop: "5px" }}
            >
              {errMessage}
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
