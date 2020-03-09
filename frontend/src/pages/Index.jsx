import React, { useState } from "react";
import { Navbar, Image, Row, Col, Card, Form, Button } from "react-bootstrap";
import pets from "./swipe/dataMatch.json";
import App from "./swipe/App";
import { Link } from "react-router-dom";

export default function IndexAPP() {
  const [navbar, setNavbar] = useState(true);
  function LeftBox() {
    return (
      <div className="boxLeft">
        <div>
          <Navbar
            style={{
              background: "#353b48"
            }}
          >
            <Link to="/profile">
              <Image
                src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=358&q=80"
                width="50px"
                height="50px"
                roundedCircle
              />
            </Link>
            <Form.Group
              style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
              controlId="exampleForm.ControlSelect1"
            >
              <Form.Control as="select">
                <option>Pet 1</option>
                <option>Pet 2</option>
                <option>Pet 3</option>
                <option>Pet 4</option>
                <option>Pet 5</option>
                <option>Pet 6</option>
              </Form.Control>
            </Form.Group>
          </Navbar>
        </div>
        <div>
          <h3 className="text-white ml-2 mt-2">Matched List</h3>
        </div>
        <div className="scroll-matched">
          <Row
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingTop: "1rem"
            }}
          >
            <PetList pets={pets} />
          </Row>
        </div>
      </div>
    );
  }

  function RightBox() {
    return (
      <div className="boxRight">
        <App />
        <div
          style={{
            marginTop: "80vh"
          }}
        >
          <Row>
            <Col className="text-center mt-2">
              <Button className="btn btn-warning">
                <i class="fas fa-sync-alt"></i>
              </Button>
              <Button className="btn btn-danger btn-lg ml-2">
                <i class="fas fa-times"></i>
              </Button>
              <Button className="btn btn-success btn-lg ml-2">
                <i class="fas fa-heart"></i>
              </Button>
              <Button className="btn ml-2 btn-primary">
                <i class="fas fa-bolt"></i>
              </Button>
            </Col>
          </Row>
          {navbar ? <BottomNav /> : <></>}
        </div>
      </div>
    );
  }

  function BottomNav() {
    return (
      <Row>
        <Navbar>
          <div
            className="container"
            style={{
              marginLeft: "4.5rem",
              marginTop: "0.5rem"
            }}
          >
            <Row>
              <div>
                <Button
                  className="btn btn-light"
                  onClick={() => setNavbar(false)}
                  style={{
                    marginLeft: "2rem"
                  }}
                >
                  <strong>Hide</strong>
                </Button>
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <Button className="btn btn-danger">
                  <i class="fas fa-chevron-left mr-2"></i> No
                </Button>
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <Button className="btn btn-success">
                  <i class="fas fa-chevron-right mr-2"></i>Yes
                </Button>
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <Button className="btn btn-primary">
                  <i class="fas fa-chevron-up mr-2"></i>Open Profile
                </Button>
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <Button className="btn btn-secondary">
                  <i class="fas fa-chevron-down mr-2"></i>Close Profile
                </Button>
              </div>
              <div style={{ marginLeft: "2rem" }}>
                <Button className="btn btn-dark">
                  <i class="fas fa-forward mr-2"></i>Next Photos
                </Button>
              </div>
            </Row>
          </div>
        </Navbar>
      </Row>
    );
  }
  return (
    <div className="wrap">
      <LeftBox />
      <RightBox />
    </div>
  );
}

function PetList(props) {
  return props.pets.map(pets => (
    <Col className="col-md-4 fluid">
      <Card
        className="bg-transparent fluid"
        key={pets.index}
        style={{
          height: "10rem",
          width: "7rem"
        }}
      >
        <div
          style={{
            width: "100px",
            height: "120px"
          }}
        >
          <img
            src={pets.pics}
            style={{
              width: "100%",
              height: "100%"
            }}
            className="img-thumbnail"
            alt="..."
          ></img>
        </div>

        <Card.Title className="text-white">
          <strong>{pets.name}</strong>
        </Card.Title>
      </Card>
    </Col>
  ));
}
