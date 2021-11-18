import React, { forwardRef } from "react";

const InputField = forwardRef((props, ref) => {
  const { hasError, isFocused } = props;
  const focusedStyles = {
    border: "1px solid red",
  };
  return (
    <div className="input-container">
      {props.labelText ? <label>{props.labelText}</label> : null}
      <input
        className={props.className}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        style={isFocused ? focusedStyles : props.style}
        isfocused={props.isFocused}
        onClick={props.onClick}
        onChange={props.onChange}
        accept={props.accept}
        ref={ref}
        required
      />
      {props.icon ? (
        <span onClick={props.onClick} className="toggle-visible">
          {props.icon}
        </span>
      ) : null}
      {hasError ? <span className="input-error">{props.errorText}</span> : null}
    </div>
  );
});

export default InputField;
