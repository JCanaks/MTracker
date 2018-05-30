import express from 'express';
import server from './routes/server';
import user from './routes/user';
import admin from './routes/admin';

const app = express();

// app.use('/api/v1', server);
app.use('/api/v1/auth', user);
app.use('/api/v1/users', user);
app.use('/api/v1/requests', admin);

app.get('/', (req, res) => {
  res.send('Welcome To Maintenace Tracker!');
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port);
