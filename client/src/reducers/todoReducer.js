import {
  ADD_TODO_SUCCESSFUL,
  ADD_TODO_FAILED,
  GET_TODOS_SUCCESSFUL,
  GET_TODOS_FAILED,
  DELETE_TODO,
  UPDATE_TODO_SUCCESSFUL,
  UPDATE_TODO_FAILED,
  RESET_TODO_ERROR,
} from "../types/todoType";

const initialState = {
  errMsg: "",
  isGettingTodo: true,
  items: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_SUCCESSFUL:
      return { ...state, items: [...state.items, action.payload] };
    case GET_TODOS_FAILED:
      return {
        ...state,
        errMsg: action.payload,
      };
    case ADD_TODO_FAILED:
      return { ...state, errMsg: action.payload };
    case GET_TODOS_SUCCESSFUL:
      return { ...state, isGettingTodo: false, items: [...action.payload] };
    case DELETE_TODO:
      return {
        ...state,
        items: state.items.filter((todo) => todo.id !== action.payload.id),
      };
    case UPDATE_TODO_SUCCESSFUL:
      return {
        ...state,
        items: state.items.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case UPDATE_TODO_FAILED:
      return state;
    case RESET_TODO_ERROR:
      return { ...state, errMsg: "" };
    default:
      return state;
  }
};

export default todoReducer;
