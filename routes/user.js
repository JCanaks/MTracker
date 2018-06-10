import dotenv from 'dotenv';
import express, { json } from 'express';
import verifyToken from '../middleware/verifyToken';
import signup from '../controllers/signup';
import { validateSignup, schemas } from '../validate/authValidate';
import { validateRequest, requestSchemas } from '../validate/requestValidate';
import { validateRequestParam, requestParamSchemas } from '../validate/paramValidate';
import login from '../controllers/login';
import { createRequest, getallRequests, getRequest, updateRequest } from '../controllers/user';

dotenv.config();
const app = express();


app.use(json());
app.post('/signup', validateSignup(schemas.signupSchema), signup);

app.post('/login', login);
app.post('/requests', validateRequest(requestSchemas.requestSchema), verifyToken, createRequest);

app.get('/requests', verifyToken, getallRequests);

app.get('/requests/:requestId', validateRequestParam(requestParamSchemas.requestParamSchema), verifyToken, getRequest);

app.put('/requests/:requestId', validateRequestParam(requestParamSchemas.requestParamSchema), validateRequest(requestSchemas.requestSchema), verifyToken, updateRequest);
export default app;
