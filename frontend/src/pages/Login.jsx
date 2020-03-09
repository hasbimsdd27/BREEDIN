import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  return (
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
              Please login to use our services
            </p>
          </div>
          <div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="pass"
                />
              </Form.Group>
              <Link to="/main">
                <Button
                  variant="success"
                  className="btn btn-block"
                  type="Submit"
                >
                  Login
                </Button>
              </Link>

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
}
