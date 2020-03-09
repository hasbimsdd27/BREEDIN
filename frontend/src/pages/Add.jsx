import React, { useState } from "react";
import { Navbar, Card, Image, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-input-slider";
import pets from "./swipe/dataSlot.json";

export default function Add() {
  return (
    <div className="wrap">
      <div className="boxLeft">
        <LeftBoxContent />
      </div>
      <div className="boxRight">
        <PetProfileEdit />
      </div>
    </div>
  );
}

function LeftBoxContent() {
  return (
    <>
      <Navbar
        style={{
          background: "#353b48"
        }}
      >
        <Link to="/profile">
          <Image
            src={"https://www.pngrepo.com/download/46477/left-chevron.png"}
            width="50px"
            height="50px"
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
          Add Pet
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
            <Form.Group className="mt-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Age</Form.Label>
              <Form.Control as="select" name="age">
                <option>Adult</option>
                <option>Kid</option>
                <option>Old</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mt-3" controlId="exampleForm.ControlSelect1">
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

function PetProfileEdit() {
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
                <Link to="/profile">
                  <Button className="btn btn-success btn-block">Save</Button>
                </Link>
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
