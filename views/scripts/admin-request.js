function generateTable(tbody, data) {
  data.forEach((object) => {
    const tr = document.createElement('tr');

    const requestTypeColumn = document.createElement('td');
    const requestedByColumn = document.createElement('td');
    const descriptionColumn = document.createElement('td');
    const departmentColumn = document.createElement('td');
    const requestLevelColumn = document.createElement('td');
    const requestDateColumn = document.createElement('td');
    const requestStatusColumn = document.createElement('td');
    const detailsColumn = document.createElement('td');
    const link = document.createElement('a');
    const linkText = document.createTextNode('View Details');
    link.appendChild(linkText);
    link.href = `request-details.html?${object.requestId}`;


    requestTypeColumn.appendChild(document.createTextNode(object.requestType));
    requestedByColumn.appendChild(document.createTextNode(object.requestedBy));
    descriptionColumn.appendChild(document.createTextNode(object.description));
    departmentColumn.appendChild(document.createTextNode(object.department));
    requestLevelColumn.appendChild(document.createTextNode(object.requestLevel));
    requestDateColumn.appendChild(document.createTextNode(object.requestDate.substring(0, 10)));
    requestStatusColumn.appendChild(document.createTextNode(object.requestStatus));
    detailsColumn.appendChild(link);


    tr.appendChild(requestTypeColumn);
    tr.appendChild(requestedByColumn);
    tr.appendChild(descriptionColumn);
    tr.appendChild(departmentColumn);
    tr.appendChild(requestLevelColumn);
    tr.appendChild(requestDateColumn);
    tr.appendChild(requestStatusColumn);
    tr.appendChild(detailsColumn);

    tbody.appendChild(tr);
  });
}

function getFilteredRequests() {
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };

  const reqId = (document.getElementById('requestId').value) ? Number((document.getElementById('requestId').value)) : 0;
  const reqLevel = document.getElementById('requestLevel').value;
  const reqType = document.getElementById('requestType').value;
  const reqDate = (document.getElementById('requestDate').value) ? (document.getElementById('requestDate').value) : '0000-00-00';
  const reqDepartment = document.getElementById('department').value;

  console.log(options);
  const request = new Request(`/api/v1/requests/${reqType}&${reqLevel}&${reqDate}&${Number(reqId)}&${reqDepartment}/filter`, options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          const oldTbody = document.getElementById('tbody');

          const newTbody = document.createElement('tbody');
          newTbody.id = 'tbody';
          generateTable(newTbody, data);
          oldTbody.parentNode.replaceChild(newTbody, oldTbody);
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
          const oldTbody = document.getElementById('tbody');

          const newTbody = document.createElement('tbody');
          newTbody.id = 'tbody';
          oldTbody.parentNode.replaceChild(newTbody, oldTbody);
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('fail').innerHTML = data.message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
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
  const request = new Request('/api/v1/requests', options);
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
          document.getElementById('fail').innerHTML = data.message;
          const requestTable = document.getElementById('requestTable');

          const tbody = document.createElement('tbody');
          tbody.id = 'tbody';

          requestTable.appendChild(tbody);
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

