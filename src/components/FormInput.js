import React, { forwardRef } from "react";

const FormInput = forwardRef((props, ref) => (
  <>
    <label htmlFor={props.for}> {props.labelTitle} </label>
    <input
      type={props.type}
      className={props.className}
      id={props.id}
      placeholder={props.placeholder}
      ref={ref}
      required={props.required}
      errorStyle={props.errorStyle}
      onChange={props.onChange}
    />
  </>
));

export default FormInput;
