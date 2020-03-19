import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { postLogin } from "../_actions/auth";

const Login = props => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const Token = localStorage.getItem("token");
  const handleSubmit = e => {
    const data = {
      email,
      password
    };
    props.postLogin(data);
  };

  return props.auth.isLogin || Token ? (
    <Redirect
      to={{
        pathname: "/main"
      }}
    />
  ) : (
    <div className="App-body-landing App-text">
      <div
        className="Login"
        style={{
          width: "20rem",
          marginTop: "20vh",
          height: "45vh",
          marginLeft: "2rem"
        }}
      >
        <div
          style={{
            paddingLeft: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            paddingRight: "1rem"
          }}
        >
          <div>
            <h3 className="text-center text-white">Login</h3>
            <p className="text-center text-white mb-3">
              {props.auth.error
                ? "Invalid Login, Please check your email or password"
                : props.auth.loading
                ? "Loading"
                : "Please login to use our services"}
            </p>
          </div>
          <div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="pass"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button
                variant="success"
                className="btn btn-block"
                onClick={e => {
                  handleSubmit(e);
                }}
              >
                Login
              </Button>

              <h6 className="text-white mt-2">
                Does't have account?{" "}
                <Link to="/register" className="text-white mt-2">
                  <u>Register</u>
                </Link>
              </h6>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postLogin: data => dispatch(postLogin(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
