import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { validateUsernameAndEmail } from "../register.utils";

import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';


const RegisterMain = ({ path, history, handleChange, username, email, password, passwordConfirm }) => {
  const [validationStatus, setValidationStatus] = useState({
    emailRejected: null,
    usernameRejected: null,
    passwordLengthRejected: null,
    passwordRejected: null
  });

  const { emailRejected, usernameRejected, passwordLengthRejected, passwordRejected } = validationStatus;

  useEffect(() => {
    if (Object.values(validationStatus).every(result => result !== null && !result)) {
      history.push(`${path}/details`);
    }
  }, [validationStatus]);

  const handleFirstPortion = async e => {
    e.preventDefault();

    await setValidationStatus(validationStatus => {
      Object.keys(validationStatus).forEach(key => validationStatus[key] = null);
      return validationStatus;
    });

    const { usernameValidated, emailValidated } = await validateUsernameAndEmail(username, email);

    await setValidationStatus({
      emailRejected: !usernameValidated,
      usernameRejected: !emailValidated,
      passwordLengthRejected: password.length < 6,
      passwordRejected: password === passwordConfirm ? false : true
    });
  }

  return (
    <div>
      <Form onSubmit={handleFirstPortion}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input 
            type="text" 
            name="username" 
            id="username" 
            required 
            placeholder="John"

            invalid={ usernameRejected }

            value={ username }
            onChange={ handleChange }
          />
          <FormFeedback>Username taken. Please try another one.</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input 
            type="email" 
            name="email" 
            id="email" 
            required
            placeholder="John@hotmail.com"
            invalid={ emailRejected }
            
            value={ email }
            onChange={ handleChange }
          />
          <FormFeedback>
            Email registered. <Link to="/login">Login here</Link>
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input 
            type="password" 
            name="password" 
            id="password" 
            required
            invalid={ passwordLengthRejected }
            
            value={ password }
            onChange={ handleChange } 
          />
          <FormFeedback>Password must be more than six characters.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password-confirm">Confirm Password</Label>
          <Input 
            type="password" 
            name="passwordConfirm" 
            id="password-confirm"
            required
            invalid={ passwordRejected }
            
            value={ passwordConfirm }
            onChange={ handleChange } 
          />
          <FormFeedback>Passwords do not match.</FormFeedback>
        </FormGroup>

        <Button color="primary">Next</Button>
      </Form>
      <Link to="/login">Existing user? Login here</Link>
    </div>
  );
};

export default RegisterMain;