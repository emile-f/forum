import React, { Component } from "react";
import "./user-list.css";

function UserList(props) {
  const users = props.users;
  console.log("users", users);
  const listItems = users.map((user) => <li key={user.id}>{user.name}</li>);
  return <ul>{listItems}</ul>;
}

export default UserList;
