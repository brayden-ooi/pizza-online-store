import formReducer from "../form/form.reducer";


export const INITIAL_REGISTER_VALIDATION = {
  validEmail: null, 
  validUsername: null,
  passwordLength: null,
  passwordMatch: null
};

export const INITIAL_STATE = { 
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

export const registerPageReducer = formReducer(INITIAL_STATE, INITIAL_REGISTER_VALIDATION);