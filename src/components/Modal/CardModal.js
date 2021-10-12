import React from "react";
import "../../styles/CardModal.css";
import { RiCloseLine } from "react-icons/ri";

export const CardModal = (props) => {
  let iconStyles = {
    color: "whitesmoke",
    width: "30",
    height: "30",
  };
  const { openModal, setOpenModal } = props;

  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      {openModal ? (
        <div className="card-modal">
          <div className="window">
            <div className="window-content">
              <div className="close-modal">
                <button className="close" onClick={closeModal}>
                  <RiCloseLine style={iconStyles} />
                </button>
              </div>
              <div className="image-container">
                <img src={props.imageURL} alt="s" />
              </div>
              <div className="card-info-container">
                <h2 className="title">{props.title}</h2>
                <p className="description">{props.desc}</p>
                <p className="price">{props.price}</p>
                <p className="developer">{props.dev}</p>
              </div>
              <div className="button">
                <button id="buy-btn">Buy</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CardModal;
