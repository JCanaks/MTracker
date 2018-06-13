import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../middleware/pool';


dotenv.config();

export default function (req, res) {
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
          message: 'Authentication Failed. Please check Login details',
        });
      }
      bcrypt.compare(req.body.userPassword, result.rows[0].userPassword, (err, response) => {
        if (err) {
          return res.status(401).json({
            message: 'Authentication Failed',
          });
        }
        if (response) {
          const token = jwt.sign({
            email: result.rows[0].userEmail.trim(),
            userId: result.rows[0].userId,
            userFullname: result.rows[0].userFullname.trim(),
            department: result.rows[0].department.trim(),
          }, process.env.JWT_SECRET_KEY, {
            expiresIn: '3h',
          });
          return res.status(200).json({
            message: 'Authentication Sucessful, You are now Logged in',
            token,
            role: result.rows[0].role,
          });
        }
        res.status(401).json({
          message: 'Authentication Failed. Please check Login details',
        });
      });
    });
  });
}
