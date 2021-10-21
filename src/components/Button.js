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
      {props.icon}
    </button>
  );
}

export default Button;
