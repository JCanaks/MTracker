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

app.use(json());
app.get('/', (req, res) => {
  res.send('Welcome To Maintenance Tracker App!');
});

app.get('/users/requests', (req, res) => {
  res.send(requests);
});

export default app;
