function search() {
  const searchInput = document.getElementById('searchInput');
  const filter = searchInput.value.toUpperCase();
  const table = document.getElementById('requestTable');
  const tr = table.getElementsByTagName('tr');

  for (let i = 0; i < tr.length; i++) {
    requestTypecolumn = tr[i].getElementsByTagName('td')[0];
    descriptionColumn = tr[i].getElementsByTagName('td')[1];
    departmentColumn = tr[i].getElementsByTagName('td')[2];
    requestLevelColumn = tr[i].getElementsByTagName('td')[3];
    requestDateColumn = tr[i].getElementsByTagName('td')[4];
    requestStatusColumn = tr[i].getElementsByTagName('td')[5];

    if (requestTypecolumn && descriptionColumn && departmentColumn
      && requestLevelColumn && requestDateColumn && requestStatusColumn) {
      if (requestTypecolumn.innerHTML.toUpperCase().indexOf(filter) > -1 || descriptionColumn.innerHTML.toUpperCase().indexOf(filter) > -1 || departmentColumn.innerHTML.toUpperCase().indexOf(filter) > -1 || requestLevelColumn.innerHTML.toUpperCase().indexOf(filter) > -1 || requestDateColumn.innerHTML.toUpperCase().indexOf(filter) > -1 || requestStatusColumn.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}
function updateRequest() {
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      description: document.getElementById('descriptionDetails').value,
      requestType: document.getElementById('requestTypeDetails').value,
      requestLevel: document.getElementById('requestLevelDetails').value,
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
    }),
  };
  console.log(options);
  const requestId = document.getElementById('requestId').innerHTML;
  console.log('requestId');
  console.log(requestId);
  const request = new Request(`/api/v1/users/requests/${Number(requestId)}`, options);
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
          console.log('Validation');
          console.log(data);
          if (data.hasOwnProperty('details')) {
            document.getElementById('details-info').innerHTML = data.details[0].message;
          } else if (data.message.hasOwnProperty('details')) {
            document.getElementById('details-info').innerHTML = data.message.details[0].message;
          } else {
            document.getElementById('details-info').innerHTML = data.message;
          }
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

          const reqId = document.getElementById('requestId');
          reqId.innerHTML = data.requestId;

          const requestType = document.getElementById('requestTypeDetails');
          requestType.value = data.requestType;

          const requestLevel = document.getElementById('requestLevelDetails');
          requestLevel.value = data.requestLevel;

          const requestedBy = document.getElementById('requestedBy');
          requestedBy.innerHTML = data.requestedBy;

          const department = document.getElementById('department');
          department.innerHTML = data.department;

          const requestDate = document.getElementById('requestDate');
          requestDate.innerHTML = data.requestDate.substring(0, 10);

          const requestStatus = document.getElementById('requestStatus');
          requestStatus.innerHTML = data.requestStatus;

          const description = document.getElementById('descriptionDetails');
          description.value = data.description;
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

function generateTable(tbody, data) {
  data.forEach((object) => {
    const tr = document.createElement('tr');

    const requestTypeColumn = document.createElement('td');
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
    descriptionColumn.appendChild(document.createTextNode(object.description));
    departmentColumn.appendChild(document.createTextNode(object.department));
    requestLevelColumn.appendChild(document.createTextNode(object.requestLevel));
    requestDateColumn.appendChild(document.createTextNode(object.requestDate.substring(0, 10)));
    requestStatusColumn.appendChild(document.createTextNode(object.requestStatus));
    detailsColumn.appendChild(button);


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
  const requestModal = document.getElementById('modal');
  const detailsModal = document.getElementById('detailsModal');
  if (event.target === requestModal) {
    requestModal.style.display = 'none';
  }
  if (event.target === detailsModal) {
    detailsModal.style.display = 'none';
  }
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
          const modal = document.getElementById('modal');
          modal.style.display = 'none';
        });
      }
      if (response.status === 401) {
        response.json().then((data) => {
          window.location.replace('signin.html');
        });
      }
      if (response.status === 400) {
        response.json().then((data) => {
          document.getElementById('create-info').innerHTML = data.message.details[0].message;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
function showModal() {
  modal.style.display = 'block';
}
function closemodal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function closeDetailsModal() {
  const modal = document.getElementById('detailsModal');
  modal.style.display = 'none';
}
function logout() {
  window.localStorage.removeItem('access_token');
  window.location.replace('signin.html');
}
