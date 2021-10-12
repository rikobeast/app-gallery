import React, { useEffect } from "react";
import { supabase } from "../supabase";
import "../styles/CardDetails.css";

function CardDetails() {
  return (
    <div className="card-page">
      <div className="game-post-content">
        <div className="game-post-image-container">
          <img
            src="https://mlrgblouczagbxdupdkp.supabase.co/storage/v1/object/public/card-images/images/wotlk-arthas.jpg"
            alt="s"
          />
        </div>
        <div className="game-post-info">
          <div className="info-title">
            <h1 className="title">Title</h1>
          </div>
          <div className="info-desc">
            <p className="desc">Description</p>
          </div>
          <div className="info-price">
            <p className="price">Price</p>
          </div>
          <div className="info-dev">
            <h2 className="dev">Dev</h2>
          </div>
          <div className="info-button">
            <button className="button-buy">Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
