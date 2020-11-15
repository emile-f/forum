import React from "react";
import "./header.css";
import { Link, withRouter } from "react-router-dom";
import { currentUser, signOut } from "../../service/user.service";

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
          <Link to="/stats">Stats</Link>
        </div>
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
      </nav>
    </header>
  );
};

export default withRouter(Header);
