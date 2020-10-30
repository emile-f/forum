import React from "react";
import "./user-list.css";
import Thread from "../thread";

function ThreadList(props) {
  const threads = props.threads;
  console.log("threads", threads);
  const listItems = threads.map((thread) => (
    <Thread key={thread.id} thread={thread} />
  ));
  return <React.Fragment>{listItems}</React.Fragment>;
}

export default ThreadList;
