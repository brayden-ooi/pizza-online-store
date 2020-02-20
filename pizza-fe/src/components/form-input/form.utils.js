const validationWarning = (validationStatus = null) => validationStatus == null ? null : !validationStatus;

export const formReducer = INITIAL_STATE => (state, action) => {
  switch (action.type) {
    case "SUBMIT_START":
      return {
        ...state,
        validationStatus: null
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