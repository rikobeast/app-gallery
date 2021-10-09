import React, { useState, useEffect } from "react";
import Card from "./Card";
import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";
import "../styles/game-card.css";

function GameCardDisplay() {
  const [cards, setCards] = useState();
  const [error, setError] = useState("");

  async function getGames() {
    const { data } = await supabase.from("games").select();
    const { data: title } = await supabase.from("games").select("title");
    const { data: description } = await supabase
      .from("games")
      .select("description");
    const { data: price } = await supabase.from("games").select("price");
    const { data: developer } = await supabase
      .from("games")
      .select("developer");
    const cardArray = [];
    const titles = [];
    const descriptions = [];
    const prices = [];
    const developers = [];

    if (data.length === 0) {
      setError("Sorry... There aren't any games yet.");
    } else {
      for (let index = 0; index < data.length; index++) {
        const element = cardArray[index];
        cardArray.push(element);
      }
      for (var t in title) {
        titles.push(title[t]);
      }
      for (var desc in description) {
        descriptions.push(description[desc]);
      }
      for (var p in price) {
        prices.push(price[p]);
      }
      for (var dev in developer) {
        developers.push(developer[dev]);
      }
      const listCards = cardArray.map((item, index) => (
        <Card
          key={index}
          title={titles[index].title}
          description={descriptions[index].description}
          price={prices[index].price}
          developer={developers[index].developer}
        />
      ));
      setCards(listCards);
    }
  }
  useEffect(() => {
    if (!cards) getGames();
  });

  return (
    <div className="game-display-page">
      <div className={error ? "content-error" : "content-page"}>
        {error ? error : cards}
      </div>
    </div>
  );
}

export default GameCardDisplay;
