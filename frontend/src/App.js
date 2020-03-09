import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import IndexAPP from "./pages/Index";
import ProfileAPP from "./pages/Profile";
import EditAPP from "./pages/Edit";
import CobaAPP from "./pages/Coba";
import AddAPP from "./pages/Add";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AnimatedSwitch } from "react-router-transition";

export default function App() {
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/profile">
          <ProfileAPP />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/coba">
          <CobaAPP />
        </Route>
        <Route path="/main">
          <IndexAPP />
        </Route>
        <Route path="/edit">
          <EditAPP />
        </Route>

        <Route path="/add">
          <AddAPP />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </AnimatedSwitch>
    </Router>
  );
}
