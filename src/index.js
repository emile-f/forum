import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

// Route
import AuthenticatedRoute from "./components/authenticated-route";

// Pages
import Admin from "./views/admin";
import Feed from "./views/feed";
import Thread from "./views/thread";
import NotFound from "./views/not-found";
import NewThread from "./views/new-thread";
import Profile from "./views/profile";
import Authenticate from "./views/authenticate";

// Components
import Header from "./components/header";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Feed} />
        <AuthenticatedRoute path="/admin" component={Admin} />
        <AuthenticatedRoute path="/thread/new_thread" component={NewThread} />
        <Route path="/thread/:thread" component={Thread} />
        <AuthenticatedRoute path="/user/:username" component={Profile} />
        <Route path="/login" component={Authenticate} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
