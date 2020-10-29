import React, { useState, useEffect } from "react";
import "./admin.css";
import Loader from "react-loader-spinner";
import { getAllUsers } from "../../api/user";
import { currentUser } from "../../service/user.service";

import UserList from "../../components/user-list";

const Admin = (props) => {
  const [users, setUsers] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        // On positive response
        console.log("data", response.data);

        // Insert users
        setUsers(response.data);

        // Let UI know that the users are available
        setDataAvailable(true);
      })
      .catch((err) => {
        // TODO: Show error message
        console.error("Failed to get all users", err);
      });
  }, []);

  return (
    <div className="admin">
      <h1>Admin page here</h1>
      <div>{JSON.stringify(currentUser)}</div>
      <div className="container">
        {
          // Show loader until we load the user list
          dataAvailable ? (
            <UserList users={users} />
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
};

export default Admin;
