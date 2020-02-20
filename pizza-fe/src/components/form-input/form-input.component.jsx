import React from "react";

import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';


const FormInput = props => {
  const { name, label, formFeedback, ...otherProps } = props;
  
  return (
    <FormGroup>
      <Label for={name}>{ label }</Label>
      <Input 
        type="text" 
        name={name}
        id={name}
        required 
        {...otherProps}
      />
      {
        formFeedback && 
          <FormFeedback>
            { formFeedback }
          </FormFeedback>
      }
    </FormGroup>
  );
};

export default FormInput;