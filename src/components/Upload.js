import React, { useState, useRef } from "react";
import "../styles/Upload.css";
import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";
import Button from "./Button";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
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

  let file;

  const getImageFile = (e) => {
    file = e.target.files[0];
  };

  const clicker = (e) => {
    e.preventDefault();
    const title = gameTitleRef.current.value;
    const description = gameDescriptionRef.current.value;
    const price = gamePriceRef.current.value;
    const developer = gameDevRef.current.value;
    const image = imageRef.current.value;
    if (
      title !== "" &&
      description !== "" &&
      price !== "" &&
      developer !== "" &&
      image !== ""
    ) {
      console.log(" In if ");
    } else {
      console.log(" Not In if ");
    }
  };

  async function handleUpload(e) {
    const title = gameTitleRef.current.value;
    const description = gameDescriptionRef.current.value;
    const price = gamePriceRef.current.value;
    const developer = gameDevRef.current.value;
    const image = imageRef.current.value;

    e.preventDefault();

    setIsLoading(true);
    setError("");

    //Input validations
    if (
      title !== "" &&
      description !== "" &&
      price !== "" &&
      developer !== "" &&
      image !== ""
    ) {
      //Image extension validation - if not .png, throw an error, else upload image and add the game into the database
      if (file.name.includes(".png")) {
        const { data } = await supabase.storage
          .from("card-images")
          .upload(`images/${file.name}`, file);

        const { publicURL } = supabase.storage
          .from("card-images")
          .getPublicUrl(`images/${file.name}`);

        imageURL.url = publicURL;

        const { error } = await supabase.from("games").upsert({
          uploaded_by: user?.id,
          image_url: imageURL.url,
          title: title,
          description: description,
          price: price,
          developer: developer,
        });
        // Error for the price field, can be only integer values
        if (error) {
          setSuccess("");
          setError("");
          setError(
            "The price field cannot be empty or contain special symbols or letters!"
          );
          setIsLoading(false);
        } else {
          //If everything is filled and the checks are fine, upload and clear inputs
          gameTitleRef.current.value = "";
          gameDescriptionRef.current.value = "";
          gamePriceRef.current.value = "";
          gameDevRef.current.value = "";
          imageRef.current.value = "";
          setSuccess("Game was uploaded successfully!");
          setIsLoading(false);
        }
      } else {
        //Error for incorrect image format
        imageRef.current.value = "";
        setError("");
        setError("Image is not the correct format.");
        setIsLoading(false);
      }
    } else {
      //Error if all or one of the fields is empty
      setError("");
      setError("Please fill out all the fields.");
      setIsLoading(false);
    }
  }
  return (
    <div className="page">
      <div className="upload-container">
        <form className="upload-form">
          <div className="form-header">Upload a game</div>
          <div className="notification-handling">
            <div className={success ? "success" : "error"}>
              {success ? success : error}
            </div>
          </div>
          <InputField type="text" placeholder="Title" ref={gameTitleRef} />
          <InputField
            type="file"
            placeholder="Image"
            accept="image/png"
            ref={imageRef}
            onChange={getImageFile}
          />
          <TextAreaField placeholder="Description" ref={gameDescriptionRef} />
          <InputField type="text" placeholder="Price" ref={gamePriceRef} />
          <InputField type="text" placeholder="Developer" ref={gameDevRef} />

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
