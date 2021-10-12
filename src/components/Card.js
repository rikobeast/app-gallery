import React from "react";
import "../styles/Card.css";

function Card(props) {
  return (
    <div className="card" onClick={props.onClick}>
      <div className="card-info">
        <h3 id="card-title">{props.title}</h3>
        <small id="card-description">{props.description}</small>
        <p id="card-item-price">{props.price}</p>
        <p id="card-item-developer">{props.developer}</p>
        <img src={`${props.URL}`} alt="" />
      </div>
    </div>
  );
}

export default Card;
