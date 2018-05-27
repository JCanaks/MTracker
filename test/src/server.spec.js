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

describe('/POST requests', () => {
  it('should post a request', (done) => {
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
      .post('/users/requests')
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

describe('/PUT/:requestId requests', () => {
  it('should update a request with the given id', (done) => {
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
      .put(`/users/requests/${request.requestId}`)
      .send({
        requestId: 1,
        requestType: 'Repair',
        requestedBy: 'Jane Anaekwe',
        email: 'jane.anaekwe@mail.com',
        department: 'Sales',
        description: 'Repair of Department Printer',
        requestLevel: 'Critical',
        requestDate: '11-05-2018',
        status: 'Pending',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('department').eql('Sales');
        done();
      });
  });
});
