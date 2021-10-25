const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

require("dotenv").config();

const {
  getAllTodosByUser,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const repository = require("../data/mongoRepo");

router.use(checkAuth(process.env.SECRET));

router.get("/", getAllTodosByUser(repository));

router.post("/", addTodo(repository));

router.patch("/:id", updateTodo(repository));

router.delete("/:id", deleteTodo(repository));

module.exports = router;
