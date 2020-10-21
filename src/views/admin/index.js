import React, { Component } from "react";
import "./admin.css";
import Loader from "react-loader-spinner";
import { getAllUsers } from "../../api/user";

import UserList from "../../components/user-list";

/*
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
        className="loader"
      />
*/
class Admin extends Component {
  constructor(props) {
    super(props);
    this.users = [];
    this.dataAvailable = false;
  }

  componentDidMount() {
    console.log("Get admin ");
    this.get();
  }

  get = () => {
    getAllUsers()
      .then((response) => {
        console.log("data", response.data);
        this.users = response.data;
        this.dataAvailable = true;
        this.forceUpdate();
      })
      .catch((err) => {
        console.error("Failed to get all users", err);
      });
  };

  render() {
    return (
      <div className="admin">
        <h1>Admin page here</h1>
        <div className="container">
          {this.dataAvailable ? (
            <UserList users={this.users} />
          ) : (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              className="loader"
            />
          )}
        </div>
      </div>
    );
  }
}

export default Admin;
