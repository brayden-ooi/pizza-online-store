export const validationWarning = (validationStatus = null) => {
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

export const stateUpdate = (state, targetNode, updatedValue) => ({
  ...state,
  [targetNode]: updatedValue
});

export const correctedPayload = name => valueFn => ({
  name: name,
  value: valueFn
});