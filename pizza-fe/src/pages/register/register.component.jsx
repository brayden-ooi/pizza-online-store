import React, { useState, useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

import RegisterMain from "./register-main/register-main.component";
import RegisterDetails from "./register-details/register-details.component";

import { UserContext } from "../../providers/user/user.provider";

import { userRegister } from "../../providers/user/user.utils";


const RegisterPage = ({ match }) => {
  const [ userCredentials, setCredentials ] = useState({ 
    username: "",
    first_name: "",
    last_name: "",
    email: "", 
    password: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    passwordConfirm: ""
  });

  const { getCurrentUser } = useContext(UserContext);
  const [ detailEntry, setDetailEntry ] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    // TODO
    try {
      const response = await userRegister(userCredentials);
      
      await setCredentials(null);

      await getCurrentUser(response);
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
          setDetailEntry={setDetailEntry}
        />} 
      />
      <Route exact path={`${match.path}/details`} render={() => detailEntry ? 
        <RegisterDetails 
          {...userCredentials} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
        /> : 
        <Redirect to="/register" />} 
      />
    </div>
  );
};

export default withRouter(RegisterPage);