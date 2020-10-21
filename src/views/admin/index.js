import React, { Component } from "react";
import "./admin.css";
import Loader from "react-loader-spinner";
import { getAllUsers } from "../../api/user";

import UserList from "../../components/user-list";

class Admin extends Component {
  // initialize all needed variables
  constructor(props) {
    super(props);
    this.users = [];
    this.dataAvailable = false;
  }

  // triggers when the react component is ready and added to DOM
  componentDidMount() {
    console.log("Get admin ");
    this.get();
  }

  // Do api call to backend service
  get = () => {
    getAllUsers()
      .then((response) => {
        // On positive response
        console.log("data", response.data);

        // Insert users
        this.users = response.data;

        // Let UI know that the users are available
        this.dataAvailable = true;

        // Force update the UI
        // This is needed to update the UI
        // TODO: use states so we don't need to force update anymore
        this.forceUpdate();
      })
      .catch((err) => {
        // TODO: Show error message
        console.error("Failed to get all users", err);
      });
  };

  render() {
    return (
      <div className="admin">
        <h1>Admin page here</h1>
        <div className="container">
          {
            // Show loader until we load the user list
            this.dataAvailable ? (
              <UserList users={this.users} />
            ) : (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                className="loader"
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default Admin;
