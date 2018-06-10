import express, { json } from 'express';
import verifyToken from '../middleware/verifyToken';
import { getUserRequests, approveRequest, disapproveRequest, resolveRequest } from '../controllers/admin';
import { validateRequestParam, requestParamSchemas } from '../validate/paramValidate';


const app = express();

app.use(json());
app.get('/', verifyToken, getUserRequests);

app.put('/:requestId/approve', validateRequestParam(requestParamSchemas.requestParamSchema), verifyToken, approveRequest);

app.put('/:requestId/disapprove', validateRequestParam(requestParamSchemas.requestParamSchema), verifyToken, disapproveRequest);


app.put('/:requestId/resolve', validateRequestParam(requestParamSchemas.requestParamSchema), verifyToken, resolveRequest);

export default app;
