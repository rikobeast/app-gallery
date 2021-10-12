import React, { useState, useRef } from "react";
import "../styles/Upload.css";
import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";

function Upload() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const gameTitleRef = useRef();
  const gameDescriptionRef = useRef();
  const gamePriceRef = useRef();
  const gameDevRef = useRef();
  const { user } = useAuth();
  const imageURL = {
    url: "",
  };

  async function uploadImage(e) {
    const file = e.target.files[0];

    const { data, error } = await supabase.storage
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
      setError(error.message);
    } else {
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
            <input type="text" id="title" ref={gameTitleRef} required />
          </div>
          <div className="input-container">
            <label htmlFor="image">Display image</label>
            <input
              type="file"
              id="image"
              onChange={uploadImage}
              required
            ></input>
          </div>
          <div className="input-container">
            <label htmlFor="description">Game description</label>
            <textarea
              type="text"
              id="description"
              ref={gameDescriptionRef}
              required
            ></textarea>
          </div>
          <div className="input-container">
            <label htmlFor="price">Game Price</label>
            <input type="text" id="price" ref={gamePriceRef} required></input>
          </div>
          <div className="input-container">
            <label htmlFor="developer">Developer</label>
            <input type="text" id="developer" ref={gameDevRef} required></input>
          </div>
          <button disabled={isLoading} onClick={handleUpload} id="upload-btn">
            {isLoading ? <span>Uploading...</span> : <span>Upload</span>}
          </button>
        </form>
      </div>
      <div className="upload-guidelines"></div>
    </div>
  );
}

export default Upload;
