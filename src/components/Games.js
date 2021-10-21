import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import { supabase } from "../supabase";
import { CardModal } from "./Modal/CardModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "../styles/Games.css";

function GameCardDisplay() {
  const [cards, setCards] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalDesc, setModalDesc] = useState();
  const [modalPrice, setModalPrice] = useState();
  const [modalUrl, setModalUrl] = useState();
  const [modalDev, setModalDev] = useState();
  const cardArray = [];
  const titles = [];
  const descriptions = [];
  const prices = [];
  const developers = [];
  const imageURLs = [];

  const iconStyles = {
    color: "007fc4",
    width: "50",
    height: "50",
  };

  const memoizedHandleClick = useCallback(
    () => {
      setToggle(true);
    },
    [] // Tells React to memoize regardless of arguments.
  );
  const getCardTitle = (title) => {
    setModalTitle(title);
  };
  const getCardDescription = (desc) => {
    setModalDesc(desc);
  };
  const getCardPrice = (price) => {
    setModalPrice(price);
  };
  const getCardImageURL = (url) => {
    setModalUrl(url);
  };
  const getCardDeveloper = (dev) => {
    setModalDev(dev);
  };

  async function getGames() {
    setLoading(true);
    const { data } = await supabase.from("games").select();
    const { data: title } = await supabase.from("games").select("title");
    const { data: description } = await supabase
      .from("games")
      .select("description");
    const { data: price } = await supabase.from("games").select("price");
    const { data: imageURL } = await supabase.from("games").select("image_url");
    const { data: developer } = await supabase
      .from("games")
      .select("developer");

    if (data.length === 0) {
      setLoading(false);
      setError("Sorry... There aren't any games yet.");
    } else {
      for (let index = 0; index < data.length; index++) {
        const element = cardArray[index];
        cardArray.push(element);
      }

      for (var t in title) {
        titles.push(title[t]);
      }
      for (var d in description) {
        descriptions.push(description[d]);
      }
      for (var p in price) {
        prices.push(price[p]);
      }
      for (var dev in developer) {
        developers.push(developer[dev]);
      }
      for (var url in imageURL) {
        imageURLs.push(imageURL[url]);
      }

      const listCards = cardArray.map((item, index) => (
        <Card
          key={index}
          URL={imageURLs[index].image_url}
          title={titles[index].title}
          description={descriptions[index].description}
          price={`${prices[index].price}$`}
          developer={developers[index].developer}
          onClick={() => {
            memoizedHandleClick();
            getCardTitle(titles[index].title);
            getCardDescription(descriptions[index].description);
            getCardPrice(`${prices[index].price}$`);
            getCardDeveloper(developers[index].developer);
            getCardImageURL(imageURLs[index].image_url);
          }}
        />
      ));
      setCards(listCards);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!cards) {
      getGames();
    }
  }, [modalTitle]);

  return (
    <>
      <CardModal
        title={modalTitle}
        desc={modalDesc}
        price={modalPrice}
        imageURL={modalUrl}
        dev={modalDev}
        openModal={toggle}
        setOpenModal={setToggle}
      />
      <div className="game-display-page">
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <AiOutlineLoading3Quarters style={iconStyles} />
            </div>
          </div>
        ) : (
          <div className={error ? "content-error" : "content-page"}>
            {error ? error : cards}
          </div>
        )}
      </div>
    </>
  );
}

export default GameCardDisplay;
