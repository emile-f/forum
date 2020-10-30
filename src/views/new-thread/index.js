import React, { useState } from "react";
import "./new-thread.css";
import { addThread } from "../../api/thread";
import { withRouter, Redirect } from "react-router-dom";

const NewThread = (props) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    var payload = {
      subject: subject,
      message: message,
    };

    addThread(payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("Added thread success");
          // link to thread page
          console.log("thread", response.data);
          setThreadId(response.data.id);
          setRedirect(true);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (redirect === true) {
    return (
      <Redirect
        to={{
          pathname: "/thread/" + threadId,
          state: { threadId: threadId },
        }}
      />
    );
  }

  return (
    <div className="thread">
      <h1>new-thread page here</h1>

      <input
        id="subject"
        alt="subject"
        autoFocus
        name="subject"
        placeholder="Enter thread subject"
        type="text"
        onChange={(event) => setSubject(event.target.value)}
      ></input>

      <br />

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

export default withRouter(NewThread);
