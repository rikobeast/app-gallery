import React, { useState, useEffect } from "react";
import "../../styles/CardModal.css";
import Button from "../Button";
import useScrollBlock from "../../hooks/useScrollBlock";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const CardModal = (props) => {
  let iconStyles = {
    color: "whitesmoke",
    width: "30",
    height: "30",
  };
  let loaderStyle = {
    color: "white",
    width: "28",
    height: "28",
  };

  const { openModal, setOpenModal } = props;
  const [blockScroll, allowScroll] = useScrollBlock();
  const [loading, setLoading] = useState();
  const [gameIsBought, setGameIsBought] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState();

  const closeModal = () => {
    setOpenModal(false);
  };

  async function showMessageOnGamePurchase() {
    //TODO Make it so the message is displayed only on the modal you've clicked, not for every card.
    setPurchaseMessage("Thank you for your purchase!");
    setGameIsBought(true);
    setLoading(false);
  }
  async function buyGame() {
    setLoading(true);
    setTimeout(() => {
      showMessageOnGamePurchase();
    }, 5000);
  }

  useEffect(() => {
    console.log(openModal);
    openModal ? blockScroll() : allowScroll();
  }, [openModal]);
  return (
    <>
      {openModal ? (
        <div className="card-modal">
          <div className="window">
            <div className="window-content">
              <div className="close-modal">
                <Button
                  className="close"
                  onClick={closeModal}
                  value={<RiCloseLine style={iconStyles} />}
                />
              </div>
              <div className="image-container">
                <img src={props.imageURL} alt="s" />
              </div>
              <div className="card-info-container">
                {!gameIsBought ? (
                  <>
                    <h2 className="title">{props.title}</h2>
                    <p className="description">{props.desc}</p>
                    <p className="price">{props.price}</p>
                    <p className="developer">{props.dev}</p>
                  </>
                ) : (
                  <span style={{ color: "lime" }}>{purchaseMessage}</span>
                )}
              </div>
              <div className="button">
                {!gameIsBought ? (
                  <Button
                    disabled={loading}
                    id="buy-btn"
                    onClick={buyGame}
                    value={
                      loading ? (
                        <div className="loader-container">
                          <span className="loader">
                            <AiOutlineLoading3Quarters style={loaderStyle} />
                          </span>
                        </div>
                      ) : (
                        "Buy"
                      )
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CardModal;
