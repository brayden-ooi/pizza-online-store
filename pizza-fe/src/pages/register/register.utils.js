// Client-side validation
// TODO

export const validateUsernameAndEmail = async (username, email) => {
  await console.log(username, email, "Verified");

  return { usernameValidated: true, emailValidated: true };
}