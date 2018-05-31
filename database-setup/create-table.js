import pool from '../models/pool';

pool.connect((error, client, done) => {
  if (error) {
    console.log(`not able to get connection ${error}`);
  }
  client.query('CREATE TABLE "userAccount"( "userId" serial PRIMARY KEY NOT NULL, "userFullname" text NOT NULL, role text NOT NULL,"userPassword" character(60) NOT NULL, department text NOT NULL, "userEmail" text NOT NULL, "userPhonenumber" text NOT NULL)');

  client.query('CREATE TABLE request( "requestId" serial PRIMARY KEY NOT NULL, "userId" integer NOT NULL, description text NOT NULL,department text NOT NULL,"requestType" text NOT NULL, "requestedBy" text NOT NULL,"requestLevel" text NOT NULL,"requestStatus" text NOT NULL, "requestDate" text NOT NULL, CONSTRAINT "request_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."userAccount" ("userId") MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)', () => {
    done();
  });
});

