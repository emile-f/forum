import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Admin from "./views/admin";
import Feed from "./views/feed";
import Thread from "./views/thread";
import NotFound from "./views/notFound";
import NewThread from "./views/new-thread";
import Profile from "./views/profile";

import Header from "./components/header";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Feed />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/thread/new_thread">
          <NewThread />
        </Route>
        <Route path="/thread/:thread">
          <Thread />
        </Route>
        <Route path="/user/:username">
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
