import express from 'express';
import api1 from './api1';

const app = express();

app.use('/api/v1', api1);

// PORT
const port = process.env.PORT || 3000;
app.listen(port);
