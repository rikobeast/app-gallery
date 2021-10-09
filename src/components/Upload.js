import React, { useState, useRef } from "react";
import "../styles/upload.css";
import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";

function Upload() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const gameTitleRef = useRef();
  const gameDescriptionRef = useRef();
  const gamePriceRef = useRef();
  const gameDevRef = useRef();
  const { user } = useAuth();

  async function handleUpload(e) {
    const title = gameTitleRef.current.value;
    const description = gameDescriptionRef.current.value;
    const price = gamePriceRef.current.value;
    const developer = gameDevRef.current.value;

    e.preventDefault();
    setError("");
    const { data, error } = await supabase.from("games").upsert({
      uploaded_by: user?.id,
      title: title,
      description: description,
      price: price,
      developer: developer,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Game was uploaded successfully!");
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
            <input type="text" id="title" ref={gameTitleRef} />
          </div>
          <div className="input-container">
            <label htmlFor="image">Display image</label>
            <input type="file" id="image"></input>
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
            <input type="text" id="price" ref={gamePriceRef}></input>
          </div>
          <div className="input-container">
            <label htmlFor="developer">Developer</label>
            <input type="text" id="developer" ref={gameDevRef}></input>
          </div>
          <button onClick={handleUpload} id="upload-btn">
            Upload
          </button>
        </form>
      </div>
      <div className="upload-guidelines"></div>
    </div>
  );
}

export default Upload;
