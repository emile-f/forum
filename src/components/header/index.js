import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

// Change the page in router to the correct querystring
// uses react-router linking
// we can restyle this to be in a nav bar

const Header = (props) => {
  return (
    <header className="active" id="scroll-header">
      <nav>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/thread/new_thread">New thread</Link>
          {/* <Link to="/user/:profile_name">profile</Link> */}
          {/* <Link to="/admin">Admin</Link> */}
        </div>
        <div className="filler">Search here</div>
        <div className="login">
          <Link to="/login">Sign-In/Sign-up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
