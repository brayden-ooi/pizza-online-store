const validationWarning = (validationStatus = null) => {
  if (validationStatus == null) {
    return null;
  } else if (typeof validationStatus == "object") {
    return Object.keys(validationStatus).reduce((currentValidationStatus, currentKey) => ({
      ...currentValidationStatus,
      [currentKey]: validationWarning(validationStatus[currentKey])
    }), {});
  } else if (typeof validationStatus == "boolean") {
    return !validationStatus;
  }
};

export const formReducer = (INITIAL_STATE, validationDefault = null) => (state, action) => {
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