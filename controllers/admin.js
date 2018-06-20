import pool from '../middleware/pool';


export function getUserRequests(req, res) {
  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "userAccount" where "userId" =$1', [req.userData.userId], (queryError, result) => {
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }
      if (result.rows.length < 1 || result.rows[0].role.trim() === 'User') {
        return res.status(401).json({
          message: 'Unauthorized access',
        });
      }
      client.query('SELECT * from "request" ', (queryErr, reslt) => {
        done();
        if (queryErr) {
          return res.status(400).json({
            message: `${queryErr}`,
          });
        }

        if (reslt.rows.length < 1) {
          return res.status(404).json({
            message: 'Request Not Found',
          });
        }
        return res.status(200).send(reslt.rows);
      });
    });
  });
}

export function approveRequest(req, res) {
  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "userAccount" where "userId" =$1', [req.userData.userId], (queryError, result) => {
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }

      if (result.rows.length < 1 || result.rows[0].role.trim() === 'User') {
        return res.status(401).json({
          message: 'Unauthorized Request',
        });
      }
      client.query('SELECT * from "request" where "requestId"=$1', [req.params.requestId], (queryError2, result2) => {
        if (queryError2) {
          return res.status(400).json({
            message: `${queryError2}`,
          });
        }

        if (result2.rows.length < 1) {
          return res.status(404).json({
            message: 'Request Not Found',
          });
        }

        const requestId = req.params.requestId;
        client.query('UPDATE request set "requestStatus"= $1 where "requestId" = $2', ['Approved', req.params.requestId], (queryErr, reslt) => {
          done();
          if (queryError) {
            return res.status(400).json({
              message: `${queryError}`,
            });
          }
          return res.status(200).json({
            message: 'Request Approved',
            requestId,
          });
        });
      });
    });
  });
}
export function disapproveRequest(req, res) {
  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "userAccount" where "userId" =$1', [req.userData.userId], (queryError, result) => {
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }

      if (result.rows.length < 1 || result.rows[0].role.trim() === 'User') {
        return res.status(400).json({
          message: 'Unauthorized Request',
        });
      }

      client.query('SELECT * from "request" where "requestId"=$1', [req.params.requestId], (queryError2, result2) => {
        if (queryError2) {
          return res.status(400).json({
            message: `${queryError2}`,
          });
        }

        if (result2.rows.length < 1) {
          return res.status(404).json({
            message: 'Request Not Found',
          });
        }

        const requestId = req.params.requestId;
        client.query('UPDATE request set "requestStatus"= $1 where "requestId" = $2', ['Disapproved', req.params.requestId], (queryErr, reslt) => {
          done();
          if (queryError) {
            return res.status(400).json({
              message: `${queryError}`,
            });
          }
          return res.status(200).json({
            message: 'Request Disapproved',
            requestId,
          });
        });
      });
    });
  });
}
export function resolveRequest(req, res) {
  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "userAccount" where "userId" =$1', [req.userData.userId], (queryError, result) => {
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }

      if (result.rows.length < 1 || result.rows[0].role.trim() === 'User') {
        return res.status(400).json({
          message: 'Unauthorized Request',
        });
      }

      client.query('SELECT * from "request" where "requestId"=$1', [req.params.requestId], (queryError2, result2) => {
        if (queryError2) {
          return res.status(400).json({
            message: `${queryError2}`,
          });
        }

        if (result2.rows.length < 1) {
          return res.status(404).json({
            message: 'Request Not Found',
          });
        }

        const requestId = req.params.requestId;
        client.query('UPDATE request set "requestStatus"= $1 where "requestId" = $2', ['Resolved', req.params.requestId], (queryErr, reslt) => {
          done();
          if (queryError) {
            return res.status(400).json({
              message: `${queryError}`,
            });
          }
          return res.status(200).json({
            message: 'Request Resolved',
            requestId,
          });
        });
      });
    });
  });
}
export function getFilteredRequests(req, res) {
  pool.connect((error, client, done) => {
    if (error) {
      return res.status(400).json({
        message: `${error}`,
      });
    }
    client.query('SELECT * from "userAccount" where "userId" =$1', [req.userData.userId], (queryError, result) => {
      if (queryError) {
        return res.status(400).json({
          message: `${queryError}`,
        });
      }
      if (result.rows.length < 1 || result.rows[0].role.trim() === 'User') {
        return res.status(401).json({
          message: 'Unauthorized access',
        });
      }

      if (Number(req.params.requestId) !== 0 || req.params.requestType !== 'none' || req.params.requestLevel !== 'none' || req.params.requestDate !== '0000-00-00' || req.params.department !== 'none') {
        let sql = 'SELECT * from "request" where';
        if (Number(req.params.requestId) !== 0) {
          sql += ` "requestId"= ${Number(req.params.requestId)}`;
          if (Number(req.params.requestId) !== 0 && (req.params.requestType !== 'none' || req.params.requestLevel !== 'none' || req.params.requestDate !== '0000-00-00' || req.params.department !== 'none')) {
            sql += ' and';
          }
        }
        if (req.params.requestType !== 'none') {
          sql += ` "requestType"= '${req.params.requestType}'`;
          if (req.params.requestType !== 'none' && (req.params.requestLevel !== 'none' || req.params.requestDate !== '0000-00-00' || req.params.department !== 'none')) {
            sql += ' and';
          }
        }

        if (req.params.requestLevel !== 'none') {
          sql += ` "requestLevel"= '${req.params.requestLevel}'`;
          if (req.params.requestLevel !== 'none' && (req.params.requestDate !== '0000-00-00' || req.params.department !== 'none')) {
            sql += ' and';
          }
        }

        if (req.params.requestDate !== '0000-00-00') {
          sql += ` "requestDate" LIKE '${req.params.requestDate}%'`;
          if (req.params.requestDate !== 'none' && (req.params.department !== 'none')) {
            sql += ' and';
          }
        }

        if (req.params.department !== 'none') {
          sql += ` department= '${req.params.department}'`;
        }

        client.query(sql, (queryError2, result2) => {
          done();
          if (queryError2) {
            return res.status(400).json({
              message: `${queryError2}`,
            });
          }

          if (result2.rows.length < 1) {
            return res.status(404).json({
              message: 'Request Not Found',
            });
          }
          return res.status(200).send(result2.rows);
        });
      } else {
        return res.status(400).json({
          message: 'Please Select a Filter Option',
        });
      }
    });
  });
}
