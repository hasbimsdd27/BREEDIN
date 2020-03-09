import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import Slider from "react-input-slider";
import pets from "./swipe/dataSlot.json";
import petsData from "./swipe/dataSlot.json";

export default function Profile(props) {
  const [position, setPosition] = useState("profile");
  return (
    <div className="wrap">
      <div className="boxLeft">
        <LeftBoxContent />
      </div>
      <div className="boxRight">
        {position === "profile" ? <PetProfile /> : (position === "edit" ? (<PetProfileEdit />):())}
      </div>
    </div>
  );

  function LeftBoxContent() {
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
                <Col className="text-right">dummy@dummy.com</Col>
              </Row>
              <Row className="mt-3">
                <Col>Phone</Col>
                <Col className="text-right">08212345678</Col>
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
                  <option>Adult</option>
                  <option>Kid</option>
                  <option>Old</option>
                </Form.Control>
              </Form.Group>

              <Form.Group
                className="mt-3"
                controlId="exampleForm.ControlSelect1"
              >
                <Form.Label>Species</Form.Label>
                <Form.Control as="select" name="species">
                  <option>Cat</option>
                  <option>Dog</option>
                  <option>Deer</option>
                </Form.Control>
              </Form.Group>
              <Row>
                <Col className="text-center">
                  <Link to="/">
                    <Button className="btn btn-danger">Log Out</Button>
                  </Link>
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

  function PetProfile(props) {
    const [show, setShow] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const [premium, setPremium] = useState(false);

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
          {premium ? (
            <Link to="/add">
              <button
                className="btn btn-addpet text-white"
                style={{ marginLeft: "55rem", marginTop: "1vh" }}
                onClick={() => {
                  setPremium(false);
                }}
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
                      <strong>Pet Name</strong>
                    </h5>
                  </Col>
                  <Col className="text-muted text-right">
                    <h5>Pet Species</h5>
                  </Col>
                </Row>

                <h6>
                  <i className="fas fa-user-alt mr-2"></i>
                  <strong>..Breeder</strong>
                </h6>
                <h6>
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <strong>..km</strong> from you
                </h6>

                <h6>
                  <i className="fas fa-venus-mars  mr-2"></i>
                  <strong>..Old..-..gender..</strong>
                </h6>
                <h6>
                  <i className="fas fa-phone mr-2"></i>
                  <strong>...Phone</strong>
                </h6>

                <h5 className="mt-3">
                  <strong>About Pet</strong>
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis et quasi cum perspiciatis placeat exercitationem
                  sequi nostrum ipsam cumque qui.
                </p>
              </div>
            </div>
          </div>

          <Button
            className="btn btn-success btn-block "
            onClick={() => setPosition("edit")}
          >
            Edit
          </Button>
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
                  setPremium(true);
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
  function PetProfileEdit() {
    return (
      <div>
        <Card
          style={{
            width: "30rem",
            height: "37rem",
            margin: "0 auto",
            float: "none",
            marginTop: "1rem",
            background: "white",
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
          <div className="mt-1 mb-1 ml-1 mr-1">
            <Row className="mt-1 mb-1 ml-1 mr-1">
              <PetList pets={pets} />
              <div className="border mt-2" style={{ width: "100%" }}>
                <Form className="mt-1 mb-1 ml-1 mr-1">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control type="text" placeholder="Pet Name" />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Breeder</Form.Label>
                    <Form.Control type="text" placeholder="Breeder" />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Age</Form.Label>
                    <Form.Control as="select" name="age">
                      <option>Adult</option>
                      <option>Kid</option>
                      <option>Old</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" name="age">
                      <option>Male</option>
                      <option>Female</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Pet Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>

                  <Button
                    className="btn btn-success btn-block"
                    onClick={() => setPosition("profile")}
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
          <div class="image-upload">
            <label for="file-input">
              <img
                src={pets.pics}
                style={{
                  width: "135px",
                  height: "135px"
                }}
                className="img-thumbnail"
                alt="..."
              ></img>
            </label>

            <input id="file-input" type="file" />
          </div>
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
}
