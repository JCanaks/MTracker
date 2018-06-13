function getRequest() {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(options);
  const request = new Request('/api/v1/users/requests', options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          data.forEach((object) => {
            const requestTable = document.getElementById('requestTable');
            const requestRow = requestTable.insertRow(1);


            const requestType = requestRow.insertCell(0);
            const description = requestRow.insertCell(1);
            const department = requestRow.insertCell(2);
            const requestLevel = requestRow.insertCell(3);
            const requestDate = requestRow.insertCell(4);
            const status = requestRow.insertCell(5);
            const details = requestRow.insertCell(6);


            requestType.innerHTML = object.requestType;
            description.innerHTML = object.description;
            department.innerHTML = object.department;
            requestLevel.innerHTML = object.requestLevel;
            requestDate.innerHTML = object.requestDate.substring(0, 10);
            status.innerHTML = object.requestStatus;
            details.innerHTML = `<a href="user-request-details.html?${object.requestId}">View Details</a>`;
          });
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
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
    document.getElementById('fail').innerHTML = '';
    document.getElementById('success').innerHTML = '';
  }
  getRequest();
};

function createRequest() {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      description: document.getElementById('description').value,
      requestType: document.getElementById('requestType').value,
      requestLevel: document.getElementById('requestLevel').value,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(options);
  const request = new Request('/api/v1/users/requests', options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          window.location.reload();
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message.details[0].message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
