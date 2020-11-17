import React from "react";
import "./header.css";
import { Link, withRouter } from "react-router-dom";
import { currentUser, signOut } from "../../service/user.service";

// Change the page in router to the correct querystring
// uses react-router linking
// we can restyle this to be in a nav bar

const Header = (props) => {
  return (
    <header role="banner" className="active" id="scroll-header">
      <nav role="navigation" className="menu">
        <Link aria-label="Navigate to Home page" to="/">Home</Link>
        <Link aria-label="Navigate to new thread page" to="/thread/new_thread">New thread</Link>
        <Link aria-label="Navigate to statistics page" to="/stats">Stats</Link>
      </nav>
      <div className="login">
        {currentUser.id ? (
          <div>
            <div className="user">Hello {currentUser.name}</div>
            <button onClick={signOut}> Logout </button>
          </div>
        ) : (
            <Link
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            >
              Sign-In/Sign-up
            </Link>
          )}
      </div>
    </header>
  );
};

export default withRouter(Header);
