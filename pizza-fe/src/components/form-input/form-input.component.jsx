import React from "react";

import { FormGroup, Label, Input } from 'reactstrap';


const FormInput = props => {
  const { name, type, label, children, ...otherProps } = props;

  return (
    <FormGroup>
      <Label for={name} style={{ textTransform: "capitalize" }}>{ label ? label : name }</Label>
      <Input 
        type={ type || "text" }
        name={name}
        id={name}
        required 
        {...otherProps}
      />
      { children }
    </FormGroup>
  );
};

export default FormInput;