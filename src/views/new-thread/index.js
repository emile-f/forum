import React, { useState } from "react";
import "./new-thread.css";
import { addThread } from "../../api/thread";
import { withRouter, Redirect } from "react-router-dom";
import TagsInput from "react-tagsinput";

const NewThread = (props) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    if (subject === "" || message === "") {
      setError("Please fill in all fields");
      return;
    }

    var payload = {
      subject: subject,
      message: message,
      tags: JSON.stringify(tags),
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
    <div className="new-thread">
      <h1>Add a thread</h1>

      <div>
        <label htmlFor="subject">Subject: </label>
        <input
          id="subject"
          alt="subject"
          autoFocus
          name="subject"
          placeholder="Enter thread subject"
          type="text"
          onChange={(event) => setSubject(event.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="message">Message: </label>
        <textarea
          id="message"
          alt="message"
          name="message"
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="tags">Tags: </label>
        <TagsInput id="tags" value={tags} onChange={setTags} />
      </div>

      <button onClick={handleClick}>Submit</button>

      <div className="error">{error ? error : ""}</div>
    </div>
  );
};

export default withRouter(NewThread);
