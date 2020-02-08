import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const SignInPage = () => {
  const [ userCredentials, setCredentials ] = useState({ username: "", password: ""});
  const { username, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    // TODO
    try {
        const request = await fetch("http://127.0.0.1:8000/login", {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const response = await request.json();
      await console.log(response);
    } catch(error) {
      console.log(error);
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

          value={ password }
          onChange={ handleChange }
        />
      </FormGroup>
      <Link to="/register">New user? Register here</Link>
      <Button>Sign in</Button>
    </Form>
  )
};

export default SignInPage;