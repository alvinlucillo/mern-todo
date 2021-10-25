import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  addTodo,
  deleteTodo,
  updateTodo,
  updateTodoEditMode,
  resetError,
} from "../actions/todoAction";

import { checkTokenValidity } from "../actions/authAction";

import TodoItem from "./TodoItem";
import NewTodo from "./NewTodo";
import "../App.css";

import {
  Card,
  CardContent,
  List,
  Fab,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const TodoCard = ({ todos }) => {
  const dispatch = useDispatch();
  const { errMsg, isGettingTodo } = useSelector((state) => state.todos);
  const { isLoggedIn, isCheckingAuth } = useSelector((state) => state.auth);

  const [showAddTodo, setShowAddTodo] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (errMsg && errMsg.length > 0) setShowSnackbar(true);

    if (!isLoggedIn && !isCheckingAuth) history.push("/login");
  }, [errMsg, isLoggedIn, history, isCheckingAuth]);

  const handleOnCheck = async (todo) => {
    const newTodo = {
      ...todo,
      status: todo.status === "completed" ? "new" : "completed",
    };
    dispatch(checkTokenValidity());
    dispatch(updateTodo(newTodo));
  };

  const handleAddTodo = async (title, due) => {
    const todo = { title, due };
    dispatch(checkTokenValidity());
    dispatch(addTodo(todo));
  };

  const handleDeleteTodo = async (todo) => {
    dispatch(checkTokenValidity());
    dispatch(deleteTodo(todo));
  };

  const handleCloseAddTodo = () => {
    setShowAddTodo(false);
  };

  const handleEditMode = (todo, editMode) => {
    dispatch(checkTokenValidity());
    dispatch(updateTodoEditMode(todo, editMode));
  };

  const handleOnSave = async (todo) => {
    dispatch(checkTokenValidity());
    dispatch(updateTodo(todo));
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
    dispatch(resetError());
  };
  return (
    <>
      <Card style={{ marginTop: "1em", padding: "1em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">My todo-list</Typography>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            style={{ marginLeft: "auto", marginRight: "1em", marginTop: "1em" }}
          >
            <Add onClick={() => setShowAddTodo(true)} />
          </Fab>
        </div>
        <CardContent style={{ padding: 0 }}>
          {showAddTodo && (
            <NewTodo onAdd={handleAddTodo} onClose={handleCloseAddTodo} />
          )}

          <br />

          {!isGettingTodo && todos && todos.length === 0 && (
            <p>So lonely here...Add a todo. See the add icon there?</p>
          )}

          {isGettingTodo && <p>Loading...please wait</p>}

          <List style={{ padding: 0 }}>
            {todos &&
              todos.map((todo) => {
                return (
                  <TodoItem
                    todo={todo}
                    key={todo.id}
                    onEditMode={handleEditMode}
                    onSave={handleOnSave}
                    onDelete={handleDeleteTodo}
                    onCheck={handleOnCheck}
                  />
                );
              })}
          </List>
        </CardContent>
      </Card>

      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleSnackbarClose}
      >
        <Alert severity="error">{errMsg}</Alert>
      </Snackbar>
    </>
  );
};

export default TodoCard;
