const express = require('express');
const router = express.Router();

router.post('/login', require('./login'));
router.post('/signup', require('./signup'));
router.get('/hasPassword', require('./hasPassword'));
router.get('/getUser/:id', require('./getUser'));


module.exports = router;

