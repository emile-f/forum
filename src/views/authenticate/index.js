import React, { Component } from "react";
import "./authenticate.css";
import { addUser } from "../../service/user.service";
import { withRouter, Redirect } from "react-router-dom";

import SignIn from "../../components/sign-in";
import SignUp from "../../components/sign-up";

class Authenticate extends Component {
  // initialize all needed variables
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      redirectToReferrer: false,
    };
  }

  loginSuccess = (data) => {
    console.log("Parent function called", data);
    addUser(data);
    this.setState(() => ({
      redirectToReferrer: true,
    }));
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div className="container">
        <button onClick={() => this.setState({ login: !this.state.login })}>
          Change sign-in/sign-up
        </button>
        {this.state.login ? (
          <SignIn success={this.loginSuccess} />
        ) : (
          <SignUp success={this.loginSuccess} />
        )}
      </div>
    );
  }
}

export default withRouter(Authenticate);
