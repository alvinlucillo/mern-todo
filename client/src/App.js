import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AppBar, Typography, Container, Toolbar, Button } from "@mui/material";
import { Box } from "@mui/system";
import "./App.css";

import { logoutUser, checkTokenValidity } from "./actions/authAction";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkTokenValidity());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" enableColorOnDark>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Yet another to-do app{" "}
            </Typography>
            <Button
              color="inherit"
              onClick={() => handleLogout()}
              style={!isLoggedIn ? { display: "none" } : {}}
            >
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Todo />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
