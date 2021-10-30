import React, { useState, useRef, useReducer, useEffect } from "react";
import "../styles/Upload.css";
import { supabase } from "../supabase";
import { useAuth } from "../auth/AuthProvider";
import Button from "./Button";
import TextAreaField from "./TextAreaField";
import uploadInstructions from "../images/Upload_Instructions.svg";
import InputField from "./InputField";

function resetInputError(
  defaultErrorState,
  defaultFocusedState,
  defaultErrorText
) {
  return {
    errorText: defaultErrorText,
    isFocused: defaultFocusedState,
    hasError: defaultErrorState,
  };
}
const reducer = (state, action) => {
  switch (action.type) {
    case "TITLE_CLICK":
      return {
        titleErrorText: (state.errorText = "This field is required."),
        titleIsFocused: (state.isFocused = true),
        titleHasError: (state.hasError = true),
      };
    case "DESCRIPTION_CLICK":
      return {
        descriptionErrorText: (state.errorText = "This field is required."),
        descriptionIsFocused: (state.isFocused = true),
        descriptionHasError: (state.hasError = true),
      };
    case "PRICE_CLICK":
      return {
        priceErrorText: (state.errorText =
          "The field cannot contain letters or special symbols."),
        priceIsFocused: (state.isFocused = true),
        priceHasError: (state.hasError = true),
      };
    case "DEVELOPER_CLICK":
      return {
        developerErrorText: (state.errorText = "This field is required."),
        developerIsFocused: (state.isFocused = true),
        developerHasError: (state.hasError = true),
      };
    case "RESET":
      return resetInputError(action.payload);
    default:
      return state;
  }
};

function Upload() {
  const [state, dispatch] = useReducer(reducer, {
    titleHasError: false,
    titleIsFocused: false,
    titleErrorText: "",
    descriptionHasError: false,
    descriptionIsFocused: false,
    descriptionErrorText: "",
    priceHasError: false,
    priceIsFocused: false,
    priceErrorText: "",
    developerHasError: false,
    developerIsFocused: false,
    developerErrorText: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileState, setFileState] = useState();
  const gameTitleRef = useRef();
  const gameDescriptionRef = useRef();
  const gamePriceRef = useRef();
  const gameDevRef = useRef();
  const imageRef = useRef();
  const { user } = useAuth();
  const imageURL = {
    url: "",
  };

  async function checkIfInputHasValue() {
    const titleValue = gameTitleRef.current.value;
    const descriptionValue = gameDescriptionRef.current.value;
    const priceValue = gamePriceRef.current.value;
    const developerValue = gameDevRef.current.value;
    setError("");
    setSuccess("");

    if (gameTitleRef.current === document.activeElement) {
      if (titleValue === "") {
        dispatch({ type: "TITLE_CLICK" });
      } else {
        dispatch({ type: "RESET" });
      }
    } else if (gamePriceRef.current === document.activeElement) {
      if (isNaN(priceValue)) {
        dispatch({ type: "PRICE_CLICK" });
      } else {
        dispatch({ type: "RESET" });
      }
    } else if (gameDescriptionRef.current === document.activeElement) {
      if (descriptionValue === "") {
        dispatch({ type: "DESCRIPTION_CLICK" });
      } else {
        dispatch({ type: "RESET" });
      }
    } else if (gameDevRef.current === document.activeElement) {
      if (developerValue === "") {
        dispatch({ type: "DEVELOPER_CLICK" });
      } else {
        dispatch({ type: "RESET" });
      }
    }
  }

  const getImageFile = (e) => {
    //Image extension validation - if not .png, throw an error, else upload image and add the game into the database
    const file = e.target.files[0];
    setError("");
    setSuccess("");
    setFileState(file);
    if (!file.name.includes(".png")) {
      imageRef.current.value = "";
      setError("Image is not the correct format.");
      setFileState(null);
    }
  };

  async function handleUpload(e) {
    const title = gameTitleRef.current.value;
    const description = gameDescriptionRef.current.value;
    const price = gamePriceRef.current.value;
    const developer = gameDevRef.current.value;
    const image = imageRef.current.value;

    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    if (
      title !== "" &&
      description !== "" &&
      price !== "" &&
      developer !== "" &&
      image !== ""
    ) {
      const { data } = await supabase.storage
        .from("card-images")
        .upload(`images/${fileState.name}`, fileState);

      const { publicURL } = supabase.storage
        .from("card-images")
        .getPublicUrl(`images/${fileState.name}`);
      imageURL.url = publicURL;

      const { error } = await supabase.from("games").upsert({
        uploaded_by: user?.id,
        image_url: imageURL.url,
        title: title,
        description: description,
        price: price,
        developer: developer,
      });

      //If everything is filled and the checks are fine, upload and clear inputs
      gameTitleRef.current.value = "";
      gameDescriptionRef.current.value = "";
      gamePriceRef.current.value = "";
      gameDevRef.current.value = "";
      imageRef.current.value = "";
      setError("");
      setSuccess("Game was uploaded successfully!");
      setIsLoading(false);
    } else {
      setError("Please fill out all the fields!");
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <div className="page">
      <div className="upload-container">
        <div className="form-container">
          <form className="upload-form">
            <div className="form-header">Upload a game</div>
            {error || success ? (
              <div className="notification-handling">
                <div className={success ? "success" : "error"}>
                  {success ? success : error}
                </div>
              </div>
            ) : null}

            <InputField
              className="test-input"
              type="text"
              placeholder="Title"
              ref={gameTitleRef}
              hasError={state.titleHasError}
              isFocused={state.titleIsFocused}
              onClick={checkIfInputHasValue}
              onChange={checkIfInputHasValue}
              errorText={state.titleErrorText}
            />

            <InputField
              type="file"
              accept="image/png"
              ref={imageRef}
              onChange={getImageFile}
            />
            <TextAreaField
              className="test-input"
              placeholder="Description"
              ref={gameDescriptionRef}
              hasError={state.descriptionHasError}
              isFocused={state.descriptionIsFocused}
              onClick={checkIfInputHasValue}
              onChange={checkIfInputHasValue}
              errorText={state.descriptionErrorText}
            />
            <InputField
              className="test-input"
              type="text"
              placeholder="Price"
              ref={gamePriceRef}
              hasError={state.priceHasError}
              isFocused={state.priceIsFocused}
              onClick={checkIfInputHasValue}
              onChange={checkIfInputHasValue}
              errorText={state.priceErrorText}
            />
            <InputField
              className="test-input"
              type="text"
              placeholder="Developer"
              ref={gameDevRef}
              hasError={state.developerHasError}
              isFocused={state.developerIsFocused}
              onClick={checkIfInputHasValue}
              onChange={checkIfInputHasValue}
              errorText={state.developerErrorText}
            />

            <Button
              disabled={
                isLoading ||
                state.titleHasError ||
                state.descriptionHasError ||
                state.priceHasError ||
                state.developerHasError ||
                !fileState
              }
              onClick={handleUpload}
              id="upload-btn"
              value={
                isLoading ? <span>Uploading...</span> : <span>Upload</span>
              }
            />
          </form>
        </div>
      </div>
      <div className="upload-guidelines">
        <img src={uploadInstructions} alt="instructions" />
      </div>
    </div>
  );
}

export default Upload;
