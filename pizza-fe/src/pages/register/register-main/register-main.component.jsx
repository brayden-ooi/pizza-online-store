import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FormInput from "../../../components/form-input/form-input.component";

import { validateUsernameAndEmail } from "../register.utils";

import { Button, Form, FormFeedback } from 'reactstrap';


const RegisterMain = ({ path, history, mainPage, setDetailEntry }) => {
  const { username, email, password, passwordConfirm } = mainPage;

  const [validationStatus, setValidationStatus] = useState({
    emailRejected: null,
    usernameRejected: null,
    passwordLengthRejected: null,
    passwordRejected: null
  });

  const { emailRejected, usernameRejected, passwordLengthRejected, passwordRejected } = validationStatus;

  useEffect(() => {
    if (Object.values(validationStatus).every(result => result !== null && !result)) {
      setDetailEntry(true);
      history.push(`${path}/details`);
    }
  }, [validationStatus]);

  const handleFirstPortion = async e => {
    e.preventDefault();

    // form reset to clean out prior errors
    await setValidationStatus(validationStatus => {
      Object.keys(validationStatus).forEach(key => validationStatus[key] = null);
      return validationStatus;
    });

    const { rejectedUsername, rejectedEmail } = await validateUsernameAndEmail(username, email);

    await setValidationStatus({
      emailRejected: rejectedEmail,
      usernamRejected: rejectedUsername,
      passwordLengthRejected: password.length < 6,
      passwordRejected: !(password === passwordConfirm)
    });
  }

  return (
    <div>
      <Form onSubmit={handleFirstPortion}>
        <FormInput
          name="username"
          placeholder="John"
          invalid={ usernameRejected }

          value={ username }
          onChange={ handleChange }
        >
          <FormFeedback>Username taken. Please try another one.</FormFeedback>
        </FormInput>

        <FormInput 
          name="email"
          type="email"
          placeholder="John@hotmail.com"
          invalid={ emailRejected }

          value={ email }
          onChange={ handleChange }
        >
          <FormFeedback>Email registered. <Link to="/login">Login here</Link></FormFeedback>
        </FormInput>

        <FormInput 
          name="password"
          type="password"
          invalid={ passwordLengthRejected }

          value={ password }
          onChange={ handleChange } 
        >
          <FormFeedback>Password must be more than six characters.</FormFeedback>
        </FormInput>

        <FormInput 
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          invalid={ passwordRejected }

          value={ passwordConfirm }
          onChange={ handleChange } 
        >
          <FormFeedback>Passwords do not match.</FormFeedback>
        </FormInput>

        <Button color="primary">Next</Button>
      </Form>
      <Link to="/login">Existing user? Login here</Link>
    </div>
  );
};

export default RegisterMain;