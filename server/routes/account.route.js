const express = require("express");
const userController = require("../controller/user.controller");
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

router.get("/all", getAllUsers);

module.exports = router;
