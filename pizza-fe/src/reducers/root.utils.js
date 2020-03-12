export const userHandle = path => async userCredentials => {
  const request = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': await getCSRFToken()
    },
    body: JSON.stringify({
      ...userCredentials
    })
  });
  const response = await request.json();

  return response;
};

// https://docs.djangoproject.com/en/3.0/ref/csrf/#ajax
export const getCSRFToken = async () => {
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(';');
    cookies.filter(cookie => {
      if (cookie.trim().substring(0, 10) === 'csrftoken=') {
        return decodeURIComponent(cookie.trim().substring(10));
      }
      return false;
    });
  } else {
    const response = await fetch(`/api/csrf`, {
      credentials: 'include',
    });
    const data = await response.json();
    const _csrfToken = data.csrfToken;

    return _csrfToken;
  }
};