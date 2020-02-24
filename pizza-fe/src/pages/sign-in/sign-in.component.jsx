import React, { useReducer, useContext } from "react";
import { Link } from "react-router-dom";

import FormInput from "../../components/form-input/form-input.component";

import { UserContext } from "../../providers/user/user.provider";

import { formReducer } from "../../components/form-input/form.utils";
import { userSignIn } from "../../providers/user/user.utils";

import { Button, Form, FormFeedback } from 'reactstrap';


const INITIAL_STATE = { username: "", password: "", validationStatus: null };

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

      await formDispatch({ type: "SUBMIT_RESULT", payload: response });

      await (() => response && (
        formDispatch({ type: "SUBMIT_SUCCESS" }) ||
        userDispatch({ type: "LOGIN_USER", payload: response })
      ))();
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={ handleSubmit }>
      <FormInput
        name="username"

        value={ username }
        onChange={ event => formDispatch({ type: "FORM_CHANGE", payload: event.target }) }
      />

      <FormInput
        name="password"
        type="password"

        invalid={ validationStatus }

        value={ password }
        onChange={ event => formDispatch({ type: "FORM_CHANGE", payload: event.target }) }
      >
        <FormFeedback>Username or password is wrong. Please try again.</FormFeedback>
      </FormInput>
      <Link to="/register">New user? Register here</Link>
      <Button>Sign in</Button>
    </Form>
  )
};

export default SignInPage;