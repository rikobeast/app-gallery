import React, { useState, useRef } from "react";
import "../styles/Discussions.css";
import InputField from "./InputField";

function Discussions() {
  const inputRef = useRef();
  const [error, setError] = useState();
  const [errorText, setErrorText] = useState();
  const [focused, setFocused] = useState();

  async function checkIfInputHasValue() {
    const inputValue = inputRef.current.value;
    let errors = [
      {
        text: "This field is required!",
      },
      {
        text: "The field can contain only letters!",
      },
    ];

    if (inputRef.current === document.activeElement) {
      setFocused(true);
      if (inputValue === "") {
        setError(true);
        setErrorText(errors[0].text);
      } else if (!isNaN(+`${inputValue}`)) {
        setError(true);
        setErrorText(errors[1].text);
      } else {
        setError(false);
        setFocused(false);
      }
    }
  }

  return (
    <div className="discussions-page">
      <InputField
        className="test-input"
        placeholder="Input 1"
        ref={inputRef}
        hasError={error}
        isFocused={focused}
        onClick={checkIfInputHasValue}
        onChange={checkIfInputHasValue}
        errorText={errorText}
      />
    </div>
  );
}

export default Discussions;
