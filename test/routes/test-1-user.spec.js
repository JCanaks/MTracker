import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../routes/user';


chai.use(chaiHttp);
const should = chai.should();
let token;

describe('Test User API Routes', () => {
  const user = {
    userFullname: 'Peter Simon',
    role: 'User',
    department: 'Sales',
    userPassword: '5555',
    userEmail: 'peter@mail.com',
    userPhonenumber: '+2348883772514',
  };

  before((done) => {
    chai.request(server)
      .post('/login')
      .send({
        userEmail: 'valery@mail.com',
        userPassword: '5678',
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('/POST Signup', () => {
    it('Should Sucessfully Signup a User', (done) => {
      chai.request(server)
        .post('/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').equal('Sucessfull Signup');
          res.body.should.have.property('userFullname').equal(user.userFullname);
          res.body.should.have.property('userEmail').equal(user.userEmail);
          res.body.should.have.property('role').equal(user.role);
          res.body.should.have.property('department').equal(user.department);
          done();
        });
    });
  });


  describe('/POST Login', () => {
    it('Should Sucessfully Login a User', (done) => {
      chai.request(server)
        .post('/login')
        .send({
          userEmail: user.userEmail,
          userPassword: user.userPassword,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').equal('Authentication Sucessful');
          res.body.should.have.property('token').should.be.an('object');
          done();
        });
    });
  });

  describe('/POST requests', () => {
    const request = {
      description: 'PC Fix',
      department: 'Sales',
      requestType: 'Repair',
      requestLevel: 'Critical',
    };
    it('Should Sucessfully Create a Request', (done) => {
      chai.request(server)
        .post('/requests')
        .send(request)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').equal('Request Created');
          res.body.should.have.property('description').equal(request.description);
          res.body.should.have.property('requestType').equal(request.requestType);
          res.body.should.have.property('requestLevel').equal(request.requestLevel);
          done();
        });
    });
  });

  describe('/GET requests', () => {
    it('Should get all the Requests of a User', (done) => {
      chai.request(server)
        .get('/requests')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.equal(1);
          done();
        });
    });
  });

  describe('/GET/:requestId requests', () => {
    it('Should get a User Request by given id', (done) => {
      chai.request(server)
        .get(`/requests/${1}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('requestId');
          res.body.should.have.property('userId');
          res.body.should.have.property('description');
          res.body.should.have.property('department');
          res.body.should.have.property('requestType');
          res.body.should.have.property('requestedBy');
          res.body.should.have.property('requestLevel');
          res.body.should.have.property('requestStatus');
          res.body.should.have.property('requestDate');
          done();
        });
    });
  });

  describe('/PUT/:requestId requests', () => {
    it('Should Update the request with the given Id', (done) => {
      const request = {
        description: 'Laptop Fix',
        requestType: 'Repair',
        requestLevel: 'Critical',
      };
      chai.request(server)
        .put(`/requests/${1}`)
        .send(request)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').equal('Request Updated');
          res.body.should.have.property('description').equal(request.description);
          res.body.should.have.property('requestType').equal(request.requestType);
          res.body.should.have.property('requestLevel').equal(request.requestLevel);
          done();
        });
    });
  });
});

