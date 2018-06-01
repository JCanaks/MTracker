import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express, { json } from 'express';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import userModel from '../models/user';
import pool from '../models/pool';
import request from '../models/request';
import verifyToken from '../middleware/verifyToken';
import invalidProperty from '../middleware/invalidProperty';

dotenv.config();
const app = express();

app.use(json());
app.post('/signup', (req, res) => {
  userModel.userFullname = req.body.userFullname;
  userModel.role = req.body.role;
  userModel.department = req.body.department;
  userModel.userPassword = req.body.userPassword;
  userModel.userEmail = req.body.userEmail;
  userModel.userPhonenumber = req.body.userPhonenumber;

  if (userModel == null || invalidProperty(userModel)) {
    return res.status(400).send('Invalid Entry: Cannot Create User ');
  }
  bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    userModel.userPassword = hash;
    pool.connect((error, client, done) => {
      if (error) {
        console.log(`not able to get connection ${error}`);
        res.status(400).send(error);
      }
      client.query('SELECT * from "userAccount" where "userEmail" = $1', [userModel.userEmail], (queryError, result) => {
        if (queryError) {
          res.status(500).send('Could not create user account');
        }
        if (result.rows.length > 0) {
          return res.status(400).json({
            message: 'Duplicate Email',
          });
        }
        client.query('SELECT * from "userAccount" where "userPhonenumber" = $1', [userModel.userPhonenumber], (queryError1, result1) => {
          done();
          if (queryError1) {
            res.status(500).send('Could not create user account');
          }
          if (result1.rows.length > 0) {
            return res.status(400).json({
              message: 'Duplicate Phonenumber',
            });
          }
          client.query('INSERT INTO "userAccount" ("userFullname", role, "userPassword", department, "userEmail", "userPhonenumber")VALUES($1, $2, $3, $4, $5, $6 )', [userModel.userFullname, userModel.role, userModel.userPassword, userModel.department, userModel.userEmail, userModel.userPhonenumber], (queryError1, result1) => {
            done();
            if (queryError1) {
              res.status(500).send('Could not create user account');
            }
            return res.status(200).json({
              message: 'Sucessfull Signup',
              userModel,
            });
          });
        });
      });
    });
  });
});

app.post('/login', (req, res) => {
  pool.connect((error, client, done) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      res.status(400).send(error);
    }
    client.query('SELECT * from "userAccount" where "userEmail" = $1', [req.body.userEmail], (queryError, result) => {
      done();
      if (queryError) {
        console.log(queryError);
        res.status(400).send(queryError);
      }

      if (result.rows.length < 1) {
        return res.status(401).json({
          message: 'Authentication Failed1',
        });
      }
      bcrypt.compare(req.body.userPassword, result.rows[0].userPassword, (err, response) => {
        if (err) {
          return res.status(401).json({
            message: 'Authentication Failed2',
          });
        }
        if (response) {
          const token = jwt.sign({
            email: result.rows[0].userEmail.trim(),
            userId: result.rows[0].userId,
            userFullname: result.rows[0].userFullname.trim(),
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
          });
          return res.status(200).json({
            message: 'Authentication Sucessful',
            token,
          });
        }
        res.status(401).json({
          message: 'Authentication Failed3',
        });
      });
    });
  });
});
app.post('/requests', verifyToken, (req, res) => {
  request.userId = req.userData.userId;
  request.description = req.body.description;
  request.department = req.body.department;
  request.requestType = req.body.requestType;
  request.requestedBy = req.userData.userFullname;
  request.requestLevel = req.body.requestLevel;
  request.requestStatus = 'Pending';
  request.requestDate = new Date();

  if (request == null || invalidProperty(request)) {
    return res.status(400).send('Invalid Entry: Cannot Create Request ');
  }

  pool.connect((error, client, done) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      res.status(400).send(error);
    }
    client.query('INSERT INTO request ("userId", description, department, "requestType", "requestedBy", "requestLevel", "requestStatus", "requestDate")VALUES($1, $2, $3, $4, $5, $6, $7, $8 )', [request.userId, request.description, request.department, request.requestType, request.requestedBy, request.requestLevel, request.requestStatus, request.requestDate], (queryError, result) => {
      done();
      if (queryError) {
        console.log(queryError);
        res.status(400).send(queryError);
      }
      return res.status(200).json({
        message: 'Request Created',
        request,
      });
    });
  });
});

app.get('/requests', verifyToken, (req, res) => {
  pool.connect((error, client, done) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      res.status(400).send(error);
    }
    client.query('SELECT * from "request" where "userId" = $1', [req.userData.userId], (queryError, result) => {
      done();
      if (queryError) {
        console.log(queryError);
        res.status(400).send(queryError);
      }
      // res.status(200).send(result);
      if (result.rows.length < 1) {
        return res.status(404).json({
          message: 'Requests not found',
        });
      }
      res.status(200).send(result.rows);
    });
  });
});

app.get('/requests/:requestId', verifyToken, (req, res) => {
  pool.connect((error, client, done) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      res.status(400).send(error);
    }
    client.query('SELECT * from "request" where "userId" = $1 and "requestId"=$2', [req.userData.userId, req.params.requestId], (queryError, result) => {
      done();
      if (queryError) {
        console.log(queryError);
        res.status(400).send(queryError);
      }
      // res.status(200).send(result);
      if (result.rows.length < 1) {
        return res.status(404).json({
          message: 'Request not found',
        });
      }
      res.status(200).send(result.rows);
    });
  });
});

app.put('/requests/:requestId', verifyToken, (req, res) => {
  request.description = req.body.description;
  request.department = req.body.department;
  request.requestType = req.body.requestType;
  request.requestLevel = req.body.requestLevel;

  if (request == null || invalidProperty(request)) {
    return res.status(400).send('Invalid Entry: Cannot Update Request');
  }

  pool.connect((error, client, done) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      res.status(400).send(error);
    }
    client.query('SELECT * from "request" where "userId" = $1 and "requestId"=$2', [req.userData.userId, req.params.requestId], (queryError, result) => {
      if (queryError) {
        console.log(queryError);
        res.status(400).send(queryError);
      }

      if (result.rows.length < 1 || result.rows[0].requestStatus.trim() !== 'Pending') {
        return res.status(404).json({
          message: 'Cannot update request',
        });
      }

      client.query('UPDATE request set description = $1, department = $2 , "requestType"= $3, "requestLevel"= $4  where "requestId" = $5 and "userId" = $6', [request.description, request.department, request.requestType, request.requestLevel, req.params.requestId, req.userData.userId], (queryErr, reslt) => {
        done();
        if (queryError) {
          console.log(queryError);
          res.status(400).send(queryError);
        }
        return res.status(200).json({
          message: 'Request Updated',
          description: request.description,
          department: request.department,
          requestType: request.requestType,
          requestLevel: request.requestLevel,
        });
      });
    });
  });
});
export default app;
