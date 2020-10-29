import React, { useState, useEffect } from "react";
import "./profile.css";
import { withRouter, Redirect } from "react-router-dom";

const Profile = (props) => {
  const [id, setId] = useState(undefined);
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    if (
      props.location &&
      props.location.state &&
      props.location.state.threadId
    ) {
      console.log("this.props", props);
      setId(props.location.state.id);
      console.log("id", id);
    } else {
      setRedirectToHome(true);
    }
  }, []);

  if (redirectToHome === true) {
    return <Redirect to="/" />;
  }

  return (
    <div className="profile">
      <h1>profile page here id: {this.id}</h1>
    </div>
  );
};

export default withRouter(Profile);
