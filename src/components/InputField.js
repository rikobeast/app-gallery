import React, { forwardRef } from "react";

const InputField = forwardRef((props, ref) => (
  <div className="input-container">
    {props.value ? <label>{props.value}</label> : null}
    <input
      className={props.className}
      placeholder={props.placeholder}
      required
      ref={ref}
      type={props.type}
      onChange={props.onChange}
      accept={props.accept}
    />
  </div>
));

export default InputField;
