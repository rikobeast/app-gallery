import React from "react";
import "../styles/Card.css";

function Card(props) {
  return (
    <div className="card" onClick={props.onClick}>
      <div className="card-image">
        <img src={`${props.URL}`} alt="" />
        <div className="card-info">
          <div id="card-title">
            <h2>{props.title}</h2>
          </div>
          <div id="card-description">
            <small>{props.description}</small>
          </div>
          <div id="card-item-price">
            <p>{props.price}</p>
          </div>
          <div id="card-item-developer">
            <p>{props.developer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
