var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../App');
var should = chai.should();

chai.use(chaiHttp);


describe('Users', function() {
    it('should add a SINGLE user on /signup POST', function(done) {
        chai.request(server)
            .post('/signup')
            .send({'email':'coucou@hotmail.fr','firstName':'coucou','password':'motdepasse'})
            .end(function (err,res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.have.property('email');
                res.body.SUCCESS.should.have.property('firstName');
                res.body.SUCCESS.should.have.property('password');
                res.body.SUCCESS.email.should.equal('coucou@hotmail.fr');
                res.body.SUCCESS.firstName.should.equal('coucou');
                done();
            })
    });
    it('should connect a SINGLE user on /login POST', function(done) {
        chai.request(server)
            .post('/login')
            .send({'email':'coucou@hotmail.fr','firstName':'coucou'})
            .end(function (err,res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.have.property('email');
                res.body.SUCCESS.should.have.property('firstName');
                res.body.SUCCESS.email.should.equal('coucou@hotmail.fr');
                res.body.SUCCESS.firstName.should.equal('coucou');
                done();
            })
    });
});
