import pool from '../models/pool';

pool.connect((error, client, done) => {
  if (error) {
    console.log(`not able to get connection ${error}`);
    res.status(400).send(error);
  }
  client.query('CREATE TABLE userAccount( "userId" serial PRIMARY KEY NOT NULL, "userFullname" text NOT NULL, role text NOT NULL,"userPassword" character(60) NOT NULL, department text NOT NULL, "userEmail" text NOT NULL, "userPhonenumber" text NOT NULL)', (queryError, result) => {
    done();
    if (queryError) {
      console.log(queryError);
      res.status(400).send(queryError);
    }
    res.status(200).send('User Table Created!');
  });

  client.query('CREATE TABLE request( "requestId" serial PRIMARY KEY NOT NULL, "userId" integer NOT NULL, description text NOT NULL,department text NOT NULL,"requestType" text NOT NULL, "requestedBy" text NOT NULL,"requestLevel" text NOT NULL,"requestStatus" text NOT NULL, "requestDate" text NOT NULL, CONSTRAINT "request_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."userAccount" ("userId") MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)', (queryError, result) => {
    done();
    if (queryError) {
      console.log(queryError);
      res.status(400).send(queryError);
    }
    res.status(200).send('requestTable Created!');
  });
});
