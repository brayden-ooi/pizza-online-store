import formReducer from "../form/form.reducer"


export const INITIAL_STATE = { username: "", password: "", validationStatus: null };

export const loginPageReducer = formReducer(INITIAL_STATE);