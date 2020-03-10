import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import FormInput from "../../../components/form-input/form-input.component";

import { stateUpdate, correctedPayload } from "../../../reducers/form/form.utils";
import { validateUsernameAndEmail } from "../../../reducers/register/register.utils";

import { Button, Form, FormFeedback } from 'reactstrap';
import "./register-main.styles.scss";


const RegisterMain = ({ mainPage, validationStatus, formDispatch, setDetailEntry }) => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { username, email, password, passwordConfirm } = mainPage;
  const { validEmail, validUsername, passwordLength, passwordMatch } = validationStatus;
  
  const handleChange = (state, event) => correctedPayload("mainPage")(stateUpdate(state, event.target.name, event.target.value));
  const mainHandleChange = event => {
    formDispatch({ type: "FORM_CHANGE", payload: handleChange(mainPage, event) });
    console.log(handleChange(mainPage, event));
  };

  const handleMain = async e => {
    e.preventDefault();

    formDispatch({ type: "SUBMIT_START" });

    try {
      const { rejectUsername, rejectEmail } = await validateUsernameAndEmail({username, email});
      const currentValidationStatus = await {
        validEmail: !rejectEmail, // raise error if server decided to reject
        validUsername: !rejectUsername, // same
        passwordLength: password.length > 5,
        passwordMatch: (password === passwordConfirm)
      };

      await formDispatch({ type: "SUBMIT_RESULT", payload: currentValidationStatus });
      await (() => {
        if (Object.values(currentValidationStatus).every(result => result)) {
          setDetailEntry(true);
          history.push(`${path}/details`);
        };
      })();
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleMain} className="register-main">
        <FormInput
          name="username"
          placeholder="John"
          invalid={ validUsername }

          value={ username }
          onChange={ mainHandleChange }
        >
          <FormFeedback>Username taken. Please try another one.</FormFeedback>
        </FormInput>

        <FormInput 
          name="email"
          type="email"
          placeholder="John@hotmail.com"
          invalid={ validEmail }

          value={ email }
          onChange={ mainHandleChange }
        >
          <FormFeedback>Email registered. <Link to="/login">Login here</Link></FormFeedback>
        </FormInput>

        <FormInput 
          name="password"
          type="password"
          invalid={ passwordLength }

          value={ password }
          onChange={ mainHandleChange } 
        >
          <FormFeedback>Password must be more than six characters.</FormFeedback>
        </FormInput>

        <FormInput 
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          invalid={ passwordMatch }

          value={ passwordConfirm }
          onChange={ mainHandleChange } 
        >
          <FormFeedback>Passwords do not match.</FormFeedback>
        </FormInput>

        <div className="register-to">
          <Link to="/login" className="register-to-signin">Existing user? Login here</Link>
          <Button className="register-to-next">Next</Button>
        </div>
      </Form>
    </>
  );
};

export default RegisterMain;