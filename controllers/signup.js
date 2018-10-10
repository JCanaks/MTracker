import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/user';
import pool from '../middleware/pool';


export default function (req, res) {
  userModel.userFullname = req.body.userFullname;
  userModel.department = req.body.department;
  userModel.userPassword = req.body.userPassword;
  userModel.userEmail = req.body.userEmail;
  userModel.userPhonenumber = req.body.userPhonenumber;

  bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: `${err}`,
      });
    }
    userModel.userPassword = hash;
    pool.connect((error, client, done) => {
      if (error) {
        return res.status(400).json({
          message: `${error}`,
        });
      }
      client.query('SELECT * from "userAccount" where "userEmail" = $1', [userModel.userEmail], (queryError, result) => {
        if (queryError) {
          return res.status(500).json({
            message: `${queryError}`,
          });
        }
        if (result.rows.length > 0) {
          return res.status(400).json({
            message: 'Email Already Exists',
          });
        }
        client.query('SELECT * from "userAccount" where "userPhonenumber" = $1', [userModel.userPhonenumber], (queryError1, result1) => {
          if (queryError1) {
            return res.status(500).json({
              message: `${queryError1}`,
            });
          }
          if (result1.rows.length > 0) {
            return res.status(400).json({
              message: 'Phone Number Already Exists',
            });
          }
          client.query('INSERT INTO "userAccount" ("userFullname", role, "userPassword", department, "userEmail", "userPhonenumber")VALUES($1, \'User\', $2, $3, $4, $5 )', [userModel.userFullname, userModel.userPassword, userModel.department, userModel.userEmail, userModel.userPhonenumber], (queryError2, result2) => {
            if (queryError2) {
              return res.status(500).json({
                message: `${queryError2}`,
              });
            }
            client.query('SELECT * from "userAccount" where "userEmail" = $1', [req.body.userEmail], (queryError3, result3) => {
              done();
              if (queryError3) {
                return res.status(500).json({
                  message: `${queryError3}`,
                });
              }
              if (result3.rows.length > 0) {
                const token = jwt.sign({
                  email: result3.rows[0].userEmail.trim(),
                  userId: result3.rows[0].userId,
                  userFullname: result3.rows[0].userFullname.trim(),
                  department: result3.rows[0].department.trim(),
                }, process.env.JWT_SECRET_KEY, {
                  expiresIn: '3h',
                });
                return res.status(200).json({
                  message: 'Sucessfull Signup You can now make requests',
                  userFullname: result3.rows[0].userFullname.trim(),
                  userEmail: result3.rows[0].userEmail.trim(),
                  department: result3.rows[0].department.trim(),
                  role: result3.rows[0].role,
                  token,
                });
              }
            });
          });
        });
      });
    });
  });
}

