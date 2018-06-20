import chai from 'chai';
import chaiHttp from 'chai-http';
import user from '../../routes/user';
import server from '../../routes/admin';


chai.use(chaiHttp);
const should = chai.should();
let token;

describe('Test Admin API Routes', () => {
  before((done) => {
    chai.request(user)
      .post('/login')
      .send({
        userEmail: 'jane@mail.com',
        userPassword: '1234',
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('/GET requests', () => {
    it('Should get Requests of all users', (done) => {
      chai.request(server)
        .get('/')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.equal(1);
          done();
        });
    });
  });

  describe('/GET/:requestType&:requestLevel&:requestDate&:requestId&:department/filter requests', () => {
    it('Should get Filtered Request by given parameters', (done) => {
      chai.request(server)
        .get(`/Repair&Critical&0000-00-00&${1}&Sales/filter`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.equal(1);
          done();
        });
    });
  });

  describe('/PUT/:requestId/approve requests', () => {
    it('Should approve a request', (done) => {
      chai.request(server)
        .put(`/${1}/approve`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').equal('Request Approved');
          res.body.should.have.property('requestId').equal('1');
          done();
        });
    });
  });

  describe('/PUT/:requestId/disapprove requests', () => {
    it('Should disapprove a request', (done) => {
      chai.request(server)
        .put(`/${1}/disapprove`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').equal('Request Disapproved');
          res.body.should.have.property('requestId').equal('1');
          done();
        });
    });
  });

  describe('/PUT/:requestId/resolve requests', () => {
    it('Should resolve a request', (done) => {
      chai.request(server)
        .put(`/${1}/resolve`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').equal('Request Resolved');
          res.body.should.have.property('requestId').equal('1');
          done();
        });
    });
  });
});
