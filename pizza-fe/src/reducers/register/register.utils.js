import { userHandle } from "../root.utils";


export const userRegister = userHandle("/api/register");

export const validateUsernameAndEmail = userHandle("/api/register/validate");