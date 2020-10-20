import React, { Component } from "react";
import "./profile.css";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.username;
  }

  componentDidMount() {
    console.log("this.props", this.props);
    console.log("id", this.id);
  }

  render() {
    return (
      <div className="profile">
        <h1>profile page here id: {this.id}</h1>
      </div>
    );
  }
}

export default withRouter(Profile);
