import React, { useState, useEffect } from "react";
import "./thread.css";
import { withRouter, Redirect } from "react-router-dom";

const ThreadPage = (props) => {
  // declare states
  const [id, setId] = useState(undefined);
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    if (
      props.location &&
      props.location.state &&
      props.location.state.threadId
    ) {
      console.log("this.props", props);
      setId(props.location.state.threadId);
      console.log("id", id);
    } else {
      setRedirectToHome(true);
    }
  }, []);

  return (
    <div>
      {redirectToHome === true ? (
        <Redirect to="/" />
      ) : (
        <div className="thread">
          <h1>thread page here: id: {id}</h1>
        </div>
      )}
    </div>
  );
};

export default withRouter(ThreadPage);
