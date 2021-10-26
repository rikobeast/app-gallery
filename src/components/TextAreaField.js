import React, { forwardRef } from "react";

const TextAreaField = forwardRef((props, ref) => (
  <div className="input-container">
    {props.value ? <label>{props.value}</label> : null}
    <textarea
      onChange={props.onChange}
      placeholder={props.placeholder}
      ref={ref}
      required
    />
    {props.validationCheckIcon ? (
      <span className="validation-check">{props.validationCheckIcon}</span>
    ) : null}
  </div>
));

export default TextAreaField;
