const express = require('express');

const router = express.Router();


router.get('/', require('./getAllRooms'));
router.get('/search', require('./getAllSearchRooms'));
router.get('/categories', require('./categories'));


module.exports = router;
