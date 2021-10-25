const mongoose = require("mongoose");
const User = require("../src/model/user");
const Todo = require("../src/model/todo");

require("dotenv").config();

const action = process.argv[2];

const deleteAllUsers = async () => {
  await connectDB();
  console.log("Starting", action);
  const users = await User.deleteMany({});

  console.log("Result:", users);
};
const deleteTodos = async () => {
  await connectDB();
  console.log("Starting", action);
  const todos = await Todo.deleteMany({});

  console.log("Result:", todos);
};

const getUsers = async () => {
  await connectDB();
  console.log("Starting", action);
  const users = await User.find({}).exec();
  console.log("Result:", users);
};

const connectDB = async () => {
  console.log("Connecting to the database.");
  await mongoose.connect(process.env.MONGO_URL_LOCAL);
  console.log("Successfully connected to the database.");
};

const main = async () => {
  let code = 0;

  try {
    switch (action) {
      case "delete_users":
        await deleteAllUsers();
        break;
      case "get_users":
        await getUsers();
        break;
      case "delete_todos":
        await deleteTodos();
        break;
      default:
        console.log(`Action "${action}" not available`);
    }
  } catch (err) {
    console.log(err);
    code = 1;
  }

  console.log("Exiting...");
  process.exit(code);
};

main();
