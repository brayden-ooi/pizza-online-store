import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

import RegisterMain from "./register-main/register-main.component";
import RegisterDetails from "./register-details/register-details.component";


const RegisterPage = ({ match }) => {
  const [ userCredentials, setCredentials ] = useState({ 
    username: "",
    firstname: "",
    lastname: "",
    email: "", 
    address: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    passwordConfirm: ""
  });

  const handleSubmit = async event => {
    event.preventDefault();

    // TODO
    try {
        console.log(userCredentials);
      //   const request = await fetch("http://127.0.0.1:8000/register", {
      //   method: 'POST',
      //   cache: 'no-cache',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     userCredentials
      //   })
      // });
      // const response = await request.json();
      // await console.log(response);
    } catch(error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  }

  return (
    <div>
      <Route exact path={match.path} render={({ match: {path}, history }) => 
        <RegisterMain 
          path={path} 
          {...userCredentials} 
          history={history} 
          handleChange={handleChange} 
        />} 
      />
      <Route exact path={`${match.path}/details`} render={() => 
        <RegisterDetails 
          {...userCredentials} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
        />} 
      />
    </div>
  );
};

export default RegisterPage;