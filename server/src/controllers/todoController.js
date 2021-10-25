const HttpError = require("../model/http-error");
const todo = require("../model/todo");

const getAllTodosByUser = (repository) => async (req, res, next) => {
  let userId = req.user.id;
  let todos;

  try {
    todos = await repository.findTodosByUserId(userId);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  res.json(todos);
};

const addTodo = (repository) => async (req, res, next) => {
  let user;

  try {
    user = await repository.findUserById(req.user.id);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (!user) {
    return next(new HttpError("User not found", 404));
  }

  const { title, due } = req.body;

  let todo;

  try {
    todo = await repository.addTodo(title, due, "new", req.user.id);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  res.status(201).json({
    id: todo._id,
    title: todo.title,
    due: todo.due,
    status: todo.status,
  });
};

const updateTodo = (repository) => async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    return next(new HttpError("Missing todo id", 400));
  }

  let todo;
  try {
    todo = repository.findTodoById(id);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (!todo) {
    return next(new HttpError("Todo not found", 404));
  }

  const { title, due, status } = req.body;

  if (!title || !due || !status) {
    return next(new HttpError("Missing title, due, or status", 400));
  }

  let updatedTodo;
  try {
    updatedTodo = await repository.updateTodo(id, title, due, status);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (!updatedTodo) {
    return next(new HttpError());
  }

  res.json({
    id: updatedTodo.id,
    title: updatedTodo.title,
    due: updatedTodo.due,
    status: updatedTodo.status,
    owner: updatedTodo.owner,
  });
};

const deleteTodo = (repository) => async (req, res, next) => {
  let id = req.params.id;

  if (!id) {
    return next(new HttpError("Missing id", 400));
  }

  let todo;
  try {
    todo = await repository.findTodoById(id);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (!todo) {
    return next(new HttpError("Todo not found", 404));
  }

  let result = false;
  try {
    result = await repository.deleteTodoById(id);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  res.status(200).json({ result });
};

module.exports = { getAllTodosByUser, addTodo, updateTodo, deleteTodo };
