import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { userSignIn } from "../../providers/user/user.utils";
import { UserContext } from "../../providers/user/user.provider";

import { validationWarning } from "../../providers/user/user.utils";

import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';


const SignInPage = () => {
  const { currentUser, getCurrentUser } = useContext(UserContext);

  const [ userCredentials, setCredentials ] = useState({ username: "", password: ""});
  const { username, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    // reset warnings
    await validationWarning(null);

    try {
      const response = await userSignIn({ username, password });
      const user = response.isAuthenticated;

      // reset fields
      await setCredentials(userCredentials => user ? { username: "", password: ""} : userCredentials);
      
      await getCurrentUser(user);
    } catch(error) {
      console.error(error);
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  }

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
          onChange={ handleChange }
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input 
          type="password" 
          name="password" 
          id="password" 
          required 

          invalid={ validationWarning(currentUser) }

          value={ password }
          onChange={ handleChange }
        />
        <FormFeedback>Username or password is wrong. Please try again.</FormFeedback>
      </FormGroup>
      <Link to="/register">New user? Register here</Link>
      <Button>Sign in</Button>
    </Form>
  )
};

export default SignInPage;