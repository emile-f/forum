import React, { useState, useEffect } from "react";
import { addPost } from "../../api/thread";
import { currentUser } from "../../service/user.service";

// TODO: message when user is not logged in

const NewPost = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);

  useEffect(() => {
    setThreadId(props.threadId);
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

  return (
    <div className="thread">
      <h1>New Post</h1>

      <textarea
        id="message"
        alt="message"
        name="message"
        onChange={(event) => setMessage(event.target.value)}
      ></textarea>

      <br />

      <button onClick={handleClick}>Submit</button>

      <br />

      <div>{error ? error : ""}</div>
    </div>
  );
};

export default NewPost;
