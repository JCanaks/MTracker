function updateRequest() {
  const url = window.location.href;
  const requestId = url.split('?');

  const options = {
    method: 'PUT',
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
  const request = new Request(`/api/v1/users/requests/${Number(requestId[1])}`, options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          document.getElementById('success').innerHTML = data.message;
          //window.location.reload();
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
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

function viewDetails(requestId) {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(requestId);
  console.log(options);

  const requestIdInt = Number(requestId);
  console.log(typeof requestIdInt);

  const request = new Request(`/api/v1/users/requests/${Number(requestIdInt)}`, options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);

          const requestTable = document.getElementById('requestDetailsTable');

          const requestRow = requestTable.insertRow(0);
          const requestIdLabel = requestRow.insertCell(0);
          const reqId = requestRow.insertCell(1);

          const requestRow1 = requestTable.insertRow(1);
          const requestTypeLabel = requestRow1.insertCell(0);
          const requestType = requestRow1.insertCell(1);

          const requestRow2 = requestTable.insertRow(2);
          const requestLevelLabel = requestRow2.insertCell(0);
          const requestLevel = requestRow2.insertCell(1);

          const requestRow3 = requestTable.insertRow(3);
          const requestByLabel = requestRow3.insertCell(0);
          const requestBy = requestRow3.insertCell(1);

          const requestRow4 = requestTable.insertRow(4);
          const departmentLabel = requestRow4.insertCell(0);
          const department = requestRow4.insertCell(1);

          const requestRow5 = requestTable.insertRow(5);
          const descriptionLabel = requestRow5.insertCell(0);
          const description = requestRow5.insertCell(1);


          const requestRow6 = requestTable.insertRow(6);
          const requestDateLabel = requestRow6.insertCell(0);
          const requestDate = requestRow6.insertCell(1);

          const requestRow7 = requestTable.insertRow(7);
          const requestStatusLabel = requestRow7.insertCell(0);
          const requestStatus = requestRow7.insertCell(1);

          reqId.innerHTML = data.requestId;
          requestIdLabel.innerHTML = 'Request ID:';

          requestTypeLabel.innerHTML = 'Request Type';
          requestType.innerHTML = `<input id="requestType" type="text" value=${data.requestType}>`;

          requestLevelLabel.innerHTML = 'Request Level';
          requestLevel.innerHTML = `<input id="requestLevel" type="text" value=${data.requestLevel}>`;

          requestBy.innerHTML = data.requestedBy;
          requestByLabel.innerHTML = 'Requested By';

          department.innerHTML = data.department;
          departmentLabel.innerHTML = 'Request Department';

          descriptionLabel.innerHTML = 'Request Description';
          description.innerHTML = `<textarea id="description" rows="2" cols="30" >${data.description}</textarea>`;

          requestDate.innerHTML = data.requestDate.substring(0, 10);
          requestDateLabel.innerHTML = 'Request Date';

          requestStatus.innerHTML = data.requestStatus;
          requestStatusLabel.innerHTML = 'Request Status';
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
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

window.onload = function success() {
  const url = window.location.href;
  console.log(url);
  const requestId = url.split('?');
  console.log(requestId[1]);
  viewDetails(requestId[1]);
};
