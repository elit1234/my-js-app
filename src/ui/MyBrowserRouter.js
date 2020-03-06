import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import RandomJoke from "./pages/RandomJoke";
import Login from "./pages/Login";
import NBAPage from "./pages/NBA";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";

export default function MyBrowserRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/randomjoke" exact component={RandomJoke} />
        <Route path="/login" exact component={Login} />
        <Route path="/nba" exact component={NBAPage} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/admin" exact component={Admin} />

        <Route path="/admin/:activePage" component={Admin} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile/:editingUser" component={Profile} />
      </Switch>
    </Router>
  );
}
