import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllAges } from "../_actions/age";
import { getAllSpecies } from "../_actions/species";
import { postRegister } from "../_actions/auth";

const Register = props => {
  useEffect(() => {
    props.getAllAges();
    props.getAllSpecies();
  }, []);

  const Age = props.age;
  const Species = props.species;
  const Token = localStorage.getItem("token");

  const [breeder, setBreeder] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petGender, setPetGender] = useState(null);
  const [spesiesId, setSpesiesId] = useState(null);
  const [ageId, setAgeId] = useState(null);

  const handleSubmit = e => {
    const data = {
      breeder,
      email,
      password,
      phone,
      address,
      pet: {
        name: petName,
        gender: petGender,
        spesies: { id: spesiesId },
        age: { id: ageId }
      }
    };
    props.postRegister(data);
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
          height: "21rem",
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
              {props.auth.error
                ? "Invalid Register, Please check your field"
                : props.auth.loading
                ? "Loading"
                : "Please login to use our services"}
            </p>
          </div>
          <div className="RegisterMenu">
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Breeder"
                  name="breeder"
                  onChange={e => {
                    setBreeder(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="pass"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Breeder Address"
                  name="address"
                  onChange={e => {
                    setAddress(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Pet Name"
                  name="pet"
                  onChange={e => {
                    setPetName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="select"
                  name="gender"
                  onChange={e => {
                    setPetGender(e.target.value);
                  }}
                >
                  <option value="">-Select Pet Gender-</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="select"
                  name="age"
                  onChange={e => {
                    setAgeId(e.target.value);
                  }}
                >
                  <option value="">-Select Pet Age-</option>
                  {Age.data ? (
                    Age.data.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>Loading</option>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="select"
                  name="species"
                  onChange={e => {
                    setSpesiesId(e.target.value);
                  }}
                >
                  <option value="">-Select Pet Species-</option>
                  {Species.data ? (
                    Species.data.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option>Loading</option>
                  )}
                </Form.Control>
              </Form.Group>
            </Form>
          </div>

          <Button
            variant="success"
            className="btn btn-block"
            onClick={e => {
              handleSubmit(e);
            }}
          >
            Register
          </Button>

          <h6 className="text-white mt-2">
            Already have account?{" "}
            <Link to="/Login" className="text-white mt-2">
              <u>Login</u>
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    age: state.age,
    species: state.species
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllAges: () => dispatch(getAllAges()),
    getAllSpecies: () => dispatch(getAllSpecies()),
    postRegister: data => dispatch(postRegister(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
