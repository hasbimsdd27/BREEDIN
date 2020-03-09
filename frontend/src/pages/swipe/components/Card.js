import React from "react";
import PropTypes from "prop-types";
import { animated, interpolate } from "react-spring/hooks";
import Carousel from "nuka-carousel";

class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, data } = this.props;
    const { name, age, distance, text, pics } = data[i];

    return (
      <animated.div
        key={i}
        style={{
          transform: interpolate(
            [x, y],
            (x, y) => `translate3d(${x}px,${y}px,0)`
          )
        }}
      >
        <animated.div
          {...bind(i)}
          style={{
            transform: interpolate([rot, scale], trans)
          }}
        >
          <div
            style={{
              width: "18rem",
              height: "20rem"
            }}
          >
            <Carousel>
              {pics.map((pic, index) => (
                <img
                  src={pic}
                  key={index}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  alt="profilePicture"
                />
              ))}
            </Carousel>
            <h2 className="swipeh2">{name},</h2>
            <h2 className="swipeh2">{age}</h2>
            <h5 className="swipeh5">{distance}</h5>
            <h5 className="swipeh5">{text}</h5>
          </div>
        </animated.div>
      </animated.div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.string,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default Card;
