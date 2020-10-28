import React, { useState } from "react";
import { signUpUser } from "../../api/user";
import sha256 from "crypto-js/sha256";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(undefined);
  console.log("this.props in register", props);

  const handleClick = () => {
    // TODO: validate values
    var payload = {
      name: username,
      email: email,
      hashed_password: password,
    };

    console.log("values", payload);

    signUpUser(payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("registration successful");
          props.success(response.data);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePassword = (pass) => setPassword(sha256(pass).toString());

  return (
    <div>
      <h2>Sign-up</h2>

      <input
        id="name"
        alt="name"
        autoFocus
        name="name"
        placeholder="Enter your account Name"
        type="text"
        onChange={(event) => setUsername(event.target.value)}
      ></input>

      <br />

      <input
        id="email"
        alt="email"
        name="username"
        placeholder="Enter your Email"
        type="text"
        onChange={(event) => setEmail(event.target.value)}
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

export default Register;
