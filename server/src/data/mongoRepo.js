const Todo = require("../model/todo");
const User = require("../model/user");

module.exports = {
  async findTodosByUserId(owner) {
    let todos;

    try {
      todos = await Todo.find({ owner });
    } catch (err) {
      console.log(err);
      throw new Error("Error finding todos");
    }

    const todosFormatted = todos.map((todo) =>
      todo.toObject({ getters: true })
    );

    return todosFormatted;
  },
  async addTodo(title, due, status, owner) {
    const newTodo = new Todo({ title, due, status, owner });

    try {
      await newTodo.save();
    } catch (err) {
      console.log(err);
      throw new Error("Error adding todo");
    }

    return newTodo;
  },
  async updateTodo(id, title, due, status) {
    let todo;
    try {
      todo = await Todo.findById(id);
      todo.title = title;
      todo.due = due;
      todo.status = status;

      todo.save();
    } catch (err) {
      console.log(err);
      throw new Error("Error updating todo");
    }

    if (!todo) {
      throw new Error("Error updating todo");
    }

    return todo.toObject({ getters: true });
  },
  async deleteTodoById(id) {
    let todo;
    try {
      todo = await Todo.findById(id);
      await todo.remove();
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting todo");
    }
    return true;
  },
  async findTodoById(id) {
    let todo;

    try {
      todo = await Todo.findById(id);
    } catch (err) {
      console.log(err);
      throw new Error("Error finding todo");
    }

    if (!todo) {
      throw new Error("Error finding todo");
    }

    return todo.toObject({ getters: true });
  },
  async findUserById(id) {
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      console.log(err);
      throw new Error("Error finding user");
    }

    return user;
  },
};
