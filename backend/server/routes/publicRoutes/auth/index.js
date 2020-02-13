const express = require('express');
const router = express.Router();

router.post('/login', require('./login'));
router.post('/signup', require('./signup'));
router.post('/hasPassword', require('./hasPassword'));
router.post('/getUser', require('./getUser'));


module .exports = router;

