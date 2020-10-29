import React from "react";
import "./new-thread.css";
import { currentUser } from "../../service/user.service";

const newThread = () => {
  return (
    <div className="thread">
      <h1>new-thread page here</h1>
      <div>{JSON.stringify(currentUser)}</div>
    </div>
  );
};

export default newThread;
