import React, { forwardRef } from "react";

const TextAreaField = forwardRef((props, ref) => {
  const { hasError, isFocused } = props;
  const focusedStyles = {
    border: "1px solid red",
  };
  return (
    <div className="textarea-container">
      {props.value ? <label>{props.value}</label> : null}
      <textarea
        className={props.className}
        style={isFocused ? focusedStyles : props.style}
        onChange={props.onChange}
        onClick={props.onClick}
        placeholder={props.placeholder}
        isfocused={props.isFocused}
        ref={ref}
        required
      />
      {hasError ? <span className="input-error">{props.errorText}</span> : null}
    </div>
  );
});

export default TextAreaField;
