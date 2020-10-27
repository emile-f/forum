import React, { Component } from "react";
import { signInUser } from "../../api/user";
import sha256 from "crypto-js/sha256";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: undefined,
    };
    console.log("this.props", this.props);
  }

  handleClick() {
    var payload = {
      email: this.state.username,
      password: this.state.password,
    };

    signInUser(payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Login successful");
          this.props.success(response.data);
        } else if (response.status === 202) {
          this.setState({ error: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handlePassword = (pass) => {
    this.setState({ password: sha256(pass).toString() });
  };

  render() {
    return (
      <div>
        <h2>Sign-in</h2>

        <input
          id="email"
          alt="email"
          autoFocus
          name="username"
          placeholder="Enter your Email"
          type="text"
          onChange={(event) => this.setState({ username: event.target.value })}
        ></input>
        <br />
        <input
          id="password"
          alt="password"
          name="password"
          placeholder="Enter your Password"
          type="password"
          onChange={(event) => this.handlePassword(event.target.value)}
        ></input>
        <br />
        <button onClick={(event) => this.handleClick(event)}>Submit</button>
      </div>
    );
  }
}

export default Login;
