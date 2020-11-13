import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
// Route
import AuthenticatedRoute from "./components/authenticated-route";

// Pages
import Stats from "./views/stats";
import Feed from "./views/feed";
import Thread from "./views/thread";
import NotFound from "./views/not-found";
import NewThread from "./views/new-thread";
import Authenticate from "./views/authenticate";

// Components
import Header from "./components/header";

// Services
import { getUser } from "./service/user.service";

// Load cached user
getUser();

ReactDOM.render(
  <React.StrictMode>
    <Router >
      <Header />
      <div className="forum-body">
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route path="/stats" component={Stats} />
          <AuthenticatedRoute path="/thread/new_thread" component={NewThread} />
          <Route path="/thread/:thread" component={Thread} />
          <Route path="/login" component={Authenticate} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <footer>
        <div className="copyright">
          Copyright © 2020, David Pan and Emile Ferrand
        </div>
      </footer>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
