const express = require("express");
const userController = require("../controller/user.controller");
const User = require("../models/user");
const router = express.Router();

const getAllUsers = (req, res) => {
  // read entire table
  userController
    .readUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

const signup = (req, res) => {
  if (req && req.body) {
    const newUser = User.from(req.body);

    console.log("newUser", newUser);
    userController
      .addUser(newUser)
      .then((users) => {
        console.log("users", users);
        res.json(users);
      })
      .catch((err) => {
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: err || "failed to signup",
        });
      });
  } else {
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

router.get("/all", getAllUsers);
router.post("/signup", signup);

module.exports = router;
