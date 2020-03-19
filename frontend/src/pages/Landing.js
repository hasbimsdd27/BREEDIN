import React from "react";
import { Button, Navbar, Jumbotron } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const App = props => {
  const Token = localStorage.getItem("token");
  return props.auth.isLogin || Token ? (
    <Redirect
      to={{
        pathname: "/main"
      }}
    />
  ) : (
    <>
      <div className="App-body-landing">
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
          <Navbar.Brand href="#" className="App-tittle">
            <h2>Breednder</h2>
          </Navbar.Brand>
        </Navbar>

        <Jumbotron className="bg-transparent App-jumbotron">
          <h4 className="App-desc">
            Swipe <strong>RIGHT</strong> <br></br> Make Your Pet{" "}
            <strong>HAPPY</strong>
          </h4>
          <h4 className="text-white">
            <em>Find Your Pet's Match</em>
          </h4>
          <Link to="/register">
            <Button className="App-btn mt-3">Register</Button>
          </Link>
          <Link to="/login">
            <Button className="App-btn ml-3 mt-3">Login</Button>
          </Link>
        </Jumbotron>

        <Navbar fixed="bottom" className="App-footer">
          <h6 className="App-footer-text text-center">
            clicking enter, you agree to <u>our terms</u>. Learn how we process
            your data in our <u>Privacy Policy</u> and <u>Cookie Policy</u>
          </h6>
        </Navbar>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
