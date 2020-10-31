import React, { useState, useEffect } from "react";
import { addPost } from "../../api/thread";
import { currentUser } from "../../service/user.service";
import { Link, withRouter } from "react-router-dom";

import "./new-post.css";
// TODO: message when user is not logged in

const NewPost = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);
  const [needToLogin, setNeedToLogin] = useState(false);

  useEffect(() => {
    setThreadId(props.threadId);
    if (!currentUser.id) {
      setNeedToLogin(true);
    }
  }, []);

  const handleClick = () => {
    var payload = {
      threadId: threadId,
      message: message,
    };

    addPost(payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("Added Post success");
          // link to thread page
          console.log("post", response.data);
          const data = response.data;
          // convert to post object
          const post = {
            active: data.active,
            content: data.content,
            created: data.created,
            user: {
              name: currentUser.name,
              id: currentUser.id,
            },
          };
          props.success(post);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (needToLogin) {
    return (
      <div id={props.id} className="new-post">
        Please sign-in/sign-up to add a post.
        <Link
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        >
          <p className="button">Go to sign-in/sign-up</p>
        </Link>
      </div>
    );
  } else {
    return (
      <div id={props.id} className="new-post">
        <h1>Add post:</h1>

        <textarea
          id="message"
          alt="message"
          name="message"
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
        <button onClick={handleClick}>Submit</button>
        <div>{error ? error : ""}</div>
      </div>
    );
  }
};

export default withRouter(NewPost);
