import express from 'express';
import server from './server';

const app = express();

app.use('/api/v1', server);

// PORT
const port = process.env.PORT || 3000;
app.listen(port);
