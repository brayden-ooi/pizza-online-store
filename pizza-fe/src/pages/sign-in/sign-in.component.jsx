import React, { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import { formReducer } from "../../components/form-input/form.utils";
import { userSignIn } from "../../providers/user/user.utils";
import { UserContext } from "../../providers/user/user.provider";

import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';


const INITIAL_STATE = { username: "", password: "", validationStatus: null};

const LoginPageReducer = formReducer(INITIAL_STATE);

const SignInPage = () => {
  const { userDispatch } = useContext(UserContext);
  const [ formState, formDispatch ] = useReducer(LoginPageReducer, INITIAL_STATE);
  const { username, password, validationStatus } = formState;

  const handleSubmit = async event => {
    event.preventDefault();

    formDispatch({ type: "SUBMIT_START" });

    try {
      const response = await userSignIn({ username, password });

      await (function() {
        formDispatch({ type: "SUBMIT_SUCCESS" });
        userDispatch({ type: "LOGIN_USER", payload: response });
      })();
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={ handleSubmit }>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input 
          type="text" 
          name="username" 
          id="username" 
          required 

          value={ username }
          onChange={ event => formDispatch({ type: "FORM_CHANGE", payload: event.target }) }
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input 
          type="password" 
          name="password" 
          id="password" 
          required 

          invalid={ validationStatus }

          value={ password }
          onChange={ event => formDispatch({ type: "FORM_CHANGE", payload: event.target }) }
        />
        <FormFeedback>Username or password is wrong. Please try again.</FormFeedback>
      </FormGroup>
      <Link to="/register">New user? Register here</Link>
      <Button>Sign in</Button>
    </Form>
  )
};

export default SignInPage;