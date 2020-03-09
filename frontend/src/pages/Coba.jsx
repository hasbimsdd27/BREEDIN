import React from "react";
import pets from "./swipe/data2.json";
import { Card, Col } from "react-bootstrap";

export default function Coba() {
  return (
    <div>
      <PetList pets={pets} />
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
            width: "8vw",
            height: "20vh"
          }}
        >
          <img
            src={pets.pics[0]}
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
