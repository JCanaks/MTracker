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
          console.log(data);
          window.location.replace(`signin.html?${data.message}`);
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          console.log(data);
          if (typeof (data.details) !== 'undefined') {
            switch (data.details[0].context.label) {
              case 'userFullname':
                if (data.details[0].context.value === '') {
                  document.getElementById('info').innerHTML = 'Full Name field is not allowed to be empty';
                } else {
                  document.getElementById('info').innerHTML = 'Full Name must be alphabets only with min of 3 characters';
                }
                break;
              case 'userEmail':
                if (data.details[0].context.value === '') {
                  document.getElementById('info').innerHTML = 'Email field is not allowed to be empty';
                } else {
                  document.getElementById('info').innerHTML = 'Email Entered is not valid';
                }
                break;
              case 'department':
                if (data.details[0].context.value === 'Select Department *') {
                  document.getElementById('info').innerHTML = 'Please select a department';
                }
                break;
              case 'userPhonenumber':
                if (data.details[0].context.value === '') {
                  document.getElementById('info').innerHTML = 'Phone Number field is not allowed to be empty';
                } else {
                  document.getElementById('info').innerHTML = 'Phone Number Entered is not valid';
                }
                break;
              case 'userPassword':
                if (data.details[0].context.value === '') {
                  document.getElementById('info').innerHTML = 'Password field is not allowed to be empty';
                } else {
                  document.getElementById('info').innerHTML = 'Password Entered does not match specified pattern';
                }
                break;

              default:
            }
          }
          if (typeof (data.message) !== 'undefined') {
            document.getElementById('info').innerHTML = data.message;
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
