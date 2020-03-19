import React, { useState, useEffect } from "react";
import {
  Navbar,
  Card,
  Image,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Carousel
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Slider from "react-input-slider";
// import pets from "./swipe/dataSlot.json";
// import petsData from "./swipe/dataSlot.json";
import { connect } from "react-redux";
import { getAllPet, getDetailPet } from "../_actions/pet";
import { getAllAges } from "../_actions/age";
import { getAllSpecies } from "../_actions/species";
import { getPayment } from "../_actions/payment";
import { logout } from "../_actions/auth";
const Profile = props => {
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
  const [logout, setLogout] = useState(false);
  const fLogout = e => {
    e.preventDefault();
    localStorage.removeItem("onPet");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const user = props.pet.detail.owner;
  const Token = localStorage.getItem("token");
  return !props.auth.isLogin && !Token ? (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  ) : props.pet.loading ||
    !user ||
    props.age.loading ||
    props.species.loading ||
    props.species.payment ? (
    <h1>Loading...</h1>
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
        <PetProfile pet={props.pet.detail} payment={props.payment.data} />
      </div>
    </div>
  );

  function LeftBoxContent({ user, Age, Species, flogout }) {
    return (
      <>
        <Navbar
          style={{
            background: "#353b48"
          }}
        >
          <Link to="/main">
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
            Pet Profile
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
              <Form.Group
                className="mt-3"
                controlId="exampleForm.ControlSelect1"
              >
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

              <Form.Group
                className="mt-3"
                controlId="exampleForm.ControlSelect1"
              >
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

  function PetProfile({ pet, payment }) {
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    return (
      <div>
        <Modal
          show={showMessage}
          onHide={() => {
            setShowMessage(false);
          }}
        >
          <Modal.Body className="text-center">
            <h3>Your transaction is being processed, Please wait</h3>
          </Modal.Body>
        </Modal>
        <Row>
          {payment.status == "premium" ? (
            <Link to="/add">
              <button
                className="btn btn-addpet text-white"
                style={{ marginLeft: "55rem", marginTop: "1vh" }}
              >
                Add Pet
              </button>
            </Link>
          ) : (
            <button
              className="btn btn-addpet text-white"
              onClick={() => setShow(true)}
              style={{ marginLeft: "55rem", marginTop: "1vh" }}
            >
              Add Pet
            </button>
          )}
        </Row>
        <div className="profileCard">
          <div
            style={{
              width: "15rem",
              marginLeft: "7.5rem",
              marginTop: "1rem",
              marginBottom: "1rem"
            }}
          >
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=358&q=80"
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="container descPet">
            <div className="card mt-1 mb-1">
              <div className="container mt-1">
                <Row>
                  <Col>
                    <h5>
                      <strong>{pet.name}</strong>
                    </h5>
                  </Col>
                  <Col className="text-muted text-right">
                    <h5>{pet.petSpecies.name}</h5>
                  </Col>
                </Row>

                <h6>
                  <i className="fas fa-user-alt mr-2"></i>
                  <strong>{pet.owner.breeder}</strong>
                </h6>
                <h6>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <strong>..km</strong> from you
                </h6>

                <h6>
                  <i className="fas fa-venus-mars  mr-2"></i>
                  <strong>
                    {pet.petAge.name} - {pet.gender}
                  </strong>
                </h6>
                <h6>
                  <i className="fas fa-phone mr-2"></i>
                  <strong>{pet.owner.phone}</strong>
                </h6>

                <h5 className="mt-3">
                  <strong>About Pet</strong>
                </h5>
                <p>{pet.about_pet}</p>
              </div>
            </div>
          </div>
          <Link to="/edit">
            <Button className="btn btn-success btn-block ">Edit</Button>
          </Link>
        </div>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Body>
            <h1 style={{ textAlign: "center" }}>
              <strong>PREMIUM!</strong>
            </h1>
            <h3 style={{ textAlign: "center" }}>
              Upgrade your Breednder and you can access the <strong>PRO</strong>{" "}
              feature
            </h3>
            <Form.Group controlId="exampleForm.ControlInput1" className="mt-5">
              <Form.Label>Your Rek Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="4000-1111-2222-3333"
                name="norek"
              />
            </Form.Group>
            <div className="custom-file">
              <input
                id="inputGroupFile01"
                type="file"
                className="custom-file-input"
              />
              <label className="custom-file-label" for="inputGroupFile01">
                Upload Your Screenshot Here
              </label>
            </div>
          </Modal.Body>

          <Row className="mb-1">
            <Col className="text-center">
              <Button
                className="btn btn-success btn-lg"
                onClick={() => {
                  setShowMessage(true);
                  setShow(false);
                }}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
};
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
    getPayment: () => dispatch(getPayment())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
