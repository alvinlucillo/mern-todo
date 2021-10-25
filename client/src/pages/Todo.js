import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TodoCard from "../components/TodoCard";
import { getTodos } from "../actions/todoAction";

const Todo = () => {
  const todos = useSelector((state) => state.todos.items);
  const { isLoggedIn, isCheckingAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      if (!isCheckingAuth) {
        if (!isLoggedIn) history.push("/login");
        else dispatch(getTodos());
      }
    })();
  }, [dispatch, history, isLoggedIn, isCheckingAuth]);

  return <TodoCard todos={todos} />;
};

export default Todo;
