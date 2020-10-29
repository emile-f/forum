import React, { useState } from "react";
import "./authenticate.css";
import { addUser } from "../../service/user.service";
import { withRouter, Redirect } from "react-router-dom";

import SignIn from "../../components/sign-in";
import SignUp from "../../components/sign-up";

const Authenticate = (props) => {
  const [login, setLogin] = useState(true);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const loginSuccess = (data) => {
    console.log("Parent function called", data);
    addUser(data);
    setRedirectToReferrer(true);
  };

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
    <div className="container">
      <button onClick={() => setLogin(!login)}>Change sign-in/sign-up</button>
      {login ? (
        <SignIn success={loginSuccess} />
      ) : (
        <SignUp success={loginSuccess} />
      )}
    </div>
  );
};

export default withRouter(Authenticate);
