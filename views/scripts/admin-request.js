function getRequest() {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(options);
  const request = new Request('/api/v1/requests', options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          data.forEach((object) => {
            const requestTable = document.getElementById('requestTable');
            const requestRow = requestTable.insertRow(1);


            const requestType = requestRow.insertCell(0);
            const requestedBy = requestRow.insertCell(1);
            const description = requestRow.insertCell(2);
            const department = requestRow.insertCell(3);
            const requestLevel = requestRow.insertCell(4);
            const requestDate = requestRow.insertCell(5);
            const status = requestRow.insertCell(6);
            const details = requestRow.insertCell(7);


            requestType.innerHTML = object.requestType;
            requestedBy.innerHTML = object.requestedBy;
            description.innerHTML = object.description;
            department.innerHTML = object.department;
            requestLevel.innerHTML = object.requestLevel;
            requestDate.innerHTML = object.requestDate.substring(0, 10);
            status.innerHTML = object.requestStatus;
            details.innerHTML = `<a href="request-details.html?${object.requestId}">View Details</a>`;
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

