import React, { Component } from "react";
import "./thread.css";
import { withRouter } from "react-router-dom";

class Thread extends Component {
  // Initialize all variables
  constructor(props) {
    super(props);
    // Get the thread id from the query parameters
    this.id = this.props.match.params.thread;
  }

  componentDidMount() {
    console.log("this.props", this.props);
    console.log("id", this.id);
  }

  render() {
    return (
      <div className="thread">
        <h1>thread page here: id: {this.id}</h1>
      </div>
    );
  }
}

export default withRouter(Thread);
