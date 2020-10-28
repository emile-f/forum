import React from "react";
import "./user-list.css";

// Go over amm users and insert them into a list
// for now this is a list element but in the future we will use a user component
function UserList(props) {
  const users = props.users;
  const listItems = users.map((user) => <li key={user.id}>{user.name}</li>);
  return <ul>{listItems}</ul>;
}

export default UserList;
