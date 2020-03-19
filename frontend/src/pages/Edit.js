import React, { useState, useEffect } from "react";
import { Navbar, Card, Image, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import Slider from "react-input-slider";
import pets from "./swipe/dataSlot.json";
import { connect } from "react-redux";
import { getAllPet, getDetailPet, updatePet } from "../_actions/pet";
import { getAllAges } from "../_actions/age";
import { getAllSpecies } from "../_actions/species";
import { getPayment } from "../_actions/payment";

const Edit = props => {
  const getPet = async () => {
    await props.getAllPet();
    await props.getDetailPet(localStorage.getItem("onPet"));
  };

  useEffect(() => {
    getPet();
    props.getAllAges();
    props.getAllSpecies();
    props.getPayment();
  }, []);
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    const res = await props.updatePet(localStorage.getItem("onPet"), data);
    if (res.action.type == "UPDATE_PET_FULFILLED") {
      setRedirect(true);
    }
  };
  const user = props.pet.detail.owner;
  const Token = localStorage.getItem("token");

  const fLogout = e => {
    e.preventDefault();
    localStorage.removeItem("onPet");
    localStorage.removeItem("token");
    window.location.reload();
  };
  return !props.auth.isLogin && !Token ? (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  ) : props.pet.loading && !user ? (
    <h1>Loading...</h1>
  ) : redirect ? (
    <Redirect
      to={{
        pathname: "/profile"
      }}
    />
  ) : (
    <div className="wrap">
      <div className="boxLeft">
        <LeftBoxContent
          user={user}
          Age={props.age}
          Species={props.species}
          flogout={fLogout}
        />
      </div>
      <div className="boxRight">
        <PetProfileEdit
          pet={props.pet.detail}
          Age={props.age}
          submit={handleSubmit}
        />
      </div>
    </div>
  );
};

function LeftBoxContent({ user, Age, Species, flogout }) {
  return (
    <>
      <Navbar
        style={{
          background: "#353b48"
        }}
      >
        <Link to="/profile">
          <Image
            src="https://www.vodafone.co.uk/cs/groups/public/documents/webcontent/img_800x800_chevron_leftshadow.png"
            width="30px"
            height="30px"
            roundedCircle
          />
        </Link>

        <Image
          className="ml-3"
          src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=358&q=80"
          width="50px"
          height="50px"
          roundedCircle
        />

        <h2
          style={{
            marginLeft: "1rem",
            color: "white"
          }}
        >
          Edit Pet
        </h2>
      </Navbar>
      <div className="mt-3 ml-2 mr-2">
        <h3
          style={{
            color: "white"
          }}
        >
          Account Setting
        </h3>
        <Card>
          <Card.Body>
            <Row>
              <Col>Email</Col>
              {user ? (
                <Col className="text-right">{user.email}</Col>
              ) : (
                <Col className="text-right">Loading</Col>
              )}
            </Row>
            <Row className="mt-3">
              <Col>Phone</Col>
              {user ? (
                <Col className="text-right">{user.phone}</Col>
              ) : (
                <Col className="text-right">Loading</Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      </div>

      <div className="mt-3 ml-2 mr-2">
        <h3
          style={{
            color: "white"
          }}
        >
          Account Setting
        </h3>
        <Card>
          <Card.Body>
            <SliderInput />
            <Form.Group className="mt-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Age</Form.Label>
              <Form.Control as="select" name="age">
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

            <Form.Group className="mt-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Species</Form.Label>
              <Form.Control as="select" name="species">
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
            <Row>
              <Col className="text-center">
                <Button className="btn btn-danger" onClick={flogout}>
                  Log Out
                </Button>
              </Col>
            </Row>
            <div></div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

function SliderInput() {
  const [state, setState] = useState({ x: 10, y: 10 });

  return (
    <div>
      <Row>
        <Col>Maximum Distance</Col>
        <Col className="text-right">{state.x + " Km"}</Col>
      </Row>
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => setState(state => ({ ...state, x }))}
      />
    </div>
  );
}

function PetProfileEdit({ pet, Age, submit }) {
  const [name, setName] = useState(pet.name);
  const [gender, setGender] = useState(pet.gender);
  const [age, setAge] = useState(pet.petAge.id);
  const [aboutpet, setAboutPet] = useState(pet.about_pet);

  const handleEdit = e => {
    e.preventDefault();
    // submit(e, "ckuaks");
    const data = {
      name,
      gender,
      age,
      about_pet: aboutpet
    };
    submit(e, data);
  };
  return (
    <div>
      <Card
        style={{
          width: "36vw",
          margin: "0 auto",
          float: "none",
          marginBottom: "10px",
          background: "white"
        }}
      >
        <div className="mt-1 mb-1 ml-1 mr-1">
          <Row className="mt-1 mb-1 ml-1 mr-1">
            <PetList pets={pets} />
            <div className="border mt-2" style={{ width: "100%" }}>
              <Form className="mt-1 mb-1 ml-1 mr-1">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pet Name"
                    defaultValue={name}
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    as="select"
                    name="age"
                    defaultValue={age}
                    onChange={e => {
                      setAge(e.target.value);
                    }}
                  >
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
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="age"
                    defaultValue={gender}
                    onChange={e => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Pet Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    defaultValue={aboutpet}
                    onChange={e => {
                      setAboutPet(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button
                  className="btn btn-success btn-block"
                  onClick={e => {
                    handleEdit(e);
                  }}
                >
                  Save
                </Button>
              </Form>
            </div>
          </Row>
        </div>
      </Card>
    </div>
  );
}

function PetList(props) {
  return props.pets.map(pets => (
    <Card
      className="bg-transparent fluid border"
      style={{
        width: "10vw",
        marginLeft: "1rem",
        marginTop: "1rem"
      }}
      key={pets.index}
    >
      <div
        style={{
          width: "150px",
          height: "20vh"
        }}
      >
        <img
          src={pets.pics}
          style={{
            width: "135px",
            height: "135px"
          }}
          className="img-thumbnail"
          alt="..."
        ></img>
      </div>
      <Row className="mb-1 mt-3">
        <Col className="text-center">
          <Button className="btn btn-danger ml-1">
            <i class="fas fa-times"></i>
          </Button>
        </Col>
      </Row>
    </Card>
  ));
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    age: state.age,
    species: state.species,
    pet: state.pet,
    payment: state.payment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPet: () => dispatch(getAllPet()),
    getDetailPet: id => dispatch(getDetailPet(id)),
    getAllAges: () => dispatch(getAllAges()),
    getAllSpecies: () => dispatch(getAllSpecies()),
    getPayment: () => dispatch(getPayment()),
    updatePet: (id, data) => dispatch(updatePet(id, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
