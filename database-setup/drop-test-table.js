import testDatabase from '../middleware/pool';

testDatabase.connect((error, client, done) => {
  if (error) {
    console.log(`not able to get connection ${error}`);
  }
  client.query('drop table request');
  client.query('drop table "userAccount"');
  done();
});
