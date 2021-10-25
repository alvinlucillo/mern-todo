const express = require("express");
const HttpError = require("../model/http-error");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const User = require("../model/user");
const checkAuth = require("../middleware/checkAuth");

router.post("/check", checkAuth(process.env.SECRET), async (req, res, next) => {
  return res.json({ auth: true });
});

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  let user;

  try {
    user = await User.findOne({ username });
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (user) {
    return next(new HttpError("Username already exists.", 422));
  }

  let hashedPw = "";
  try {
    hashedPw = await bcrypt.hash(password + process.env.SECRET, 12);
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  user = new User({
    username: username,
    password: hashedPw,
    date_created: new Date().toISOString(),
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (!user) {
    return next(
      new HttpError("Unable to create a user, please try again", 500)
    );
  }

  return res.status(201).json({ userid: user.id, username: user.username });
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  let user;

  try {
    user = await User.findOne({ username });
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (!user) {
    return next(
      new HttpError(
        "User doesn't exist. Check your username and/or password.",
        404
      )
    );
  }

  let isPwValid = false;
  try {
    isPwValid = await bcrypt.compare(
      password + process.env.SECRET,
      user.password
    );
  } catch (err) {
    console.log(err);
    return next(new HttpError());
  }

  if (!isPwValid) {
    return next(
      new HttpError(
        "User doesn't exist. Check your username and/or password.",
        404
      )
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      process.env.SECRET,
      { expiresIn: "15m" }
    );
  } catch (err) {
    console.log(err);
    return next(new Error("Unable to create token"));
  }

  return res.json({
    userid: user.id,
    username: user.username,
    token,
  });
});

module.exports = router;
