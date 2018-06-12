import express from 'express';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import user from './routes/user';
import admin from './routes/admin';


const app = express();

app.use(express.static('views'));
app.use('/api/v1/auth', user);
app.use('/api/v1/users', user);
app.use('/api/v1/requests', admin);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => {
  res.sendFile(join(`${__dirname}/views/index.html`));
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`SERVER STARTED ON PORT ${port}....`); });
