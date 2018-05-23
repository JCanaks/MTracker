import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server';

chai.use(chaiHttp);
const should = chai.should();

describe('/GET requests', () => {
  it('should get all the requests', (done) => {
    chai.request(server)
      .get('/users/requests')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  });
});

describe('/GET/:requestId requests', () => {
  it('should get a request by given id', (done) => {
    const request = {
      requestId: 1,
      requestType: 'Repair',
      requestedBy: 'Jane Anaekwe',
      email: 'jane.anaekwe@mail.com',
      department: 'Merchandising',
      description: 'Repair of Department Printer',
      requestLevel: 'Critical',
      requestDate: '11-05-2018',
      status: 'Pending',
    };
    chai.request(server)
      .get(`/users/requests/${request.requestId}`)
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('requestId');
        res.body.should.have.property('requestType');
        res.body.should.have.property('requestedBy');
        res.body.should.have.property('email');
        res.body.should.have.property('department');
        res.body.should.have.property('description');
        res.body.should.have.property('requestLevel');
        res.body.should.have.property('requestDate');
        res.body.should.have.property('status');
        done();
      });
  });
});
