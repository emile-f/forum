const express = require("express");
const userController = require("../controller/user.controller");
const User = require("../models/user");
const router = express.Router();

const doesUserExist = (email) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ email })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          reject("User already exists");
        } else {
          resolve();
        }
      })
      .catch(() => {
        reject("Failed to check if user exits");
      });
  });
};

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
const signUp = (req, res) => {
  if (req && req.body) {
    // Create user object from the POST body
    const newUser = User.from(req.body);
    console.log("newUser", newUser);
    // Check if the email is used already
    doesUserExist(newUser.email)
      .then(() => {
        // Add user and return the added user
        userController
          .addUser(newUser)
          .then((users) => {
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
      })
      .catch((err) => {
        res.status(202);
        res.send(err);
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

const signIn = (req, res) => {
  if (req && req.body) {
    const email = req.body.email;
    const hashed_password = req.body.password;
    userController
      .readUser({ email, hashed_password })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          res.json(doc[0]);
        } else {
          res.status(202);
          res.send("No user combination found with this email and password");
        }
      })
      .catch(() => {
        // Failed to sign-in user
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: "failed to sign-in",
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
router.post("/signup", signUp);
router.post("/signin", signIn);

// Export user router
module.exports = router;
