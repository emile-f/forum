import React, { Component } from "react";
import { signUpUser } from "../../api/user";
import sha256 from "crypto-js/sha256";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      error: undefined,
    };
    console.log("this.props", this.props);
  }

  handleClick() {
    // TODO: validate values
    var payload = {
      name: this.state.first_name + " " + this.state.last_name,
      email: this.state.email,
      hashed_password: this.state.password,
    };

    console.log("values", payload);

    signUpUser(payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("registration successful");
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
        <h2>Sign-up</h2>

        <input
          id="first-name"
          alt="first-name"
          autoFocus
          name="first-name"
          placeholder="Enter your First Name"
          type="text"
          onChange={(event) =>
            this.setState({ first_name: event.target.value })
          }
        ></input>

        <br />

        <input
          id="last-name"
          alt="last-name"
          name="last-name"
          placeholder="Enter your Last Name"
          type="text"
          onChange={(event) => this.setState({ last_name: event.target.value })}
        ></input>

        <br />

        <input
          id="email"
          alt="email"
          name="username"
          placeholder="Enter your Email"
          type="text"
          onChange={(event) => this.setState({ email: event.target.value })}
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

        <button onClick={() => this.handleClick()}>Submit</button>

        <br />

        <div>{this.state.error ? this.state.error : ""}</div>
      </div>
    );
  }
}

export default Register;
