import React, { forwardRef } from "react";

const TextAreaField = forwardRef((props, ref) => (
  <div className="input-container">
    {props.value ? <label>{props.value}</label> : null}
    <textarea placeholder={props.placeholder} required ref={ref} />
  </div>
));

export default TextAreaField;
