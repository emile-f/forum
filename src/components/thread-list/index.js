import React from "react";
import Thread from "../thread";

function ThreadList(props) {
  const threads = props.threads;
  const listItems = threads.map((thread) => (
    <Thread clickable={true} key={thread.id} thread={thread} />
  ));
  return <React.Fragment>{listItems}</React.Fragment>;
}

export default ThreadList;
