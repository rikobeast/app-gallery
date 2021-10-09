import React from "react";
import "../styles/game-card.css";

function Card(props) {
  return (
    <div className="card" key={props.id}>
      <div className="card-info">
        <h3 id="card-title">{props.title}</h3>
        <small id="card-description">{props.description}</small>
        <p id="card-item-price">{props.price}</p>
        <p id="card-item-developer">{props.developer}</p>
      </div>
    </div>
  );
}

export default Card;
