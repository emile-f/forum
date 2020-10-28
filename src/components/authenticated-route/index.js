// React router AuthenticatedRoute
// https://stackoverflow.com/questions/48954262/react-router-force-to-another-page-if-a-variable-doesnt-exist

import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { currentUser } from "../../service/user.service";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      currentUser.id ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default withRouter(AuthenticatedRoute);
