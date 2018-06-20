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
          if (data.role === 'User') {
            window.location.replace('user-request.html');
          } else {
            window.location.replace('admin-request.html');
          }
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          document.getElementById('info').innerHTML = data.message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
window.onload = function success() {
  const url = window.location.href;
  console.log(url);
  if (url.includes('?')) {
    const message = url.split('?');
    document.getElementById('success').innerHTML = unescape(message[1]);
  } else {
    document.getElementById('success').innerHTML = '';
  }
};
