const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../App');

chai.use(chaiHttp);
const userController = require('../server/controllers/userController');
const expect = chai.expect;
let _token;
let _userId;
let _user2Id;

describe('Start Tests', function () {
    describe('User Initialisation', function () {

        const new_user2 = {
            "email": "john2@doe2.com",
            "firstName": "John",
            "phoneNumber": "0000000000"
        };
        //send request to the app
        chai.request(server).post('/api/auth/signup')
            .send(new_user2)
            .then((res) => {
                _user2Id = res.body.userId;
                console.log("user2 created")
            }).catch(err => {
            console.log(err.message);
        });


        it('#User - Inscription OK', (done) => {
            //mock valid user input
            const new_user = {
                "email": "john@doe.com",
                "firstName": "John",
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
                console.log('token mal forme : ', _token);
                console.log(err.message);
            })
        });
        console.log('token mal forme : ', _token);
        it('#User - Connexion OK', (done) => {
            //mock valid user input
            const new_user = {
                "email": "john@doe.com",
                "password": "doe",
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

    describe('Rooms', function () {
        let _roomId;
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
                "state": "published",
                "bail": "100",
                "imageUrl": "/user.png",
                "availability": "{'2','3','4','5','6','7'}",
                "review": "{'1', '2', '3', '4'}",
                "userId": _userId
            };
            //send request to the app
            chai.request(server).post('/api/room/')
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
                console.log('token mal forme : ', _token);
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
                "state": "published",
                "bail": "100",
                "imageUrl": "/user.png",
                "availability": "{'2','3','4','5','6','7'}",
                "review": "{'1', '2', '3', '4'}",
                "userId": _userId
            };
            //send request to the app
            chai.request(server).put('/api/room/' + _roomId)
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

        it('#Room - GetAll OK', (done) => {
            //mock valid user input
            //send request to the app
            chai.request(server).get('/api/publicRoom/')
                .set({'Authorization': 'Bearer ' + _token})
                .then((res) => {
                    //assertions
                    expect(res).to.have.status(200);
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#Room - GetByUser OK', (done) => {
            //mock valid user input
            //send request to the app
            chai.request(server).get('/api/room/byUser/' + _userId)
                .set({'Authorization': 'Bearer ' + _token})
                .then((res) => {
                    //assertions
                    expect(res).to.have.status(200);
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });

        it('#Room - GetAllSearchRooms OK', (done) => {
            //mock valid user input
            //send request to the app
            chai.request(server).get('/api/publicRoom/category/mycity/')
                .set({'Authorization': 'Bearer ' + _token})
                .then((res) => {
                    //assertions
                    expect(res).to.have.status(200);
                    done();
                }).catch(err => {
                console.log(err.message);
            })
        });
        describe('Booking', function () {
            let _bookingId;
            it('#Booking - Created OK', (done) => {
                //mock valid user input
                const new_booking = {
                    "date": "2023-02-15T23:00:00.000+00:00",
                    "state": "awaitingValidation",
                    "roomId": _roomId,
                    "customerId": _user2Id,
                    "ownerId": _userId,
                };
                //send request to the app
                chai.request(server).post('/api/booking/')
                    .set({'Authorization': 'Bearer ' + _token})
                    .send(new_booking)
                    .then((res) => {
                        _bookingId = res.body.bookingId;
                        //assertions
                        expect(res).to.have.status(201);
                        expect(res.body.success).to.be.equal(true);
                        expect(res.body.message).to.be.equal("Objet enregistré !");
                        done();
                    }).catch(err => {
                    console.log(err.message);
                })
            });


            it('#Booking - update OK', (done) => {
                //mock valid user input
                const booking = {
                    "date": "2023-02-15T23:00:00.000+00:00",
                    "state": "valid",
                    "roomId": _roomId,
                    "ownerId": _userId,
                    "customerId": _user2Id
                };
                //send request to the app
                chai.request(server).put('/api/booking/' + _bookingId)
                    .set({'Authorization': 'Bearer ' + _token})
                    .send(booking)
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

            it('#Booking - GetOne OK', (done) => {
                //mock valid user input
                //send request to the app
                chai.request(server).get('/api/booking/' + _bookingId)
                    .set({'Authorization': 'Bearer ' + _token})
                    .then((res) => {
                        //assertions
                        expect(res).to.have.status(200);
                        done();
                    }).catch(err => {
                    console.log(err.message);
                })
            });

            it('#Booking - GetByOwner OK', (done) => {
                //mock valid user input
                //send request to the app
                chai.request(server).get('/api/booking/byOwner/' + _userId)
                    .set({'Authorization': 'Bearer ' + _token})
                    .then((res) => {
                        //assertions
                        expect(res).to.have.status(200);
                        done();
                    }).catch(err => {
                    console.log(err.message);
                })
            });

            it('#Booking - GetByUser OK', (done) => {
                //mock valid user input
                //send request to the app
                chai.request(server).get('/api/booking/byUser/' + _user2Id)
                    .set({'Authorization': 'Bearer ' + _token})
                    .then((res) => {
                        //assertions
                        expect(res).to.have.status(200);
                        done();
                    }).catch(err => {
                    console.log(err.message);
                })
            });


            it('#Booking - Suppression OK', (done) => {
                //mock valid user input
                //send request to the app
                chai.request(server).delete('/api/booking/' + _bookingId)
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

    describe('Delete User', function () {

        chai.request(server).delete('/api/auth/' + _user2Id)
            .then((res) => {
                console.log("user2 deleted")
            }).catch(err => {
            console.log(err.message);
        });
    });

    after('#cleaning database', (done) => {
        Promise.all([
            userController.deleteUser(_userId),
            userController.deleteUser(_user2Id)
        ]).then(() => done())
    });
});


