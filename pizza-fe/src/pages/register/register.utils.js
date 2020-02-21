export const validateUsernameAndEmail = async (username, email) => {
  try {
    const request = await fetch("http://127.0.0.1:8000/api/register/validate", {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email
      })
    });
    const response = await request.json();

    return response;
  } catch(error) {
    console.log(error);
  }
};