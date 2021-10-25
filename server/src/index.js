const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoute");
const authRoute = require("./routes/authRoute");
const HttpError = require("./model/http-error");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

const { PORT = 5000 } = process.env;

app.use("/api/todo", todoRoute);
app.use("/api/auth", authRoute);

app.use((req, resp, next) => {
  return next(new HttpError("Invalid route", 500));
});

app.use((error, req, resp, next) => {
  console.log(new Date().toISOString(), error);

  resp
    .status(error.code || 500)
    .json(error.message || { message: "Error occurred" });
});

mongoose.connect(
  process.env.MONGO_URL_LOCAL || process.env.MONGO_URL_PROD,
  () => {
    console.log(
      "Successfully connected to the database. Starting the server now..."
    );

    app.server = app.listen(PORT, () => {
      console.log(
        "Using mongo URL:",
        process.env.MONGO_URL_LOCAL || process.env.MONGO_URL_PROD
      );
      console.log("Server started.");
      console.log("Running on port " + PORT);
    });
  }
);

module.exports = app;
