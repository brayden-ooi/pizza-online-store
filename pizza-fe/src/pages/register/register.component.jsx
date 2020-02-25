import React, { useState, useReducer, useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import PrivateRoute from "../../components/private-route/private-route.component";
import RegisterMain from "./register-main/register-main.component";
import RegisterDetails from "./register-details/register-details.component";

import { registerPageReducer, INITIAL_STATE } from "../../reducers/register/register.reducer";
import { userRegister } from "../../reducers/register/register.utils";
import { UserContext } from "../../providers/user/user.provider";


const RegisterPage = () => {
  const { path } = useRouteMatch();
  const { userDispatch } = useContext(UserContext);
  const [ formState, formDispatch ] = useReducer(registerPageReducer, INITIAL_STATE);
  const [ detailEntry, setDetailEntry ] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    formDispatch({ type: "SUBMIT_START" });

    try {
      const response = await userRegister(formState);
      
      await formDispatch({ type: "SUBMIT_RESULT", payload: response });

      await (() => response && (
        formDispatch({ type: "SUBMIT_SUCCESS" }) ||
        userDispatch({ type: "REGISTER_USER", payload: response })
      ))();
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Route exact path={path}>
        <RegisterMain 
          {...formState} 
          setDetailEntry={setDetailEntry}
          formDispatch={formDispatch}
        />
      </Route>
      <PrivateRoute exact path={`${path}/details`} 
        condition={detailEntry} 
        deniedPath="/register"
      >
        <RegisterDetails 
          {...formState} 
          handleSubmit={handleSubmit} 
          formDispatch={formDispatch}
        />
      </PrivateRoute>
    </div>
  );
};

export default RegisterPage;