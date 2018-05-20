import { joi, string, validate } from 'joi';
import express, { json } from 'express';

const app = express();
const requests = [
  {
    requestId: 1,
    requestType: 'Repair',
    requestedBy: 'Jane Anaekwe',
    email: 'jane.anaekwe@mail.com',
    department: 'Merchandising',
    description: 'Repair of Department Printer',
    requestLevel: 'Critical',
    requestDate: '11-05-2018',
    status: 'Pending',
  },
  {
    requestId: 2,
    requestType: 'Maintenance',
    requestedBy: 'John Doe',
    email: 'johnny.doe@mail.com',
    department: 'Sales',
    description: 'Maintenance of Sales Bus',
    requestLevel: 'Major',
    requestDate: '14-05-2018',
    status: 'Approved',
  },
  {
    requestId: 3,
    requestType: 'Repair',
    requestedBy: 'Sarah Flowers',
    email: 'sarah.flowers@mail.com',
    department: 'Marketing',
    description: 'Repair of Department PC',
    requestLevel: 'Minor',
    requestDate: '09-05-2018',
    status: 'Rejected',
  },
];

function validateCourse(request) {
  if (!request.requestType || !request.requestDate || !request.email
  || !request.department || !request.description || !request.requestLevel
|| !request.requestDate || !request.status || !request.requestedBy) {
    return false;
  }
  return true;
}

app.use(json());
app.get('/', (req, res) => {
  res.send('Welcome To Maintenance Tracker App!');
});

app.get('/users/requests', (req, res) => {
  res.send(requests);
});

app.get('/users/requests/:requestId', (req, res) => {
  const request = requests.find(r => r.requestId === parseInt(req.params.requestId));
  if (!request) {
    res.status(404).send('The course with the given id was not found');
    return;
  }

  res.send(request);
});

app.post('/users/requests', (req, res) => {
  if (!validateCourse(req.body)) {
    res.status(400).send('ERROR: All attributes of a request should be specified');
    return;
  }
  const request = {
    requestId: requests.length + 1,
    requestType: req.body.requestType,
    requestedBy: req.body.requestedBy,
    email: req.body.email,
    department: req.body.department,
    description: req.body.description,
    requestLevel: req.body.requestLevel,
    requestDate: req.body.requestDate,
    status: req.body.status,
  };
  requests.push(request);
  res.send(request);
});


export default app;
