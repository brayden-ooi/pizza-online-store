import React, { useState, useReducer, useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import PrivateRoute from "../../components/private-route/private-route.component";
import RegisterMain from "./register-main/register-main.component";
import RegisterDetails from "./register-details/register-details.component";

import { formReducer } from "../../components/form-input/form.utils";
import { userRegister } from "../../providers/user/user.utils";
import { UserContext } from "../../providers/user/user.provider";


const INITIAL_REGISTER_VALIDATION = {
  validEmail: null, 
  validUsername: null,
  passwordLength: null,
  passwordMatch: null
};

const INITIAL_STATE = { 
  mainPage: {
    username: "", 
    email: "", 
    password: "",
    passwordConfirm: "",
  },
  detailPage: {
    fullName: {
      first_name: "",
      last_name: ""
    },
    fullAddress: {
      address: "",
      city: "",
      state: "",
      zip_code: ""
    }
  },
  validationStatus: INITIAL_REGISTER_VALIDATION
};

const RegisterPageReducer = formReducer(INITIAL_STATE, INITIAL_REGISTER_VALIDATION);

const RegisterPage = () => {
  const { path } = useRouteMatch();
  const { userDispatch } = useContext(UserContext);
  const [ formState, formDispatch ] = useReducer(RegisterPageReducer, INITIAL_STATE);
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