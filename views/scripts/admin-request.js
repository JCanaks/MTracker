function approveRequest() {
  const options = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(options);
  const requestId = document.getElementById('requestIdDetails').innerHTML;
  const request = new Request(`/api/v1/requests/${requestId}/approve`, options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          window.location.reload();
          const modal = document.getElementById('detailsModal');
          modal.style.display = 'none';
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('details-info').innerHTML = data.message;
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          window.location.replace('signin.html');
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('details-info').innerHTML = data.details[0].message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function disapproveRequest() {
  const requestId = document.getElementById('requestIdDetails').innerHTML;
  const options = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(options);
  const request = new Request(`/api/v1/requests/${Number(requestId)}/disapprove`, options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          window.location.reload();
          const modal = document.getElementById('detailsModal');
          modal.style.display = 'none';
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('details-info').innerHTML = data.message;
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          window.location.replace('signin.html');
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('details-info').innerHTML = data.details[0].message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function resolveRequest() {
  const options = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(options);
  const requestId = document.getElementById('requestIdDetails').innerHTML;
  const request = new Request(`/api/v1/requests/${Number(requestId)}/resolve`, options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);
          window.location.reload();
          const modal = document.getElementById('detailsModal');
          modal.style.display = 'none';
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('details-info').innerHTML = data.message;
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          window.location.replace('signin.html');
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('details-info').innerHTML = data.details[0].message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function viewDetails(requestId) {
  document.getElementById('details-info').innerHTML = '';
  const options = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(requestId);
  console.log(options);

  console.log(typeof requestId);

  const request = new Request(`/api/v1/users/requests/${requestId}`, options);
  fetch(request)

    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(data);

          const reqId = document.getElementById('requestIdDetails');
          reqId.innerHTML = data.requestId;

          const requestType = document.getElementById('requestTypeDetails');
          requestType.innerHTML = data.requestType;

          const requestLevel = document.getElementById('requestLevelDetails');
          requestLevel.innerHTML = data.requestLevel;

          const requestedBy = document.getElementById('requestedByDetails');
          requestedBy.innerHTML = data.requestedBy;

          const department = document.getElementById('departmentDetails');
          department.innerHTML = data.department;

          const requestDate = document.getElementById('requestDateDetails');
          requestDate.innerHTML = data.requestDate.substring(0, 10);

          const requestStatus = document.getElementById('requestStatusDetails');
          requestStatus.innerHTML = data.requestStatus;

          const description = document.getElementById('descriptionDetails');
          description.innerHTML = data.description;
        });
      }
      if (response.status === 404) {
        response.json().then((data) => {
          document.getElementById('details-info').innerHTML = data.message;
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          window.location.replace('signin.html');
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          console.log(data);
          document.getElementById('details-info').innerHTML = data.details[0].message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function generateTable(tbody, data) {
  data.forEach((object) => {
    const tr = document.createElement('tr');

    const requestTypeColumn = document.createElement('td');
    const requestedByColumn = document.createElement('td');
    requestedByColumn.className = 'column-display';
    const descriptionColumn = document.createElement('td');
    const departmentColumn = document.createElement('td');
    departmentColumn.className = 'column-display';
    const requestLevelColumn = document.createElement('td');
    requestLevelColumn.className = 'column-display';
    const requestDateColumn = document.createElement('td');
    requestDateColumn.className = 'column-display';
    const requestStatusColumn = document.createElement('td');
    requestStatusColumn.className = 'column-display';
    const detailsColumn = document.createElement('td');
    const button = document.createElement('button');
    const buttonText = document.createTextNode('View Details');
    button.appendChild(buttonText);
    button.onclick = function showDetails() {
      const modal = document.getElementById('detailsModal');
      viewDetails(object.requestId);
      modal.style.display = 'block';
    };


    requestTypeColumn.appendChild(document.createTextNode(object.requestType));
    requestedByColumn.appendChild(document.createTextNode(object.requestedBy));
    descriptionColumn.appendChild(document.createTextNode(object.description));
    departmentColumn.appendChild(document.createTextNode(object.department));
    requestLevelColumn.appendChild(document.createTextNode(object.requestLevel));
    requestDateColumn.appendChild(document.createTextNode(object.requestDate.substring(0, 10)));
    requestStatusColumn.appendChild(document.createTextNode(object.requestStatus));
    detailsColumn.appendChild(button);


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
          document.getElementById('info').innerHTML = data.message.toUpperCase();
          const oldTbody = document.getElementById('tbody');

          const newTbody = document.createElement('tbody');
          newTbody.id = 'tbody';
          oldTbody.parentNode.replaceChild(newTbody, oldTbody);
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          window.location.replace('signin.html');
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('info').innerHTML = data.message.toUpperCase();
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
          document.getElementById('info').innerHTML = data.message.toUpperCase();
          const requestTable = document.getElementById('requestTable');

          const tbody = document.createElement('tbody');
          tbody.id = 'tbody';

          requestTable.appendChild(tbody);
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          window.location.replace('signin.html');
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

window.onclick = function exitModal(event) {
  const detailsModal = document.getElementById('detailsModal');
  if (event.target === detailsModal) {
    detailsModal.style.display = 'none';
  }
};
function closeDetailsModal() {
  const modal = document.getElementById('detailsModal');
  modal.style.display = 'none';
}
function logout() {
  window.localStorage.removeItem('access_token');
  window.location.replace('signin.html');
}

