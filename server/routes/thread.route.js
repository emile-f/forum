const express = require("express");
const threadController = require("../controller/thread.controller");
const Thread = require("../models/thread");
const Post = require("../models/post");
const router = express.Router();

// Api: POST /accounts/signup
const addThread = (req, res) => {
  if (req && req.body) {
    // Do more validation -> check if userId exists

    // Create thread object
    const thread = new Thread(req.body.subject, req.body.userId);

    // create first post
    const post = new Post(thread.id, req.body.message, req.body.userId);

    // push post into thread
    thread.posts.push(post);

    console.log("thread", thread);

    // Add user and return the added user
    threadController
      .addThread(thread)
      .then((thread) => {
        res.json(thread);
      })
      .catch((err) => {
        // Failed to add thread
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: err || "failed to add thread",
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

const getAllThreads = (req, res) => {
  // read entire table
  threadController
    .readThreads()
    .then((threads) => {
      res.json(threads);
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

const getOneThread = (req, res) => {
  const id = req.query.id;

  // read entire table
  threadController
    .readThread(id)
    .then((thread) => {
      res.json(thread);
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

// Routes
router.post("/add", addThread);

// example: localhost:3000/thread/all
router.get("/all", getAllThreads);

// example: localhost:3000/thread/one?id=1b29376f-71d3-4c54-875c-cc1898a55819
router.get("/one", getOneThread);

// Export user router
module.exports = router;
