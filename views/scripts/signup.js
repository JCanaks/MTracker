function signup() {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      userFullname: document.getElementById('userFullname').value,
      userPassword: document.getElementById('password').value,
      department: document.getElementById('department').value,
      userEmail: document.getElementById('email').value,
      userPhonenumber: document.getElementById('phonenumber').value,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };
  const request = new Request('api/v1/auth/signup', options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          window.location.replace(`user-request.html?${data.message}`);
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          if (typeof (data.details) !== 'undefined') {
            document.getElementById('fail').innerHTML = data.details[0].message;
          }
          if (typeof (data.message) !== 'undefined') {
            document.getElementById('fail').innerHTML = data.message;
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
