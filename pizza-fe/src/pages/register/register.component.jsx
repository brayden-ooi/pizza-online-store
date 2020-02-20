import React, { useState, useReducer, useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

import RegisterMain from "./register-main/register-main.component";
import RegisterDetails from "./register-details/register-details.component";

import { formReducer } from "../../components/form-input/form.utils";
import { userRegister } from "../../providers/user/user.utils";
import { UserContext } from "../../providers/user/user.provider";


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
  validationStatus: null
};

const RegisterPageReducer = formReducer(INITIAL_STATE);

const RegisterPage = ({ match }) => {
  const { userDispatch } = useContext(UserContext);
  const [ formState, formDispatch ] = useReducer(RegisterPageReducer, INITIAL_STATE);
  const [ detailEntry, setDetailEntry ] = useState(false);

  const { mainPage, detailPage } = formState;



  // const [ userCredentials, setCredentials ] = useState({ 
  //   username: "",
  //   first_name: "",
  //   last_name: "",
  //   email: "", 
  //   password: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   zip_code: "",
  //   passwordConfirm: ""
  // });

  const handleSubmit = async event => {
    event.preventDefault();

    // TODO
    try {
      const response = await userRegister(userCredentials);
      
      await setCredentials(null);

      await userDispatch({ type: "REGISTER_USER", payload: response });
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Route exact path={match.path} render={({ match: {path}, history }) => 
        <RegisterMain 
          path={path} 
          fields={mainPage} 
          history={history} 
          setDetailEntry={setDetailEntry}
        />} 
      />
      <Route exact path={`${match.path}/details`} render={() => detailEntry ? 
        <RegisterDetails 
          {...detailPage} 
          handleSubmit={handleSubmit} 
        /> : 
        <Redirect to="/register" />} 
      />
    </div>
  );
};

export default withRouter(RegisterPage);