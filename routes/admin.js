import express, { json } from 'express';
import cors from 'cors';
import verifyToken from '../middleware/verifyToken';
import { getUserRequests, approveRequest, disapproveRequest, resolveRequest, getFilteredRequests } from '../controllers/admin';
import { validateRequestParam, requestParamSchemas } from '../validate/paramValidate';


const app = express();

app.use(json());
app.use(cors());
app.get('/', verifyToken, getUserRequests);

app.get('/:requestType&:requestLevel&:requestDate&:requestId&:department/filter', validateRequestParam(requestParamSchemas.filterSchema), verifyToken, getFilteredRequests);

app.put('/:requestId/approve', validateRequestParam(requestParamSchemas.requestParamSchema), verifyToken, approveRequest);

app.put('/:requestId/disapprove', validateRequestParam(requestParamSchemas.requestParamSchema), verifyToken, disapproveRequest);


app.put('/:requestId/resolve', validateRequestParam(requestParamSchemas.requestParamSchema), verifyToken, resolveRequest);

export default app;
