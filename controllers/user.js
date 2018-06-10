import pool from '../middleware/pool';
import request from '../models/request';

export function createRequest(req, res) {
  request.userId = req.userData.userId;
  request.description = req.body.description;
  request.department = req.userData.department;
  request.requestType = req.body.requestType;
  request.requestedBy = req.userData.userFullname;
  request.requestLevel = req.body.requestLevel;
  request.requestStatus = 'Pending';
  request.requestDate = new Date();

  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('INSERT INTO request ("userId", description, department, "requestType", "requestedBy", "requestLevel", "requestStatus", "requestDate")VALUES($1, $2, $3, $4, $5, $6, $7, $8 )', [request.userId, request.description, request.department, request.requestType, request.requestedBy, request.requestLevel, request.requestStatus, request.requestDate], (queryError, result) => {
      done();
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }
      return res.status(200).json({
        message: 'Request Created',
        description: request.description,
        requestType: request.requestType,
        requestLevel: request.requestLevel,
      });
    });
  });
}
export function getallRequests(req, res) {
  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "request" where "userId" = $1', [req.userData.userId], (queryError, result) => {
      done();
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }

      if (result.rows.length < 1) {
        return res.status(404).json({
          message: 'Requests not found',
        });
      }
      return res.status(200).send(result.rows);
    });
  });
}

export function getRequest(req, res) {
  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "request" where "userId" = $1 and "requestId"=$2', [req.userData.userId, req.params.requestId], (queryError, result) => {
      done();
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }

      if (result.rows.length < 1) {
        return res.status(404).json({
          message: 'Request not found',
        });
      }
      return res.status(200).send(result.rows[0]);
    });
  });
}

export function updateRequest(req, res) {
  const update = {
    description: req.body.description,
    requestType: req.body.requestType,
    requestLevel: req.body.requestLevel,
  };

  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "request" where "userId" = $1 and "requestId"=$2', [req.userData.userId, req.params.requestId], (queryError, result) => {
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }

      if (result.rows.length < 1) {
        return res.status(404).json({
          message: 'Request not Found',
        });
      }

      if (result.rows[0].requestStatus.trim() !== 'Pending') {
        return res.status(400).json({
          message: `Cannot Update Request with status '${result.rows[0].requestStatus}'`,
        });
      }

      client.query('UPDATE request set description = $1, department = $2 , "requestType"= $3, "requestLevel"= $4  where "requestId" = $5 and "userId" = $6', [update.description, req.userData.department, update.requestType, update.requestLevel, req.params.requestId, req.userData.userId], (queryErr, reslt) => {
        done();
        if (queryError) {
          return res.status(400).json({
            message: `${queryError}`,
          });
        }
        return res.status(200).json({
          message: 'Request Updated',
          description: update.description,
          requestType: update.requestType,
          requestLevel: update.requestLevel,
        });
      });
    });
  });
}
