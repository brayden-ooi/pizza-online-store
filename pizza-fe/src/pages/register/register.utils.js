import { userHandle } from "../../providers/user/user.utils";


export const validateUsernameAndEmail = userHandle("register/validate");

export const stateUpdate = (state, targetNode, updatedValue) => ({
  ...state,
  [targetNode]: updatedValue
});

export const correctedPayload = name => valueFn => ({
  ...name,
  value: valueFn()
});