const express = require("express");
const threadController = require("../controller/thread.controller");
const userController = require("../controller/user.controller");
const Thread = require("../models/thread");
const Post = require("../models/post");
const router = express.Router();
const doesUserExistByUserId = (id) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ id })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        reject("Failed to check if user exits");
      });
  });
};
const doesThreadExistByThreadId = (id) => {
  return new Promise((resolve, reject) => {
    threadController
      .checkThreadID( {id} )
      .then((doc) => {
        console.log(doc , doc.length , doc.length > 0)
        if (doc && doc.length && doc.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        reject("Failed to check if thread exists");
      });
  });
};

const addThread = async(req, res) => {
  if (req && req.body) {
    // Do more validation -> check if userId exists
    if (!req.body.userId || req.body.userId.length != 36){
      console.log("Invalid userID length: \nLength: ", req.body.userId.length)
      res.status(400); // Invalid ID length
    } else {
      const idExists = await doesUserExistByUserId(req.body.userId)
      if (!idExists){
        console.log("userID doesn't exist")
        return res.status(400); // ID doesn't exist
      }
    }

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

const addPost = async (req, res) => {
  if (req && req.body) {
    // Do more validation -> check if userId exists
    if (!req.body.userId || req.body.userId.length !== 36) {
      console.log("Invalid UserID length: \nLength: ", req.body.userId.length);
      return res.status(400).send("UserId is not valid"); // Invalid ID length
    } else {
      const idExists = await doesUserExistByUserId(req.body.userId);
      if (!idExists) {
        console.log("userID doesn't exist");
        return res.status(400).send("UserId is not valid"); // ID doesn't exist
      }
    }

    // Do more validation -> check if postID exists
    if (!req.body.threadId || req.body.threadId.length != 36){
      console.log("Invalid threadID length: \nLength: ", req.body.threadId.length)
      res.status(400); // Invalid ID length
    } else {
      const idExists = await doesThreadExistByThreadId(req.body.threadId)
      if (!idExists){
        console.log("threadID doesn't exist")
        return res.status(400); // ID doesn't exist
      }
    } // TODO

    // Create post object
    const post = new Post(req.body.threadId, req.body.message, req.body.userId);
    console.log("post", post);

    // Add user and return the added user
    threadController
      .addPost(post)
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        // Failed to add Post
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: err || "failed to add post",
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
router.post("/add", addThread);

router.post("/add-post", addPost);

// example: localhost:3000/thread/all
router.get("/all", getAllThreads);

// example: localhost:3000/thread/one?id=1b29376f-71d3-4c54-875c-cc1898a55819
router.get("/one", getOneThread);

// Export user router
module.exports = router;
