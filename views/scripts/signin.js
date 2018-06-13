function signin() {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      userEmail: document.getElementById('email').value,
      userPassword: document.getElementById('password').value,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  const request = new Request('api/v1/auth/login', options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          window.localStorage.setItem('access_token', data.token);
          window.location.replace(`user-request.html?${data.message}`);
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

