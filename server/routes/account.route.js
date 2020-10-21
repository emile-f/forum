const express = require("express");
const userController = require("../controller/user.controller");
const User = require("../models/user");
const router = express.Router();

// Get all users
// Promise based functions readUsers is our database function
// Api: GET /accounts/all
const getAllUsers = (req, res) => {
  // read entire table
  userController
    .readUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      // Database call failed return 500 error
      res.status(500); // 500 Internal Server Error
      res.json({
        "status-code": 500,
        message: err || "failed request",
      });
    });
};

// Api: POST /accounts/signup
const signup = (req, res) => {
  if (req && req.body) {
    // Create user object from the POST body
    const newUser = User.from(req.body);
    console.log("newUser", newUser);

    // Add user and return the added user
    userController
      .addUser(newUser)
      .then((users) => {
        console.log("users", users);
        res.json(users);
      })
      .catch((err) => {
        // Failed to add user
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: err || "failed to signup",
        });
      });
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

// Routes
router.get("/all", getAllUsers);
router.post("/signup", signup);

// Export user router
module.exports = router;
