import bcrypt from 'bcrypt';
import testDatabase from '../middleware/pool';


testDatabase.connect((error, client, done) => {
  if (error) {
    console.log(`not able to get connection ${error}`);
  }

  bcrypt.hash('5678', 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    client.query('INSERT INTO "userAccount" ("userFullname", role, "userPassword", department, "userEmail", "userPhonenumber")VALUES(\'Valery Copins\',\'User\', $1, \'Sales\', \'valery@mail.com\',\'+2348884331637\')', [hash]);
  });
  bcrypt.hash('1234', 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    client.query('INSERT INTO "userAccount" ("userFullname", role, "userPassword", department, "userEmail", "userPhonenumber")VALUES(\'Jane Anaekwe\',\'Admin\', $1, \'IT\', \'jane@mail.com\',\'+2348884331638\')', [hash]);
    done();
  });
});

