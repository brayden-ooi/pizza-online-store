import { validationWarning } from "./form.utils";


const formReducer = (INITIAL_STATE, validationDefault = null) => (state, action) => {
  switch (action.type) {
    // also serves as warning reset
    case "SUBMIT_START":
      return {
        ...state,
        validationStatus: validationDefault
      };
    case "FORM_CHANGE":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case "SUBMIT_RESULT":
      return {
        ...state,
        validationStatus: validationWarning(action.payload)
      };
    case "SUBMIT_SUCCESS":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default formReducer;