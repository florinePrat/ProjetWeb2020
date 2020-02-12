//import {basicHeaders} from "../../frontend/src/utils/headers";
//import axios from 'axios';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../App');
var should = chai.should();
var User = require('../server/controllers/userController');

chai.use(chaiHttp);
const expect = chai.expect;
var _token;
var _userId;

describe('Start Tests', function() {
    describe('User Initialisation', function(){

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
                    _token = res.body.token;
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
    });

    describe('Rooms', function() {
        var _roomId;
        it('#Room - Created OK', (done) => {
            //mock valid user input
            const new_room = {
                "title": "titre",
                "description": "description",
                "price": "10",
                "address": "00 address",
                "city": "city",
                "region": "region",
                "postalCode": "00000",
                "category": "category",
                "bail": "100",
                "imageUrl": "/user.png",
                "availability": "{'2','3','4','5','6','7'}",
                "review": "{'1', '2', '3', '4'}",
                "userId": "5e231c2765e9b51af8d7680e"
            };
            //send request to the app
            chai.request(server).post('/api/room')
                .set({'Authorization': 'Bearer ' + _token})
                .send(new_room)
                .then((res) => {
                    _roomId = res.body.roomId;
                    //assertions
                    expect(res).to.have.status(201);
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal("Objet enregistré !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#Room - update OK', (done) => {
            //mock valid user input
            const room = {
                "title": "mytitre",
                "description": "mydescription",
                "price": "10",
                "address": "my00 address",
                "city": "mycity",
                "region": "myregion",
                "postalCode": "00000",
                "category": "category",
                "bail": "100",
                "imageUrl": "/user.png",
                "availability": "{'2','3','4','5','6','7'}",
                "review": "{'1', '2', '3', '4'}",
                "userId": "5e231c2765e9b51af8d7680e"
            };
            //send request to the app
            chai.request(server).put('/api/room/'+ _roomId)
                .set({'Authorization': 'Bearer ' + _token})
                .send(room)
                .then((res) => {
                    //assertions
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.message).to.be.equal("Objet modifié !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#Room - GetOne OK', (done) => {
            //mock valid user input
            //send request to the app
            chai.request(server).get('/api/room/' + _roomId)
                .set({'Authorization': 'Bearer ' + _token})
                .then((res) => {
                    //assertions
                    expect(res).to.have.status(200);
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#Room - Suppression OK', (done) => {
            //mock valid user input
            //send request to the app
            chai.request(server).delete('/api/room/' + _roomId)
                .set({'Authorization': 'Bearer ' + _token})
                .then((res) => {
                    //assertions
                    expect(res.body.message).to.be.equal("Objet supprimé !");
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

    });

    describe('Delete User', function() {
        it('#User - Suppression USER  OK', (done) => {
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


