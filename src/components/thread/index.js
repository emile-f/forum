import React from "react";
import "./thread.css";
import { Link } from "react-router-dom";

// Change the page in router to the correct querystring
// uses react-router linking
// we can restyle this to be in a nav bar

const Thread = (props) => {
  console.log("props", props);
  const threadHeader = "/thread/" + props.thread.subject;
  console.log("threadHeader", threadHeader);

  return (
    <Link
      to={{
        pathname: threadHeader,
        state: { threadId: props.thread.id },
      }}
    >
      <ul>
        <li>subject: {props.thread.subject}</li>
        <li>created: {props.thread.created}</li>
        <li>active: {props.thread.active}</li>
        <li>userId: {props.thread.userId}</li>
        <li>user: {JSON.stringify(props.thread.user)}</li>
        <li>id: {props.thread.id}</li>
      </ul>
      <hr />
    </Link>
  );
};

export default Thread;
