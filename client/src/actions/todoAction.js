import axios from "axios";

import {
  ADD_TODO_SUCCESSFUL,
  GET_TODOS_SUCCESSFUL,
  GET_TODOS_FAILED,
  DELETE_TODO,
  UPDATE_TODO_SUCCESSFUL,
  UPDATE_TODO_FAILED,
  ADD_TODO_FAILED,
  RESET_TODO_ERROR,
} from "../types/todoType";

import {
  ERR_MSG_TODO_ADD,
  ERR_MSG_TODO_UPDATE,
  ERR_MSG_TODO_GET,
} from "../constants/errorMessage";

const service = axios.create({ baseURL: process.env.REACT_APP_API });

export const addTodo = (todo) => async (dispatch) => {
  let newTodo = null;
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const resp = await service.post("/todo", todo, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    newTodo = await resp.data;

    dispatch({
      type: ADD_TODO_SUCCESSFUL,
      payload: newTodo,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: ADD_TODO_FAILED, payload: ERR_MSG_TODO_ADD });
  }
};

export const deleteTodo = (todo) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await service.delete("/todo/" + todo.id, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
  } catch (err) {
    console.log(err);
  }

  dispatch({
    type: DELETE_TODO,
    payload: todo,
  });
};

export const updateTodo = (todo) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  delete todo.isEditMode;
  let updatedTodo = null;

  try {
    if (!user || !user.token) throw new Error("No auth token");

    const resp = await service.patch("/todo/" + todo.id, todo, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    updatedTodo = await resp.data;

    dispatch({
      type: UPDATE_TODO_SUCCESSFUL,
      payload: updatedTodo,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_TODO_FAILED,
      payload: ERR_MSG_TODO_UPDATE,
    });
  }
};

export const getTodos = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const resp = await service.get("/todo", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await resp.data;

    dispatch({
      type: GET_TODOS_SUCCESSFUL,
      payload: data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: GET_TODOS_FAILED,
      payload: ERR_MSG_TODO_GET,
    });
  }
};

export const updateTodoEditMode = (todo, editMode) => (dispatch) => {
  todo["isEditMode"] = editMode;

  dispatch({
    type: UPDATE_TODO_SUCCESSFUL,
    payload: todo,
  });
};

export const resetError = () => (dispatch) => {
  dispatch({
    type: RESET_TODO_ERROR,
  });
};
