const express = require('express');
const router = express.Router();


//Handle all non restricted routes (ie all authenticate routes)
router.use('/booking', require('./bookings'));
router.use('/room', require('./rooms'));


//Handle all resricted routes

//  router.use('/api/room', require("./privateRoutes/rooms"));
//router.use('/api/booking', require("./privateRoutes/bookings"));

module.exports = router;

