import {basicHeaders} from "../../frontend/src/utils/headers";
import axios from 'axios';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../App');
var should = chai.should();
var User = require('../server/controllers/userController');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Users', function() {
    describe('Connexion', function(){
        var _userId;
        it('#User - Inscription OK', (done) => {
            //mock valid user input
            const new_user = {
                "email": "john@doe.com",
                "firstName"  : "John",
                "phoneNumber": "0000000000"
            };
            //send request to the app
            chai.request(server).post('/api/auth/signup')
                .send(new_user)
                .then((res) => {
                    _userId = res.body.userId;
                    //assertions
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal("Connected !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#User - Connexion OK', (done) => {
            //mock valid user input
            const new_user = {
                "email": "john@doe.com",
                "password"  : "doe",
            };
            //send request to the app
            chai.request(server).post('/api/auth/login')
                .send(new_user)
                .then((res) => {
                    //assertions
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal("Connected !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#User - Suppression OK', (done) => {
            //mock valid user input
            //send request to the app
            chai.request(server).delete('/api/auth/' + _userId)
                .then((res) => {
                    //assertions
                    expect(res.body.message).to.be.equal("User deleted !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });


    });
});

describe('Rooms', function() {
    describe('onlyRoom', function(){
        var _roomId;
        var _token;
        /*const burl = "http://localhost:3000/api/auth";
        return axios.post(burl + '/signup',{
                'email' : "root@test.fr",
                'phoneNumber' : "0000000000",
                'firstName' : "firstName",
            },{
                headers: basicHeaders
            }).then( (res) {
            _token = res.body.token
        })*/
        it('#Room - Created OK', (done) => {
            //mock valid user input
            const new_room = {
                "title" : "titre",
                "description" : "description",
                "price" : "10",
                "address" : "00 address",
                "city" : "city",
                "region" : "region",
                "postalCode" : "00000",
                "category" : "category",
                "bail" : "100",
                "imageUrl" : "/user.png",
                "availability" : "{'2','3','4','5','6','7'}",
                "review" : "{'1', '2', '3', '4'}",
                "userId" : "5e231c2765e9b51af8d7680e"
            };
            //send request to the app
            chai.request(server).post('/api/room')
                .send(new_room)
                .headers({'Authorization':'Bearer' + _token})
                .then((res) => {
                    _roomId = res.body.roomId;
                    //assertions
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal("Objet enregistré !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        /*it('#User - Connexion OK', (done) => {
            //mock valid user input
            const new_user = {
                "email": "john@doe.com",
                "password"  : "doe",
            };
            //send request to the app
            chai.request(server).post('/api/auth/login')
                .send(new_user)
                .then((res) => {
                    //assertions
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal("Connected !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#User - Suppression OK', (done) => {
            //mock valid user input
            //send request to the app
            chai.request(server).delete('/api/auth/' + _userId)
                .then((res) => {
                    //assertions
                    expect(res.body.message).to.be.equal("User deleted !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });*/


    });
});
