import React, { useState, useRef } from "react";
import "../styles/Upload.css";
import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";
import Button from "./Button";
import FormInput from "./FormInput";
import uploadInstructions from "../images/Upload_Instructions.svg";

function Upload() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const gameTitleRef = useRef();
  const gameDescriptionRef = useRef();
  const gamePriceRef = useRef();
  const gameDevRef = useRef();
  const imageRef = useRef();
  const { user } = useAuth();
  const imageURL = {
    url: "",
  };

  async function uploadImage(e) {
    const file = e.target.files[0];
    setError("");
    const { data } = await supabase.storage
      .from("card-images")
      .upload(`images/${file.name}`, file);

    const { publicURL } = supabase.storage
      .from("card-images")
      .getPublicUrl(`images/${file.name}`);

    imageURL.url = publicURL;
  }

  async function handleUpload(e) {
    const title = gameTitleRef.current.value;
    const description = gameDescriptionRef.current.value;
    const price = gamePriceRef.current.value;
    const developer = gameDevRef.current.value;

    e.preventDefault();

    setIsLoading(true);
    setError("");
    const { error } = await supabase.from("games").upsert({
      uploaded_by: user?.id,
      image_url: imageURL.url,
      title: title,
      description: description,
      price: price,
      developer: developer,
    });

    if (error) {
      setSuccess("");
      setError("");
      setError("The price field cannot contain special symbols or letters!");
      setIsLoading(false);
    } else {
      gameTitleRef.current.value = "";
      gameDescriptionRef.current.value = "";
      gamePriceRef.current.value = "";
      gameDevRef.current.value = "";
      setSuccess("Game was uploaded successfully!");
      setIsLoading(false);
    }
  }
  return (
    <div className="page">
      <div className="upload-container">
        <form className="upload-form">
          <h1 id="header">Upload a game</h1>
          <div className="notification-handling">
            <div className={success ? "success" : "error"}>
              {success ? success : error}
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="title">Game title</label>
            <FormInput type="text" id="title" ref={gameTitleRef} />
          </div>
          <div className="input-container">
            <label>Display image</label>
            <small>
              Take into consideration the instructions on the right, or the card
              image will look weird.
            </small>
            <FormInput
              accept="image/png"
              type="file"
              id="image"
              onChange={uploadImage}
              ref={imageRef}
            />
          </div>
          <div className="input-container">
            <label htmlFor="description">Game description</label>
            <textarea
              type="text"
              id="description"
              ref={gameDescriptionRef}
            ></textarea>
          </div>
          <div className="input-container">
            <label htmlFor="price">Game Price</label>
            <FormInput type="text" id="price" ref={gamePriceRef} />
          </div>
          <div className="input-container">
            <label htmlFor="developer">Developer</label>
            <FormInput type="text" id="developer" ref={gameDevRef} />
          </div>

          <Button
            disabled={isLoading}
            onClick={handleUpload}
            id="upload-btn"
            value={isLoading ? <span>Uploading...</span> : <span>Upload</span>}
          />
        </form>
      </div>
      <div className="upload-guidelines">
        <img src={uploadInstructions} alt="instructions" />
      </div>
    </div>
  );
}

export default Upload;
