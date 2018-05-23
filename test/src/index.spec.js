// import { expect } from 'chai';
// import { requestList } from '../../src/endpoints';

// describe('Endpoints Test', () => {
//   it('should return a list of requests', () => {
//     const requests = requestList;
//     expect(requests).to.be.an('array');
//   });
// });

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';

chai.use(chaiHttp);
const should = chai.should();

describe('/GET requests', () => {
  it('should get all the requests', (done) => {
    // const requests = requestList;
    // expect(requests).to.be.an('array');
    chai.request(server)
      .get('/users/requests')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });
});

