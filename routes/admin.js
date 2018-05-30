import dotenv from 'dotenv';
import express, { json } from 'express';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import userModel from '../models/user';
import pool from '../models/pool';
import request from '../models/request';
import verifyToken from '../middleware/verifyToken';


dotenv.config();
const app = express();

app.use(json());
app.get('/', verifyToken, (req, res) => {
  pool.connect((error, client, done) => {
    if (error) {
      console.log(`not able to get connection ${error}`);
      res.status(400).send(error);
    }
    client.query('SELECT * from "userAccount" where "userId" =$1', [req.userData.userId], (queryError, result) => {
      if (queryError) {
        console.log(queryError);
        res.status(400).send(queryError);
      }
      // res.status(200).send(result);
      if (result.rows.length < 1 || result.rows[0].role.trim() === 'User') {
        return res.status(401).json({
          message: 'Unauthorized access',
        });
      }
      client.query('SELECT * from "request" ', (queryErr, reslt) => {
        done();
        if (queryError) {
          console.log(queryError);
          res.status(400).send(queryError);
        }
        res.status(200).send(reslt);
      });
    });
  });
});
export default app;