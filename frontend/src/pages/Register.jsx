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
          height: "20rem",
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
            <h3 className="text-center text-white">Register</h3>
            <p className="text-center text-white mb-3">
              Please register to use our services
            </p>
          </div>
          <div className="RegisterMenu">
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Breeder"
                  name="breeder"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control type="email" placeholder="Email" name="email" />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="pass"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Breeder Address"
                  name="address"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" placeholder="Pet Name" name="pet" />
              </Form.Group>
              <Form.Group>
                <Form.Control as="select" name="gender">
                  <option value="">-Select Pet Gender-</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control as="select" name="age">
                  <option value="">-Select Pet Age-</option>
                  <option>Young</option>
                  <option>Adult</option>
                  <option>Old</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control as="select" name="species">
                  <option value="">-Select Pet Species-</option>
                  <option>Cat</option>
                  <option>Dog</option>
                  <option>Owl</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
          <Link to="/main">
            <Button variant="success" className="btn btn-block" type="Submit">
              Register
            </Button>
          </Link>
          <h6 className="text-white mt-2">
            Already have account?{" "}
            <Link to="/register" className="text-white mt-2">
              <u>Register</u>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
}
