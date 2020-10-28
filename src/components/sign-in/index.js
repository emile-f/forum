import React, { useState } from "react";
import { signInUser } from "../../api/user";
import sha256 from "crypto-js/sha256";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  console.log("this.props in login", props);

  const handlePassword = (pass) => setPassword(sha256(pass).toString());

  const handleClick = () => {
    var payload = {
      email: username,
      password: password,
    };

    signInUser(payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("Login successful");
          props.success(response.data);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        onChange={(event) => setUsername(event.target.value)}
      ></input>
      <br />
      <input
        id="password"
        alt="password"
        name="password"
        placeholder="Enter your Password"
        type="password"
        onChange={(event) => handlePassword(event.target.value)}
      ></input>
      <br />
      <button onClick={handleClick}>Submit</button>
      <br />
      <div>{error ? error : ""}</div>
    </div>
  );
};

export default Login;
