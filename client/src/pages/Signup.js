import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signUpUser, resetLoginFailed } from "../actions/authAction";

import {
  Alert,
  Button,
  Card,
  CardHeader,
  TextField,
  CardContent,
} from "@mui/material";

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const { hasSignedUp, isSignUpSuccessful, errMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSignUpSuccessful) {
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
        history.push("/login");
      }, 5000);
    }
  }, [isSignUpSuccessful, history]);

  const handleSignupClick = () => {
    dispatch(signUpUser({ username, password }));
  };

  const handleLoginClick = () => {
    history.push("/login");
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
      <CardHeader title="New user sign up" />
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
          <Button variant="contained" onClick={() => handleSignupClick()}>
            Sign up
          </Button>
          <Button
            variant="text"
            style={{ marginTop: "5px" }}
            onClick={() => handleLoginClick()}
          >
            Log in
          </Button>
          {hasSignedUp && !isSignUpSuccessful && (
            <Alert
              severity="error"
              onClose={() => handleCloseAlert()}
              style={{ marginTop: "5px" }}
            >
              {errMessage}
            </Alert>
          )}
          {showSuccessMsg && (
            <Alert
              severity="success"
              onClose={() => handleCloseAlert()}
              style={{ marginTop: "5px" }}
            >
              {"Signup successful! You will be redirected to login in 5s..."}
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Signup;
