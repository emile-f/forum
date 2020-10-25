import React, { Component } from "react";
import { signInUser } from "../../api/user";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleClick() {
    var payload = {
      email: this.state.username,
      password: this.state.password,
    };
    signInUser(payload)
      .then((response) => {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successful");
        } else if (response.data.code === 204) {
          console.log("Username password do not match");
          alert("username password do not match");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
          onChange={(event) => this.setState({ password: event.target.value })}
        ></input>
        <br />
        <button onClick={(event) => this.handleClick(event)}>Submit</button>
      </div>
    );
  }
}

export default Login;
