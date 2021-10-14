import React from "react";

function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      id={props.id}
      type={props.type}
      className={props.className}
    >
      {props.value}
    </button>
  );
}

export default Button;
