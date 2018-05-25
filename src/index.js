import express from 'express';
import server from './server';


const app = express();

app.use('/api/v1', server);
app.get('/', (req, res) => {
  res.send('Welcome To Maintenace Tracker!');
});

// PORT
const port = 3000;
app.listen(port);
