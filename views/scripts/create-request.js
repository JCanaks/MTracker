function generateTable(tbody, data) {
  data.forEach((object) => {
    const tr = document.createElement('tr');

    const requestTypeColumn = document.createElement('td');
    const descriptionColumn = document.createElement('td');
    const departmentColumn = document.createElement('td');
    const requestLevelColumn = document.createElement('td');
    const requestDateColumn = document.createElement('td');
    const requestStatusColumn = document.createElement('td');
    const detailsColumn = document.createElement('td');
    const link = document.createElement('a');
    const linkText = document.createTextNode('View Details');
    link.appendChild(linkText);
    link.href = `user-request-details.html?${object.requestId}`;


    requestTypeColumn.appendChild(document.createTextNode(object.requestType));
    descriptionColumn.appendChild(document.createTextNode(object.description));
    departmentColumn.appendChild(document.createTextNode(object.department));
    requestLevelColumn.appendChild(document.createTextNode(object.requestLevel));
    requestDateColumn.appendChild(document.createTextNode(object.requestDate.substring(0, 10)));
    requestStatusColumn.appendChild(document.createTextNode(object.requestStatus));
    detailsColumn.appendChild(link);


    tr.appendChild(requestTypeColumn);
    tr.appendChild(descriptionColumn);
    tr.appendChild(departmentColumn);
    tr.appendChild(requestLevelColumn);
    tr.appendChild(requestDateColumn);
    tr.appendChild(requestStatusColumn);
    tr.appendChild(detailsColumn);

    tbody.appendChild(tr);
  });
}

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
          const requestTable = document.getElementById('requestTable');

          const tbody = document.createElement('tbody');
          tbody.id = 'tbody';

          generateTable(tbody, data);

          requestTable.appendChild(tbody);
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('info').innerHTML = data.message.toUpperCase();
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          document.getElementById('info').innerHTML = data.message.toUpperCase();
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
          document.getElementById('info').innerHTML = data.message.toUpperCase();
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('info').innerHTML = data.message.details[0].message.toUpperCase();
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
