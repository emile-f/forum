import React, { Component } from "react";
import "./new-thread.css";
import { currentUser } from "../../service/user.service";

class newThread extends Component {
  render() {
    return (
      <div className="thread">
        <h1>new-thread page here</h1>
        <div>{JSON.stringify(currentUser)}</div>
      </div>
    );
  }
}

export default newThread;
