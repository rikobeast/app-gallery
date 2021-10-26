import React, { forwardRef } from "react";

const InputField = forwardRef((props, ref) => (
  <>
    <div className="input-container">
      {props.value ? <label>{props.value}</label> : null}
      <input
        style={props.style}
        className={props.className}
        placeholder={props.placeholder}
        ref={ref}
        type={props.type}
        onChange={props.onChange}
        accept={props.accept}
        required
      />
      {props.icon ? (
        <span onClick={props.onClick} className="toggle-visible">
          {props.icon}
        </span>
      ) : null}
      {props.validationCheckIcon ? (
        <span className="validation-check">{props.validationCheckIcon}</span>
      ) : null}
    </div>
  </>
));

export default InputField;
